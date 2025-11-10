# Content Collections and Multi-Language Content

This document explains how to use Astro Content Collections for managing multi-language content in the PyLadiesCon 2025 website.

## Directory Structure

Content collections live in `src/content/`:

```
src/content/
├── config.ts              # Collection schemas
├── sponsorship/           # Sponsorship data (single file per language)
│   ├── en.yaml           # English content
│   ├── es.yaml           # Spanish content
│   └── ...
├── sprints/               # Sprint data (one file per sprint)
│   ├── en/
│   │   ├── sprint1.md
│   │   └── ...
│   └── es/
│       ├── sprint1.md
│       └── ...
├── jobs/                  # Job postings (one file per job)
│   ├── en/
│   │   ├── job1.md
│   │   └── ...
│   └── es/
│       ├── job1.md
│       └── ...
└── coc/                   # Code of Conduct content
    ├── en/               # English CoC files
    │   ├── coc-attribution.md
    │   ├── coc-consequences.md
    │   └── ...
    └── es/               # Spanish CoC files
        ├── coc-attribution.md
        ├── coc-consequences.md
        └── ...
```

## Collection Types

### Data Collections (YAML/JSON)

For structured data like sponsorship tiers, use `type: 'data'`:

```typescript
// src/content/config.ts
const sponsorshipCollection = defineCollection({
  type: 'data',
  schema: z.object({
    tiers: z.array(z.object({
      name: z.string(),
      price: z.string(),
      // ... more fields
    })),
    // ... more top-level fields
  }),
});
```

**File structure**: One file per language
- `src/content/sponsorship/en.yaml`
- `src/content/sponsorship/es.yaml`

### Content Collections (Markdown)

For markdown content like CoC pages, use `type: 'content'`:

```typescript
// src/content/config.ts
const cocCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});
```

**File structure**: Separate folders per language
- `src/content/coc/en/*.md`
- `src/content/coc/es/*.md`

Each markdown file needs frontmatter:

```markdown
---
title: "coc-attribution"
---

Your markdown content here...
```

### Multiple Items in a Collection

For collections with multiple items (like sprints or jobs), use one file per item:

**Sprints Schema:**
```typescript
// src/content/config.ts
const sprintsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    project_url: z.string().url(),
    project_doc_url: z.string().url().optional(),
    level: z.string(),
    languages: z.string(),
  }),
});
```

**Jobs Schema:**
```typescript
// src/content/config.ts
const jobsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    companyurl: z.string().url().optional(),
    salary: z.string().optional(),
    joburl: z.string().url().optional(),
    email: z.string().email().optional(),
    keywords: z.array(z.string()).optional(),
  }),
});
```

**File structure**: One file per item in language-specific folders
- `src/content/sprints/en/cpython-sprint.md`
- `src/content/sprints/en/django-sprint.md`
- `src/content/sprints/es/cpython-sprint.md`
- `src/content/sprints/es/django-sprint.md`

Example sprint file:

```markdown
---
name: "CPython Sprint"
project_url: "https://github.com/python/cpython"
project_doc_url: "https://devguide.python.org/"
level: "Intermediate to Advanced"
languages: "Python, C"
---

Sprint description goes here as markdown content.
This can include multiple paragraphs, links, and formatting.
```

Example job file:

```markdown
---
title: "Senior Python Developer"
company: "Tech Company Inc."
companyurl: "https://techcompany.example.com"
salary: "80000-120000 USD"
joburl: "https://techcompany.example.com/careers/python-dev"
email: "careers@techcompany.example.com"
keywords: ["Python", "Django", "PostgreSQL", "Docker"]
---

Job description goes here as markdown content.

**Requirements:**
- Requirement 1
- Requirement 2

**What we offer:**
- Benefit 1
- Benefit 2
```

## Using Collections in Pages

### Data Collections (YAML)

For single data files (like sponsorship):

```astro
---
import { getEntry } from 'astro:content';

const { lang } = Astro.params;

// Try to get content for requested language
let sponsorshipEntry = await getEntry('sponsorship', lang);

// Fallback to English if not found
if (!sponsorshipEntry) {
  console.warn(`Sponsorship data not found for language: ${lang}, falling back to English`);
  sponsorshipEntry = await getEntry('sponsorship', 'en');
  
  if (!sponsorshipEntry) {
    throw new Error('Sponsorship data not found for English fallback');
  }
}

const { tiers, attendees, description } = sponsorshipEntry.data;
---

<!-- Use the data -->
<h1>{description}</h1>
{tiers.map(tier => (
  <div>{tier.name}: {tier.price}</div>
))}
```

### Content Collections with Multiple Items

For collections with multiple markdown files (like sprints or jobs):

```astro
---
import { getCollection } from 'astro:content';

const { lang } = Astro.params;

// Get all sprints for the current language
let allSprints = await getCollection('sprints', ({ id }) => {
  return id.startsWith(`${lang}/`);
});

// Fallback to English if none found
if (allSprints.length === 0) {
  console.warn(`No sprints found for language: ${lang}, falling back to English`);
  allSprints = await getCollection('sprints', ({ id }) => {
    return id.startsWith('en/');
  });
}

// Render all sprints to get their content
const sprintsData = await Promise.all(
  allSprints.map(async (sprint) => {
    const { Content } = await sprint.render();
    return {
      ...sprint.data,
      description: Content,
    };
  })
);
---

<!-- Use the data -->
{sprintsData.map((sprint) => {
  const Description = sprint.description;
  return (
    <div>
      <h3>{sprint.name}</h3>
      <p>Level: {sprint.level}</p>
      <div class="prose">
        <Description />
      </div>
    </div>
  );
})}
```

### Content Collections with Single Items

For individual markdown content (like CoC pages):

```astro
---
import { getEntry } from 'astro:content';

const { lang } = Astro.params;

// Try to get content for requested language
let reportingEntry = await getEntry('coc', `${lang}/coc-reporting-content`);

// Fallback to English if not found
if (!reportingEntry) {
  console.warn(`CoC content not found for language: ${lang}, falling back to English`);
  reportingEntry = await getEntry('coc', 'en/coc-reporting-content');
  
  if (!reportingEntry) {
    throw new Error('CoC content not found for English fallback');
  }
}

// Render the markdown
const { Content } = await reportingEntry.render();
---

<!-- Use the rendered content -->
<div>
  <Content />
</div>
```

## Adding a New Language

To add support for a new language (e.g., Turkish):

1. **Update locale configuration**:
   ```typescript
   // src/i18n/locales.ts
   export function getSupportedLocales() {
     return ['en', 'es', 'tr'] as const;
   }
   ```

2. **Create content files**:
   - For data collections: 
     - `src/content/sponsorship/tr.yaml`
   - For content collections with multiple items:
     - `src/content/sprints/tr/sprint-name.md` (one file per sprint)
     - `src/content/jobs/tr/job-slug.md` (one file per job)
   - For content collections with single items:
     - `src/content/coc/tr/*.md`

3. **Translate content**: Copy from English and translate all strings

4. **Test**: The fallback mechanism will use English for any missing content

## Fallback Behavior

The content loading pattern always tries:

1. **Requested language**: Try to load content for the user's language
2. **English fallback**: If not found, try English version
3. **Error**: If English also missing, throw error

**Console warnings**: When fallback occurs, a warning is logged to help identify missing translations during development:

```
CoC content 'coc-reporting-content' not found for language: tr, falling back to English
```

## Best Practices

### DO:
- ✅ Use content collections if there is data or content with repeated structure
- ✅ Always implement the fallback
- ✅ Keep all translations in sync 🤗
- ✅ Add frontmatter to markdown files (if using content collections)

### DON'T:
- ❌ Don't define data objects inline (please 🙏, hard to maintain)
- ❌ Don't use conditional logic like `lang === 'es' ? 'spanish' : 'english'`
- ❌ Don't hardcode locale arrays (use `getSupportedLocales()` from `locales.ts`)

**Schema Definitions:**
- `src/content/config.ts`
