/**
 * render.js
 * Fetches data.json and renders every section of the portfolio.
 * You never need to touch index.html or this file —
 * edit data.json only.
 */

(function () {

  /* ─── tiny helpers ─────────────────────────────── */

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls)  e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  /* ─── IDENTITY / HEADER ────────────────────────── */

  function renderHeader(d) {
    const { identity, links } = d;

    /* Avatar */
    const avatar = qs('#avatar');
    if (identity.photo) {
      avatar.innerHTML = `<img src="${identity.photo}" alt="${identity.name}" class="avatar-img" />`;
    } else {
      avatar.innerHTML = `
        <div class="avatar-inner">
          <span class="avatar-initials">${identity.initials}</span>
          <span class="avatar-handle">${identity.handle}<span class="cursor"></span></span>
        </div>`;
    }

    /* Text */
    qs('#name').textContent      = identity.name;
    qs('#role').textContent      = identity.role;
    qs('#status-text').textContent = identity.status;

    /* Social links */
    const nav = qs('#links');
    nav.innerHTML = '';
    links.forEach(function (link) {
      const a = el('a', 'link', link.label);
      a.href   = link.url;
      if (!link.url.startsWith('mailto')) {
        a.target = '_blank';
        a.rel    = 'noopener';
      }
      nav.appendChild(a);
    });
  }

  /* ─── ABOUT ────────────────────────────────────── */

  function renderAbout(d) {
    qs('#about-text').innerHTML = d.about;
  }

  /* ─── SKILLS ───────────────────────────────────── */

  function renderSkills(d) {
    const container = qs('#skills-container');
    container.innerHTML = '';

    d.skills.forEach(function (group) {
      const row = el('div', 'skill-row');

      const cat = el('span', 'skill-cat', group.category);
      row.appendChild(cat);

      const tags = el('div', 'tags');
      group.items.forEach(function (item) {
        const cls = item.accent ? 'tag accent' : 'tag';
        tags.appendChild(el('span', cls, item.name));
      });

      row.appendChild(tags);
      container.appendChild(row);
    });
  }

  /* ─── PROJECTS ─────────────────────────────────── */

  function renderProjects(d) {
    const container = qs('#projects-container');
    container.innerHTML = '';

    d.projects.forEach(function (project) {
      const article = el('article', 'project-card');

      /* Top row */
      const top = el('div', 'project-top');
      top.appendChild(el('h2', 'project-name', project.name));
      top.appendChild(el('span', 'project-badge', project.badge));
      article.appendChild(top);

      /* Description */
      article.appendChild(el('p', 'project-desc', project.description));

      /* FAANG signal */
      if (project.faang_signal) {
        article.appendChild(el('p', 'project-why', project.faang_signal));
      }

      /* Stack tags */
      const stack = el('div', 'project-stack');
      project.stack.forEach(function (tech) {
        stack.appendChild(el('span', 'tag', tech));
      });
      article.appendChild(stack);

      /* Links */
      const pLinks = el('div', 'project-links');
      project.links.forEach(function (link) {
        const a = el('a', 'p-link', link.label);
        a.href = link.url;
        if (link.url !== '#' && !link.url.startsWith('mailto')) {
          a.target = '_blank';
          a.rel    = 'noopener';
        }
        pLinks.appendChild(a);
      });
      article.appendChild(pLinks);

      container.appendChild(article);
    });
  }

  /* ─── EDUCATION ────────────────────────────────── */

  function renderEducation(d) {
    const container = qs('#education-container');
    container.innerHTML = '';
    const total = d.education.length;

    d.education.forEach(function (item, index) {
      const titem = el('div', 'titem');

      /* Timeline line */
      const tline = el('div', 'tline');
      tline.appendChild(el('div', 'tdot'));
      if (index < total - 1) {
        tline.appendChild(el('div', 'tbar'));
      }
      titem.appendChild(tline);

      /* Content */
      const content = el('div', 'tcontent');
      content.appendChild(el('p', 'ttitle', item.degree));
      content.appendChild(el('p', 'torg', item.institution));

      const dateStr = item.detail
        ? `${item.period} &middot; ${item.detail}`
        : item.period;
      content.appendChild(el('p', 'tdate', dateStr));

      titem.appendChild(content);
      container.appendChild(titem);
    });
  }

  /* ─── FOOTER ───────────────────────────────────── */

  function renderFooter(d) {
    const { footer } = d;
    qs('#footer-tagline').textContent = footer.tagline;
    const cta = qs('#footer-cta');
    cta.textContent = footer.cta_label;
    cta.href        = footer.cta_url;
  }

  /* ─── BOOT ─────────────────────────────────────── */

  function render(data) {
    renderHeader(data);
    renderAbout(data);
    renderSkills(data);
    renderProjects(data);
    renderEducation(data);
    renderFooter(data);
  }

  /* fetch() works when served over http:// or https://
     For local file:// use the inline fallback below    */
  fetch('data.json')
    .then(function (res) {
      if (!res.ok) throw new Error('Could not load data.json');
      return res.json();
    })
    .then(render)
    .catch(function (err) {
      console.warn('fetch failed — are you opening index.html directly as a file?');
      console.warn('Fix: use VS Code Live Server, or run: npx serve .');
      console.error(err);
    });

})();
