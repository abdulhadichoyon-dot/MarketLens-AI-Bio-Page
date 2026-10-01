const appUrl = "https://marketlensai.ai.studio/";

document.getElementById("year").textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const lensCard = document.querySelector(".lens-card");
const heroVisual = document.querySelector(".hero-visual");

heroVisual?.addEventListener("pointermove", (event) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = heroVisual.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  lensCard.style.transform =
    `perspective(1000px) rotateY(${x * -8}deg) rotateX(${y * 5}deg) translate3d(${x * 4}px, ${y * 4}px, 0)`;
});

heroVisual?.addEventListener("pointerleave", () => {
  lensCard.style.transform = "perspective(1000px) rotateY(-5deg) rotateX(2deg)";
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Add a subtle pointer glow without changing the visual structure.
const pointerGlow = document.createElement("div");
pointerGlow.setAttribute("aria-hidden", "true");
pointerGlow.style.cssText = `
  position:fixed; width:240px; height:240px; border-radius:50%;
  pointer-events:none; z-index:0; opacity:0;
  background:radial-gradient(circle, rgba(229,173,69,.08), transparent 66%);
  transform:translate(-50%,-50%);
  transition:opacity .25s ease;
`;
document.body.appendChild(pointerGlow);

window.addEventListener("pointermove", (event) => {
  pointerGlow.style.opacity = "1";
  pointerGlow.style.left = `${event.clientX}px`;
  pointerGlow.style.top = `${event.clientY}px`;
}, { passive: true });

window.addEventListener("blur", () => {
  pointerGlow.style.opacity = "0";
});

console.info("MarketLens AI bio page ready:", appUrl);
