(() => {
  const button = document.getElementById('present');
  const status = document.getElementById('status');
  const zh = document.documentElement.lang === 'zh-CN';
  let enabled = new URLSearchParams(location.search).get('present') === '1';
  function update() {
    document.body.classList.toggle('presenting', enabled);
    button.textContent = enabled ? (zh ? '退出演讲' : 'Exit presentation') : (zh ? '演讲模式' : 'Present');
    button.setAttribute('aria-pressed', String(enabled));
    for (const a of document.querySelectorAll('nav a, .pager a, .chapter-grid a, .languages a')) {
      const u = new URL(a.getAttribute('href'), location.href);
      if (enabled) u.searchParams.set('present', '1'); else u.searchParams.delete('present');
      a.href = u.href;
    }
  }
  button.addEventListener('click', () => {
    enabled = !enabled; status.textContent = ''; update();
  });
  document.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('input,textarea,select,button,summary,[contenteditable]')) return;
    if (event.key === 'Escape') { enabled = false; update(); return; }
    const id = event.key === 'ArrowRight' ? 'next' : event.key === 'ArrowLeft' ? 'prev' : null;
    const anchor = id && document.getElementById(id);
    if (anchor) { event.preventDefault(); location.href = anchor.href; }
  });
  update();
})();
