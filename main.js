/* Three animations, no library. Anyone who has switched motion off in their OS
   gets a fully static page — not a broken one. */

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

function countUp(el){
  const target = +el.dataset.count;
  if (reduced){ el.textContent = target.toLocaleString("en-US"); return; }
  const dur = 1100, t0 = performance.now();
  (function step(now){
    const p = Math.min(1, (now - t0) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-US");
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}

const io = new IntersectionObserver((entries) => {
  for (const e of entries){
    if (!e.isIntersecting) continue;
    const el = e.target;
    el.classList.add("revealed");
    el.querySelectorAll("[data-count]").forEach(countUp);
    el.querySelectorAll(".meter i").forEach(i => i.style.width = i.dataset.w + "%");
    el.querySelectorAll(".bars div").forEach((b, k) => setTimeout(() => b.style.height = b.dataset.h + "%", k * 70));
    io.unobserve(el);
  }
}, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });

document.querySelectorAll(".rise").forEach(el => io.observe(el));
