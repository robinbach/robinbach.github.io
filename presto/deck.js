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
  button.addEventListener('click', async () => {
    enabled = !enabled; status.textContent = ''; update();
    if (enabled && document.documentElement.requestFullscreen) {
      try { await document.documentElement.requestFullscreen(); }
      catch { status.textContent = zh ? '已进入窗口演讲模式' : 'Presenting in this window'; }
    } else if (!enabled && document.fullscreenElement) { try { await document.exitFullscreen(); } catch {} }
  });
  document.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('input,textarea,select,button,summary,[contenteditable]')) return;
    if (event.key === 'Escape') { enabled = false; update(); return; }
    const id = event.key === 'ArrowRight' ? 'next' : event.key === 'ArrowLeft' ? 'prev' : null;
    const anchor = id && document.getElementById(id);
    if (anchor) { event.preventDefault(); location.href = anchor.href; }
  });
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement) { enabled = false; update(); } });
  update();
})();
