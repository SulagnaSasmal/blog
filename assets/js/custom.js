function updateScrollProgress() {
  var scrollTop = window.scrollY || window.pageYOffset;
  var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  var progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

  document.documentElement.style.setProperty("--scroll-progress", progress);
}

function revealOnScroll() {
  var selectors = [
    ".page-header",
    ".post-single",
    ".post-entry",
    ".archive-entry",
    ".demo-window"
  ];
  var targets = document.querySelectorAll(selectors.join(","));

  if (!targets.length || !("IntersectionObserver" in window)) {
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.08
  });

  targets.forEach(function (target) {
    observer.observe(target);
  });
}

document.addEventListener("click", function (event) {
  var link = event.target.closest(".demo-overlay-link");
  if (!link) {
    return;
  }

  event.preventDefault();
  link.closest(".demo-body").classList.add("active");
});

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
document.addEventListener("DOMContentLoaded", function () {
  updateScrollProgress();
  revealOnScroll();
});
