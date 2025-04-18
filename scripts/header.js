document.addEventListener('includesLoaded', () => {
  const currentUrl = window.location.href;

  document.querySelectorAll('.menu a').forEach((link) => {
    if (link.href === currentUrl) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
