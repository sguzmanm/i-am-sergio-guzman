/* Code based on https://css-tricks.com/lazy-loading-images-with-vue-js-directives-and-intersection-observer/ */

const findSpinnerChild = (el) => {
  const { children } = el;
  for (let i = 0; i < children.length; i += 1) {
    if (children[i].className.includes('spinner')) {
      return children[i];
    }
  }

  return undefined;
};

const lazyLoadingHook = (el) => {
  function loadImage() {
    const imageElement = Array.from(el.children).find(
      (node) => node.nodeName === 'IMG',
    );
    if (!imageElement) {
      return;
    }

    imageElement.addEventListener('load', () => {
      setTimeout(() => {
        const spinner = findSpinnerChild(el);
        if (spinner) { spinner.style.display = 'none'; }
      }, 100);
    });
    imageElement.src = imageElement.dataset.url;
    imageElement.style.display = 'block';
  }

  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage();
        observer.unobserve(el);
      }
    });
  }

  function createObserver() {
    const options = {
      root: null,
      threshold: '0',
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(el);
  }

  if (window.IntersectionObserver) {
    createObserver();
  } else {
    loadImage();
  }
};

export default {
  inserted: (el) => lazyLoadingHook(el),
  update: (el) => {
    function resetImage() {
      const imageElement = Array.from(el.children).find(
        (node) => node.nodeName === 'IMG',
      );
      if (!imageElement) {
        return;
      }

      const spinner = findSpinnerChild(el);
      if (spinner) { spinner.style.display = 'block'; }

      imageElement.src = '';
      imageElement.style.display = 'none';
    }

    resetImage();
    lazyLoadingHook(el);
  },
};
