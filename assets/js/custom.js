// Dismiss the play-button overlay when the user clicks it
document.addEventListener("click", function (e) {
  var link = e.target.closest(".demo-overlay-link");
  if (!link) return;
  e.preventDefault();
  link.closest(".demo-body").classList.add("active");
});
