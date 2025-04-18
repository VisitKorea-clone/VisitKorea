document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-include]');

  const loads = Array.from(elements).map((element) => {
    const file = element.getAttribute('data-include');
    return fetch(file)
      .then((response) => {
        if (!response.ok) throw new Error(file + ' load failed');
        return response.text();
      })
      .then((html) => {
        element.innerHTML = html;
      })
      .catch((error) => {
        console.error('Error loading file:', error);
      });
  });

  Promise.all(loads).then(() => {
    document.dispatchEvent(new Event('includesLoaded'));
  });
});
