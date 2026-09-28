/**
 * Interacciones del sitio. Vanilla, sin dependencias.
 * Principio: el HTML ya contiene el estado final; el JS solo añade movimiento.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionOK = () => !reduceMotion.matches;

/* ------------------------------------------------------------------ */
/* Header: estado al hacer scroll y ocultación al bajar                */
/* ------------------------------------------------------------------ */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    const goingDown = y > lastY && y > 320;
    header.classList.toggle('is-hidden', goingDown && !header.contains(document.activeElement));
    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
  update();
}

/* ------------------------------------------------------------------ */
/* Menú móvil                                                          */
/* ------------------------------------------------------------------ */
function initMenu() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  const label = document.querySelector<HTMLElement>('[data-menu-label]');
  if (!header || !toggle || !menu || !label) return;

  let closeTimer: number | undefined;

  const setOpen = (open: boolean) => {
    window.clearTimeout(closeTimer);
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Cerrar menú' : 'Abrir menú';
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => header.classList.add('is-open')));
      menu.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    } else {
      header.classList.remove('is-open');
      closeTimer = window.setTimeout(() => (menu.hidden = true), motionOK() ? 700 : 0);
    }
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
  window.matchMedia('(min-width: 1100px)').addEventListener('change', (e) => e.matches && setOpen(false));
}

/* ------------------------------------------------------------------ */
/* Reveals, contadores y visualizaciones al entrar en pantalla         */
/* ------------------------------------------------------------------ */
function animateCounter(el: HTMLElement) {
  const target = Number(el.dataset.counter);
  const out = el.querySelector<HTMLElement>('[data-counter-value]');
  if (!out || !Number.isFinite(target)) return;
  const fmt = new Intl.NumberFormat('es-ES');
  const duration = 1600;
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    out.textContent = fmt.format(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function runWorkflow(root: HTMLElement) {
  const steps = [...root.querySelectorAll<HTMLElement>('.wf__step')];
  if (!motionOK()) {
    steps.forEach((s) => s.classList.add('is-done'));
    steps.at(-1)?.classList.add('is-active');
    return;
  }
  let i = 0;
  const next = () => {
    steps.forEach((s, j) => {
      s.classList.toggle('is-done', j < i);
      s.classList.toggle('is-active', j === i);
    });
    i += 1;
    if (i < steps.length) {
      window.setTimeout(next, 1100);
    } else {
      // Pausa con todo completado y vuelta a empezar: el flujo "sigue funcionando".
      window.setTimeout(() => {
        i = 0;
        steps.forEach((s) => s.classList.remove('is-done', 'is-active'));
        window.setTimeout(next, 400);
      }, 4000);
    }
  };
  next();
}

function initInView() {
  const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  const connects = document.querySelectorAll<HTMLElement>('[data-connect]');
  const workflows = document.querySelectorAll<HTMLElement>('[data-workflow]');

  if (!('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('is-in'));
    workflows.forEach((w) => w.querySelectorAll('.wf__step').forEach((s) => s.classList.add('is-done')));
    return;
  }

  const revealIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        revealIO.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  revealables.forEach((el) => revealIO.observe(el));

  const once = (els: NodeListOf<HTMLElement>, fn: (el: HTMLElement) => void, threshold = 0.4) => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          fn(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      },
      { threshold },
    );
    els.forEach((el) => io.observe(el));
  };

  if (motionOK()) {
    once(counters, animateCounter, 0.6);
    connects.forEach((el) => el.classList.remove('is-connected'));
    once(connects, (el) => el.classList.add('is-connected'), 0.45);
  }
  once(workflows, runWorkflow, 0.3);
}

/* ------------------------------------------------------------------ */
/* Sistema de crecimiento (tabs accesibles)                            */
/* ------------------------------------------------------------------ */
function initGrowthSystem() {
  document.querySelectorAll<HTMLElement>('[data-growth-system]').forEach((root) => {
    const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-gs-tab]')];
    const panels = [...root.querySelectorAll<HTMLElement>('[data-gs-panel]')];
    const rail = root.querySelector<HTMLElement>('[role="tablist"]');

    const select = (index: number, focus = false) => {
      tabs.forEach((t, i) => {
        const on = i === index;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        if (on) {
          if (focus) t.focus();
          if (rail && rail.scrollWidth > rail.clientWidth) {
            rail.scrollTo({ left: t.offsetLeft - 8, behavior: motionOK() ? 'smooth' : 'auto' });
          }
        }
      });
      panels.forEach((p, i) => p.toggleAttribute('data-active', i === index));
    };

    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(i));
      t.addEventListener('keydown', (e) => {
        const keys: Record<string, number> = {
          ArrowDown: i + 1,
          ArrowRight: i + 1,
          ArrowUp: i - 1,
          ArrowLeft: i - 1,
          Home: 0,
          End: tabs.length - 1,
        };
        if (!(e.key in keys)) return;
        e.preventDefault();
        select((keys[e.key] + tabs.length) % tabs.length, true);
      });
    });

    if (rail) {
      const setRail = () => rail.style.setProperty('--rail-h', `${rail.offsetHeight - 52}px`);
      setRail();
      new ResizeObserver(setRail).observe(rail);
    }
  });
}

/* ------------------------------------------------------------------ */
/* Metodología: paso activo según scroll                               */
/* ------------------------------------------------------------------ */
function initMethod() {
  document.querySelectorAll<HTMLElement>('[data-method]').forEach((root) => {
    const steps = [...root.querySelectorAll<HTMLElement>('[data-method-step]')];
    const dots = [...root.querySelectorAll<HTMLElement>('[data-method-dot]')];
    if (!steps.length) return;

    const setCurrent = (index: number) => {
      steps.forEach((s, i) => s.classList.toggle('is-current', i === index));
      dots.forEach((d, i) => {
        d.classList.toggle('is-current', i === index);
        d.classList.toggle('is-active', i < index);
      });
    };
    setCurrent(0);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(steps.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    steps.forEach((s) => io.observe(s));
  });
}

initHeader();
initMenu();
initInView();
initGrowthSystem();
initMethod();

/* Formulario: solo se carga en páginas que lo tienen. */
if (document.querySelector('[data-contact-form]')) {
  import('./form').then((m) => m.initForm());
}
