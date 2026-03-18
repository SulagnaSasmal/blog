function updateScrollProgress() {
  var scrollTop = window.scrollY || window.pageYOffset;
  var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  var progress = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0;

  document.documentElement.style.setProperty("--scroll-progress", progress);
}

function revealOnScroll() {
  var targets = document.querySelectorAll(".reveal-on-scroll, .page-header, .post-single, .post-entry, .archive-entry, .demo-window");

  if (!targets.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (target) {
      target.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }

      var delay = entry.target.dataset.revealDelay;
      if (delay) {
        entry.target.style.transitionDelay = delay + "ms";
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

function applyStaggerDelays() {
  var groups = document.querySelectorAll(".stagger-children");

  groups.forEach(function (group) {
    var items = group.querySelectorAll(".stagger-item");

    items.forEach(function (item, index) {
      if (!item.dataset.revealDelay) {
        item.dataset.revealDelay = String(index * 90);
      }

      item.classList.add("reveal-on-scroll");
    });
  });
}

function setupInteractiveCards() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var cards = document.querySelectorAll(".interactive-card[data-tilt]");

  cards.forEach(function (card) {
    card.addEventListener("pointermove", function (event) {
      var rect = card.getBoundingClientRect();
      var px = (event.clientX - rect.left) / rect.width;
      var py = (event.clientY - rect.top) / rect.height;
      var rotateY = (px - 0.5) * 8;
      var rotateX = (0.5 - py) * 8;

      card.style.setProperty("--card-rotate-x", rotateX.toFixed(2) + "deg");
      card.style.setProperty("--card-rotate-y", rotateY.toFixed(2) + "deg");
      card.style.setProperty("--card-glow-x", (px * 100).toFixed(2) + "%");
      card.style.setProperty("--card-glow-y", (py * 100).toFixed(2) + "%");
    });

    card.addEventListener("pointerleave", function () {
      card.style.removeProperty("--card-rotate-x");
      card.style.removeProperty("--card-rotate-y");
      card.style.removeProperty("--card-glow-x");
      card.style.removeProperty("--card-glow-y");
    });
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

function setupLikeButton() {
  var btn = document.querySelector(".like-btn");
  if (!btn) {
    return;
  }

  var url = btn.dataset.url;
  var storageKey = "liked:" + url;
  var heart = btn.querySelector(".like-heart");

  if (localStorage.getItem(storageKey)) {
    btn.classList.add("liked");
    if (heart) {
      heart.innerHTML = "&#9829;";
    }
  }

  btn.addEventListener("click", function () {
    var isLiked = btn.classList.toggle("liked");
    if (heart) {
      heart.innerHTML = isLiked ? "&#9829;" : "&#9825;";
    }
    if (isLiked) {
      localStorage.setItem(storageKey, "1");
    } else {
      localStorage.removeItem(storageKey);
    }
  });
}

function setupCopyLink() {
  var btns = document.querySelectorAll(".share-copy");

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = btn.dataset.url;
      if (!url) {
        return;
      }

      navigator.clipboard.writeText(url).then(function () {
        var orig = btn.textContent;
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = orig;
          btn.classList.remove("copied");
        }, 2000);
      }).catch(function () {
        // fallback: select text in a temp input
        var inp = document.createElement("input");
        inp.value = url;
        document.body.appendChild(inp);
        inp.select();
        document.execCommand("copy");
        document.body.removeChild(inp);
        btn.textContent = "Copied!";
        setTimeout(function () {
          btn.textContent = "Copy link";
        }, 2000);
      });
    });
  });
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
document.addEventListener("DOMContentLoaded", function () {
  applyStaggerDelays();
  updateScrollProgress();
  revealOnScroll();
  setupInteractiveCards();
  setupLikeButton();
  setupCopyLink();
});
