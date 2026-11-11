// Troque aqui o número do WhatsApp (formato internacional, só dígitos).
const WHATSAPP_NUMBER = '5581988626337';
const wa = (m) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(m)}`;
document.querySelectorAll('[data-whatsapp]').forEach((a) => (a.href = wa(a.dataset.whatsapp)));

// Menu mobile
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const setMenu = (open) => {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// Cabeçalho muda ao rolar
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
addEventListener('scroll', onScroll, { passive: true });

// Serviços por categoria (abas)
const tabs = [...document.querySelectorAll('.svc-tab')];
const panels = [...document.querySelectorAll('.svc-panel')];
const pick = (i, focus) => {
  tabs.forEach((t, n) => {
    t.setAttribute('aria-selected', String(n === i));
    t.tabIndex = n === i ? 0 : -1;
  });
  panels.forEach((p, n) => (p.hidden = n !== i));
  if (focus) tabs[i].focus();
};
tabs.forEach((t, i) => {
  t.addEventListener('click', () => pick(i));
  t.addEventListener('keydown', (e) => {
    const k = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (k) { e.preventDefault(); pick((i + k + tabs.length) % tabs.length, true); }
  });
});

// Entrada suave das seções
const io = new IntersectionObserver((list) => list.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.15 });
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

// FAQ: abre uma pergunta por vez
document.querySelectorAll('.faq details').forEach((d) => d.addEventListener('toggle', () => {
  if (d.open) document.querySelectorAll('.faq details').forEach((o) => o !== d && o.removeAttribute('open'));
}));
