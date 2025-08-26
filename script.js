// FILE: script.js
document.addEventListener("DOMContentLoaded", () => {
  // Dark mode toggle
  const toggleBtn = document.getElementById("theme-toggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  });

  // Contact form (demo)
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "Sending...";
    setTimeout(() => {
      status.textContent = "Message sent successfully ✅";
      form.reset();
    }, 1200);
  });
});
