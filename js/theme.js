/**
 * theme.js
 * Handles dark / light mode toggle.
 * Persists preference in localStorage so it
 * survives page refreshes.
 */

(function () {
  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('theme-icon');

  // ── Determine initial theme ──────────────────────
  // 1. User's saved preference
  // 2. System preference
  // 3. Default: light
  function getPreferred() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }

  // ── Apply a theme ────────────────────────────────
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    icon.textContent = theme === 'dark' ? '☀' : '☾';
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // ── Toggle on button click ───────────────────────
  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // ── Init ─────────────────────────────────────────
  applyTheme(getPreferred());
  btn.addEventListener('click', toggleTheme);

  // ── Sync if system preference changes ───────────
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', function (e) {
      // Only auto-switch if user hasn't manually picked
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
})();
