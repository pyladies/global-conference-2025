(function () {
  try {
    var el = document.currentScript;
    if (!el) return;

    var supportedAttr = el.getAttribute('data-supported') || '';
    var supported = supportedAttr
      .split(',')
      .map(function (s) { return s.trim().toLowerCase(); })
      .filter(Boolean);
    var def = (el.getAttribute('data-default') || 'en').toLowerCase();
    var template = el.getAttribute('data-path-template') || '/{lang}/';

    // use explicit user preference if present
    var preferred = null;
    try {
      preferred = (localStorage.getItem('preferredLang') || '').toLowerCase();
    } catch (e) {}

    var chosen = (preferred && supported.indexOf(preferred) !== -1)
      ? preferred
      : (function () {
          // use browser preferences
          var navLangs = Array.isArray(navigator.languages) && navigator.languages.length
            ? navigator.languages
            : [navigator.language || ''];
          navLangs = navLangs.map(function (l) { return (l || '').toLowerCase(); });
          var primaries = navLangs.map(function (l) { return l.split('-')[0]; });
          return primaries.find(function (p) { return supported.indexOf(p) !== -1; }) || def;
        })();

    var target = template.replace('{lang}', chosen);

    function normalize(p) {
      // ensure leading slash
      if (p && p[0] !== '/') p = '/' + p;
      // normalize trailing slash on pathname-like targets
      return /\/$/.test(p) ? p : p + '/';
    }

    var targetNorm = normalize(target);
    var currentNorm = normalize(location.pathname);

    if (currentNorm !== targetNorm) {
      try {
        localStorage.setItem('preferredLang', chosen);
      } catch (e) {}
      location.replace(targetNorm);
    }
  } catch (e) {}
})();
