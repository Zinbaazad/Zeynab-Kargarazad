const pins = document.querySelectorAll(".map-pin");
const cards = document.querySelectorAll(".map-card");

pins.forEach(pin => {
  pin.addEventListener("click", () => {
    const target = pin.dataset.panel;

    pins.forEach(p => p.classList.remove("active"));
    cards.forEach(card => card.classList.add("hidden"));

    pin.classList.add("active");
    const card = document.getElementById(target);
    if (card) card.classList.remove("hidden");
  });
});

// Small parallax effect for the map on desktop.
const map = document.querySelector(".hero-map");
if (map && window.matchMedia("(pointer:fine)").matches) {
  map.addEventListener("mousemove", (event) => {
    const rect = map.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    map.style.transform = `perspective(900px) rotateY(${x * 1.4}deg) rotateX(${y * -1.4}deg)`;
  });

  map.addEventListener("mouseleave", () => {
    map.style.transform = "";
  });
}

// Highlight nav link based on the section currently in view.
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("nav a")];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.opacity = link.getAttribute("href") === `#${entry.target.id}` ? "1" : ".55";
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));
