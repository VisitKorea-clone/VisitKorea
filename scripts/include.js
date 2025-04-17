document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-include]');
  // 각 fetch 결과를 담을 프로미스 배열
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

  // 모든 include가 끝나면 includesLoaded 이벤트 발행
  Promise.all(loads).then(() => {
    document.dispatchEvent(new Event('includesLoaded'));
  });
});
