const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .role, .closing-cta').forEach((element) => {
  element.classList.add('reveal');
  observer.observe(element);
});