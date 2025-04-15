document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('[data-include]');

  elements.forEach((element) => {
    const file = element.getAttribute('data-include');
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        element.innerHTML = data;
      })
      .catch((error) => {
        console.error('Error loading file:', error);
      });
  });
});
