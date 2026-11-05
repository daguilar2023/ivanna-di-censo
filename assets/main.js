// Progressive enhancement: all project and full-size image links work without JS.
const reel = document.querySelector('.project-wheel');
if (reel) {
  const section = document.querySelector('.wheel-scroll');
  const stage = document.querySelector('.wheel-sticky');
  const items = [...reel.querySelectorAll('.wheel-item')];
  const selectors = [...document.querySelectorAll('[data-select]')];
  const count = document.querySelector('.wheel-count');
  const currentLink = document.querySelector('.current-project-link');
  const controls = document.querySelector('.wheel-controls');
  const help = document.querySelector('.wheel-help');
  const previous = document.querySelector('[data-step="-1"]');
  const next = document.querySelector('[data-step="1"]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = -1;
  let pending = false;
  let radius = 250;
  let sectionTop = 0;
  let travel = 1;
  let headerHeight = 90;
  let enabled = false;

  function selection(index) {
    if (index === selected) return;
    selected = index;
    selectors.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    count.textContent = `${String(index + 1).padStart(2, '0')} / 03`;
    currentLink.href = items[index].querySelector('a').getAttribute('href');
    currentLink.setAttribute('aria-label', `Ver proyecto: ${items[index].querySelector('h2').textContent}`);
    previous.disabled = index === 0;
    next.disabled = index === items.length - 1;
  }
  function render() {
    pending = false;
    if (!enabled) return;
    const fraction = Math.min(1, Math.max(0, (scrollY - sectionTop + headerHeight) / travel));
    const position = fraction * (items.length - 1);
    items.forEach((item, i) => {
      // Three distinct faces wrap at the edge of the visible half-cylinder.
      const offset = ((i - position + 4.5) % 3) - 1.5;
      const angle = -offset * 60;
      item.style.transform = `translate(-50%, -50%) rotateX(${angle}deg) translateZ(${radius}px)`;
      item.style.zIndex = String(100 - Math.round(Math.abs(offset) * 30));
    });
    selection(Math.round(position));
  }
  function requestRender() {
    if (!pending) { pending = true; requestAnimationFrame(render); }
  }
  function measure() {
    headerHeight = document.querySelector('.site-header').getBoundingClientRect().height;
    sectionTop = section.getBoundingClientRect().top + scrollY;
    travel = Math.max(1, section.offsetHeight - stage.offsetHeight);
    radius = Math.max(Math.min(320, reel.clientHeight * .39), items[0].offsetHeight * .95);
    reel.style.setProperty('--radius', `${radius}px`);
    render();
  }
  function configure() {
    enabled = !motion.matches;
    document.body.classList.toggle('reel-enabled', enabled);
    reel.classList.toggle('is-ready', enabled);
    controls.hidden = !enabled;
    help.hidden = !enabled;
    if (!enabled) {
      items.forEach(item => { item.style.transform = ''; item.style.zIndex = ''; });
      selection(0);
    }
    measure();
  }
  function goTo(index) {
    index = Math.max(0, Math.min(items.length - 1, index));
    if (!enabled) {
      items[index].scrollIntoView({ behavior: 'instant', block: 'center' });
      selection(index);
      return;
    }
    const target = sectionTop - headerHeight + index / (items.length - 1) * travel;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }
  selectors.forEach(button => button.addEventListener('click', () => goTo(Number(button.dataset.select))));
  controls.addEventListener('click', event => {
    const button = event.target.closest('[data-step]');
    if (button && !button.disabled) goTo(selected + Number(button.dataset.step));
  });
  // Tab focus brings an edge face into the center without disabling ordinary links.
  items.forEach((item, index) => item.querySelector('a').addEventListener('focus', () => {
    if (enabled && selected !== index) goTo(index);
  }));
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', measure);
  motion.addEventListener('change', configure);
  configure();
}

const lightbox = document.querySelector('.lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const image = lightbox.querySelector('img');
  let opener;
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      opener = link;
      image.src = link.href;
      lightbox.querySelector('.lightbox-original').href = link.href;
      image.alt = link.querySelector('img').alt;
      lightbox.querySelector('.lightbox-caption').textContent = image.alt;
      lightbox.showModal();
      document.body.style.overflow = 'hidden';
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target !== lightbox) return;
    const bounds = lightbox.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    document.body.style.overflow = '';
    opener?.focus({ preventScroll: true });
  });
}

// Optional horizontal sketch galleries retain a complete overview mode.
document.querySelectorAll('.collection').forEach(collection => {
  const grid = collection.querySelector('.figure-grid');
  const controls = collection.querySelector('.collection-controls');
  if (!controls) return;
  controls.hidden = false;
  collection.classList.add('is-gallery');
  const arrows = [...controls.querySelectorAll('[data-direction]')];
  function updateArrows() {
    arrows[0].disabled = grid.scrollLeft < 4;
    arrows[1].disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 4;
  }
  controls.addEventListener('click', event => {
    const view = event.target.closest('[data-view]');
    const arrow = event.target.closest('[data-direction]');
    if (view) {
      collection.classList.toggle('is-gallery', view.dataset.view === 'gallery');
      controls.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button === view)));
      grid.scrollLeft = 0;
      updateArrows();
    } else if (arrow && !arrow.disabled) {
      grid.scrollBy({ left: Number(arrow.dataset.direction) * grid.clientWidth * .75, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  });
  grid.addEventListener('scroll', updateArrows, {passive:true});
  addEventListener('resize', updateArrows);
  updateArrows();
});
