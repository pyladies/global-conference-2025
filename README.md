# PyLadiesCon 2025

This website uses [Astro](https://astro.build) as a framework,
and the theme is a fork from the [Astros](https://github.com/majesticooss/astros)
theme.

## Setup

First install [pnpm](https://pnpm.io/installation) if you don't have it already.

Then, run `pnpm install` and `pnpm dev` for installing dependencies and the
development mode to test locally.

## Updating content

### Schedule

The schedule comes from our [programapi](https://github.com/pyladies/global-conference-programapi)
service. Once the JSON files are updated, we need a new deployment of the website
that can be triggered by hand in order to reflect the changes in the website.
This is for the website to download these files again.
