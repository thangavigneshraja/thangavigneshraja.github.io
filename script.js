(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section-head, .card, .about-body, .role, .cap, .cta').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    revealObserver.observe(el);
  });

  /* ---------- Cursor spotlight on glass cards ---------- */
  document.querySelectorAll('.spot').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Active nav link ---------- */
  const navLinks = [...document.querySelectorAll('.nav a')];
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach((s) => navObserver.observe(s));

  /* ---------- Count-up stats ---------- */
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      countObserver.unobserve(el);
      if (reduceMotion) return;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min((t - start) / 1200, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

  /* ---------- Agent console ---------- */
  const body = document.getElementById('console-body');
  const hint = document.getElementById('console-hint');
  const script = [
    { q: 'what are you focused on right now?', steps: [
      ['tool', '<span class="p">mcp.call</span> profile.get_focus()'],
      ['tool', '<span class="k">focus</span>: [<span class="v">"AI/LLM systems"</span>, <span class="v">"MCP architectures"</span>, <span class="v">"NL interfaces"</span>]'],
      ['ai', 'Bringing LLMs and MCP-based solutions into critical infrastructure and asset monitoring platforms at Comcast.'],
    ]},
    { q: 'how much experience?', steps: [
      ['tool', '<span class="p">mcp.call</span> career.summary()'],
      ['tool', '<span class="k">years</span>: <span class="v">16</span>  <span class="k">iot_m2m</span>: <span class="v">8+</span>  <span class="k">role</span>: <span class="v">"Manager, SDE"</span>'],
      ['ai', '16 years building software — from telematics and IoT platforms to AI-driven systems at scale.'],
    ]},
    { q: 'how do you lead teams?', steps: [
      ['tool', '<span class="p">mcp.call</span> leadership.style()'],
      ['ai', 'Clear communication, a team-first mindset, and turning complex technical ideas into practical, value-driven outcomes.'],
    ]},
    { q: 'can we work together?', steps: [
      ['tool', '<span class="p">mcp.call</span> contact.open()'],
      ['ai', 'Absolutely — reach out at thangavigneshraja@gmail.com or on LinkedIn. ✦'],
    ]},
  ];

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const addLine = (cls, html) => {
    const div = document.createElement('div');
    div.className = `line ${cls}`;
    div.innerHTML = html;
    body.appendChild(div);
    while (body.children.length > 14) body.firstChild.remove();
    return div;
  };
  const typeText = async (el, text, speed = 22) => {
    for (let i = 1; i <= text.length; i++) {
      el.textContent = text.slice(0, i);
      await sleep(speed);
    }
  };

  const runConsole = async () => {
    addLine('tool', '<span class="k">connected</span> → <span class="v">tvr-profile</span> MCP server · 4 tools');
    if (reduceMotion) {
      script.forEach(({ q, steps }) => {
        addLine('user', '').textContent = q;
        steps.forEach(([cls, html]) => addLine(cls, html));
      });
      return;
    }
    let idx = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { q, steps } = script[idx % script.length];
      await sleep(900);
      hint.textContent = '';
      await typeText(hint, q, 40);
      await sleep(350);
      hint.textContent = 'ask me about AI, MCP, leadership…';
      addLine('user', '').textContent = q;
      for (const [cls, html] of steps) {
        await sleep(cls === 'ai' ? 700 : 450);
        if (cls === 'ai') {
          const tmp = document.createElement('div');
          tmp.innerHTML = html;
          await typeText(addLine('ai', ''), tmp.textContent, 16);
        } else {
          addLine(cls, html);
        }
      }
      idx++;
      await sleep(2200);
    }
  };
  if (body) runConsole();

  /* ---------- Neural network background ---------- */
  const canvas = document.getElementById('neural');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d');
  let w, h, nodes, dpr;
  const mouse = { x: -9999, y: -9999 };

  const init = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 16000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25 * dpr, vy: (Math.random() - 0.5) * 0.25 * dpr,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const maxDist = 140 * dpr;
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      const dx = n.x - mouse.x, dy = n.y - mouse.y;
      const md = Math.hypot(dx, dy);
      if (md < 160 * dpr) { n.x += dx / md * 0.6; n.y += dy / md * 0.6; }
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < maxDist) {
          ctx.strokeStyle = `rgba(139, 160, 246, ${(1 - d / maxDist) * 0.35})`;
          ctx.lineWidth = dpr * 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = 'rgba(34, 211, 238, .8)';
      ctx.beginPath(); ctx.arc(n.x, n.y, 1.4 * dpr, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(draw);
  };

  window.addEventListener('resize', init);
  window.addEventListener('pointermove', (e) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
  init();
  draw();
})();
