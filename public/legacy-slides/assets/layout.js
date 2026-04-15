// Shared LNB layout. Each page sets window.CURRENT_PAGE = 'ax' etc. before including this script.
(function () {
  // Auth gate disabled for embedded mode
  // Lucide-style SVG icons (stroke: currentColor)
  const svg = (path) =>
    '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';

  const ICONS = {
    dashboard: svg('<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>'),
    summary:   svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'),
    tower:     svg('<path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/>'),
    analysis:  svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>'),
    checklist: svg('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'),
    alert:     svg('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
    improve:   svg('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
    foundation:svg('<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'),
    adoption:  svg('<path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>'),
    ax:        svg('<path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z"/>'),
    roadmap:   svg('<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>'),
    slides:    svg('<path d="M2 3h20v14H2z"/><path d="M8 21h8"/><path d="M12 17v4"/>'),
    security:  svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'),
    reliability: svg('<path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/>'),
  };

  const NAV = [
    {
      label: 'OVERVIEW',
      items: [
        { id: 'index', icon: ICONS.dashboard, title: '대시보드', href: 'index.html' },
        { id: 'summary', icon: ICONS.summary, title: '요약 (Executive Summary)', href: 'pages/summary.html' },
        { id: 'control-tower', icon: ICONS.tower, title: '경영진 통합 컨트롤 타워', href: 'pages/control-tower.html' },
      ],
    },
    {
      label: '이슈 점검',
      items: [
        { id: 'analysis', icon: ICONS.analysis, title: '현재 문제 분석', href: 'pages/analysis.html' },
        { id: 'issue-checklist', icon: ICONS.checklist, title: '레거시 이슈 체크리스트 <span class="lnb-tag">점검필요</span>', href: 'pages/issue-checklist.html' },
        { id: 'issue-sync', icon: ICONS.alert, title: '동시성 / 데이터 정합성 <span class="lnb-tag">점검필요</span>', href: 'pages/issue-sync.html' },
      ],
    },
    {
      label: '분석 및 개선',
      items: [
        { id: 'improvement', icon: ICONS.improve, title: '개선 방안', href: 'pages/improvement.html' },
        { id: 'foundation', icon: ICONS.foundation, title: '기술적 기반 (Foundation)', href: 'pages/foundation.html' },
        { id: 'reliability', icon: ICONS.reliability, title: '안정성 · 무중단', href: 'pages/reliability.html' },
        { id: 'security', icon: ICONS.security, title: '보안 · 컴플라이언스', href: 'pages/security.html' },
      ],
    },
    {
      label: '미래 전략',
      items: [
        { id: 'adoption', icon: ICONS.adoption, title: '도입 방안', href: 'pages/adoption.html' },
        { id: 'roadmap', icon: ICONS.roadmap, title: '도입 단계별 로드맵', href: 'pages/roadmap.html' },
        { id: 'ax', icon: ICONS.ax, title: 'AX (AI Transformation)', href: 'pages/ax.html' },
      ],
    },
    {
      label: '발표 자료',
      items: [
        { id: 'slides', icon: ICONS.slides, title: '슬라이드 (발표용)', href: 'pages/slides.html' },
      ],
    },
  ];

  // Compute prefix relative to the page location.
  const BASE = document.currentScript?.dataset.base || '';
  const current = window.CURRENT_PAGE || '';

  const lnb = document.createElement('nav');
  lnb.className = 'lnb';
  let html = '<div class="lnb-title"><a href="' + BASE + 'index.html">청주김안과<br>Technical Report</a></div>';
  NAV.forEach(section => {
    html += '<div class="lnb-section"><div class="lnb-section-label">' + section.label + '</div>';
    section.items.forEach(it => {
      const active = it.id === current ? ' active' : '';
      html += '<a class="lnb-item' + active + '" href="' + BASE + it.href + '"><span class="icon">' + it.icon + '</span> ' + it.title + '</a>';
    });
    html += '</div>';
  });
  lnb.innerHTML = html;
  document.body.insertBefore(lnb, document.body.firstChild);

  // ============ Right-side TOC (GitBook style) ============
  (function buildToc() {
    const main = document.querySelector('main.main');
    if (!main) return;
    const headings = main.querySelectorAll('h2, h3');
    if (headings.length < 1) return;

    const pageTitle = (document.querySelector('main.main h1') || {}).textContent || '이 페이지';

    const toc = document.createElement('aside');
    toc.className = 'toc';
    let inner = '<div class="toc-title">' + pageTitle.trim() + '</div><ul class="toc-list">';
    let h2n = 0, h3n = 0, counter = 0;
    headings.forEach(h => {
      if (!h.id) h.id = 'sec-' + (++counter);
      let num, cls;
      if (h.tagName === 'H2') {
        h2n++; h3n = 0;
        num = h2n + '.';
        cls = 'toc-item';
      } else {
        h3n++;
        num = h2n + '-' + h3n + '.';
        cls = 'toc-item toc-h3';
      }
      // Strip leading numbering in original heading to avoid double numbers
      let text = h.textContent.trim().replace(/^\d+(\-\d+)?\.\s*/, '');
      inner += '<li class="' + cls + '"><a href="#' + h.id + '"><span class="toc-num">' + num + '</span>' + text + '</a></li>';
    });
    inner += '</ul>';
    toc.innerHTML = inner;
    document.body.appendChild(toc);

    // Scrollspy
    const links = toc.querySelectorAll('a');
    const linkMap = new Map();
    links.forEach(a => linkMap.set(a.getAttribute('href').slice(1), a));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const link = linkMap.get(e.target.id);
        if (!link) return;
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    headings.forEach(h => observer.observe(h));
  })();

  // Theme toggle
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);

  const toggle = document.createElement('div');
  toggle.className = 'theme-toggle';
  toggle.innerHTML =
    '<button data-theme-btn="dark">🌙 Dark</button>' +
    '<button data-theme-btn="light">☀ Light</button>' +
    '<button id="logoutBtn" class="logout-btn" title="로그아웃">⎋</button>';
  document.body.appendChild(toggle);

  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('tr-auth');
    location.replace(BASE + 'login.html');
  });

  function applyTheme(t) {
    document.body.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    toggle.querySelectorAll('button').forEach(b => {
      b.classList.toggle('active', b.dataset.themeBtn === t);
    });
  }
  toggle.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => applyTheme(b.dataset.themeBtn));
  });
  applyTheme(savedTheme);
})();
