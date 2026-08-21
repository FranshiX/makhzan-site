/* Scroll reveals stay deliberately small. The hero's multi-step choreography
   is owned by one GSAP timeline below. Reduced motion always stays static. */

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

function countUp(el){
  const target = +el.dataset.count;
  if (reduced){ el.textContent = target.toLocaleString("en-US"); return; }
  if (window.gsap){
    const state = { value: 0 };
    gsap.to(state, {
      value: target,
      duration: 1.1,
      ease: "power3.out",
      onUpdate: () => { el.textContent = Math.round(state.value).toLocaleString("en-US"); }
    });
    return;
  }
  el.textContent = target.toLocaleString("en-US");
}

const io = new IntersectionObserver((entries) => {
  for (const e of entries){
    if (!e.isIntersecting) continue;
    const el = e.target;
    el.classList.add("revealed");
    el.querySelectorAll("[data-count]").forEach(countUp);
    const bars = el.querySelectorAll(".bars div");
    if (window.gsap && !reduced){
      if (bars.length){
        gsap.to(bars, {
          scaleY: (_, bar) => +bar.dataset.h / 100,
          duration: 1,
          ease: "power3.out",
          stagger: 0.07
        });
      }
    } else {
      bars.forEach(bar => bar.style.transform = `scaleY(${+bar.dataset.h / 100})`);
    }
    io.unobserve(el);
  }
}, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });

document.querySelectorAll(".rise").forEach(el => io.observe(el));

/* One GSAP playhead owns the complete hero story. No CSS delays or timers. */
const hero = document.querySelector(".hero");

if (hero){
  const total = hero.querySelector("[data-hero-total]");
  const replay = hero.querySelector(".hero-replay");
  const pauseButton = hero.querySelector(".hero-pause");
  const pauseIcon = pauseButton.querySelector(".hero-pause-icon");
  const pauseLabel = pauseButton.querySelector(".hero-pause-label");

  if (!window.gsap){
    total.textContent = (+total.dataset.heroTotal).toLocaleString("en-US");
    replay.hidden = true;
    pauseButton.hidden = true;
  } else {
    hero.classList.add("gsap-ready");
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 900px)",
      isMobile: "(max-width: 899px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, context => {
      const { isDesktop, reduceMotion } = context.conditions;
      const pair = hero.querySelector(".hero-pair");
      const note = hero.querySelector(".hero-note");
      const app = hero.querySelector(".hero-app");
      const sale = hero.querySelector(".hero-sale");
      const product = hero.querySelector(".hero-row-new");
      const addButton = product.querySelector(".hero-add");
      const sellButton = hero.querySelector(".hero-sell");
      const veil = hero.querySelector(".hero-veil");
      const drawer = hero.querySelector(".hero-drawer");
      const saveButton = hero.querySelector(".hero-actions b");
      const toast = hero.querySelector(".hero-toast");
      const receiptSlot = hero.querySelector(".hero-receipt-slot");
      const receiptPaper = hero.querySelector(".hero-receipt-paper");
      const receiptLines = hero.querySelectorAll(".hero-receipt-row, .hero-receipt-net");
      const flight = hero.querySelector(".hero-flight");
      const cursor = hero.querySelector(".hero-cursor");
      const cursorRing = hero.querySelector(".hero-cursor i");
      const story = hero.querySelector(".hero-story");
      const storyAdd = hero.querySelector(".hero-story-add");
      const storySave = hero.querySelector(".hero-story-save");
      const storyPrint = hero.querySelector(".hero-story-print");
      const totalState = { value: 20500 };

      const renderTotal = () => {
        total.textContent = Math.round(totalState.value).toLocaleString("en-US");
      };

      hero.querySelectorAll(".rise").forEach(el => el.classList.add("revealed"));

      if (reduceMotion){
        totalState.value = +total.dataset.heroTotal;
        renderTotal();
        replay.hidden = true;
        pauseButton.hidden = true;
        gsap.set([veil, drawer, toast, receiptSlot, flight, cursor, story], { autoAlpha: 0 });
        gsap.set([note, app, product, pair], { autoAlpha: 1, clearProps: "transform" });
        return () => gsap.set([veil, drawer, toast, receiptSlot, flight, cursor, story, note, app, product, pair], { clearProps: "all" });
      }

      replay.hidden = false;
      pauseButton.hidden = false;

      /* Measure once. Reads are grouped before GSAP performs any animated writes. */
      gsap.set(drawer, { x: 0, xPercent: 0, visibility: "hidden" });
      const saleRect = sale.getBoundingClientRect();
      const cursorRect = cursor.getBoundingClientRect();
      const addRect = addButton.getBoundingClientRect();
      const sellRect = sellButton.getBoundingClientRect();
      const saveRect = saveButton.getBoundingClientRect();
      const totalRect = total.getBoundingClientRect();

      const cursorPoint = rect => ({
        x: rect.left + rect.width / 2 - cursorRect.left,
        y: rect.top + rect.height / 2 - cursorRect.top
      });
      const addPoint = cursorPoint(addRect);
      const sellPoint = cursorPoint(sellRect);
      const savePoint = cursorPoint(saveRect);
      const flightStart = {
        x: addRect.left + addRect.width / 2 - saleRect.left - 11,
        y: addRect.top + addRect.height / 2 - saleRect.top - 11
      };
      const flightEnd = {
        x: totalRect.left + totalRect.width / 2 - saleRect.left - 11,
        y: totalRect.top + totalRect.height / 2 - saleRect.top - 11
      };
      gsap.set(drawer, { x: 0, xPercent: 100, visibility: "inherit" });

      const resetScene = () => {
        totalState.value = 20500;
        renderTotal();
        addButton.textContent = "+";
      };

      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 1.1,
        defaults: { ease: "power2.out" }
      });

      tl.addLabel("reset", 0)
        .add(resetScene, "reset")
        .set(pair, { autoAlpha: 1 }, "reset")
        .set(note, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: -0.9 }, "reset")
        .set(app, { autoAlpha: 1, y: 0, scale: 1 }, "reset")
        .set(product, { autoAlpha: 1, y: 0, scale: 1, backgroundColor: "#ffffff", borderColor: "#dce5ee" }, "reset")
        .set(addButton, { scale: 1, backgroundColor: "#f59e0b" }, "reset")
        .set([veil, toast, receiptSlot, flight, cursor, cursorRing, storySave, storyPrint], { autoAlpha: 0 }, "reset")
        .set(drawer, { x: 0, xPercent: 100, autoAlpha: 1 }, "reset")
        .set(receiptPaper, { y: 0, yPercent: 105, rotation: -0.6, autoAlpha: 1 }, "reset")
        .set(receiptLines, { autoAlpha: 0, y: 5 }, "reset")
        .set(story, { autoAlpha: 1, y: 0 }, "reset")
        .set(storyAdd, { autoAlpha: 1 }, "reset")
        .set(flight, { x: flightStart.x, y: flightStart.y, scale: 0.7 }, "reset")

        .addLabel("add", 0.8)
        .to(note, { autoAlpha: 0.18, x: 14, y: 7, scale: 0.97, rotation: -3, duration: 0.8 }, "add")
        .to(app, { scale: 1.008, duration: 0.8 }, "add")
        .to(cursor, { autoAlpha: isDesktop ? 1 : 0, x: addPoint.x + 46, y: addPoint.y - 32, duration: 0.01 }, "add")
        .to(cursor, { x: addPoint.x, y: addPoint.y, duration: 0.55, ease: "power3.out" }, "add+=0.05")
        .to(cursor, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1 }, "add+=0.62")
        .to(cursorRing, { autoAlpha: 1, scale: 1, duration: 0.18, yoyo: true, repeat: 1 }, "add+=0.62")
        .to(addButton, {
          scale: 0.78,
          duration: 0.08,
          yoyo: true,
          repeat: 1
        }, "add+=0.62")
        .to(product, { backgroundColor: "#ecfdf3", borderColor: "#86d9ab", duration: 0.35 }, "add+=0.72")
        .to(flight, { autoAlpha: 1, scale: 1, duration: 0.12 }, "add+=0.74")
        .to(flight, { x: flightEnd.x, y: flightEnd.y, scale: 0.82, duration: 0.68, ease: "power3.inOut" }, "add+=0.82")
        .to(flight, { autoAlpha: 0, scale: 0.4, duration: 0.16 }, "add+=1.48")
        .to(totalState, { value: +total.dataset.heroTotal, duration: 0.76, ease: "power2.out", onUpdate: renderTotal }, "add+=0.88")
        .to(storyAdd, { autoAlpha: 0, duration: 0.2 }, "add+=1.65")
        .to(storySave, { autoAlpha: 1, duration: 0.25 }, "add+=1.72")

        .addLabel("sell", 2.85)
        .to(cursor, { x: sellPoint.x, y: sellPoint.y, duration: 0.55, ease: "power3.inOut" }, "sell")
        .to(cursor, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1 }, "sell+=0.56")
        .to(cursorRing, { autoAlpha: 1, scale: 1, duration: 0.18, yoyo: true, repeat: 1 }, "sell+=0.56")
        .to(sellButton, { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1 }, "sell+=0.56")

        .addLabel("invoice", 3.62)
        .to(veil, { autoAlpha: 1, duration: 0.42 }, "invoice")
        .to(drawer, { xPercent: 0, duration: 0.72, ease: "power3.out" }, "invoice")
        .to(cursor, { x: savePoint.x, y: savePoint.y, duration: 0.62, ease: "power3.inOut" }, "invoice+=0.82")

        .addLabel("save", 4.72)
        .to(cursor, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1 }, "save")
        .to(cursorRing, { autoAlpha: 1, scale: 1, duration: 0.18, yoyo: true, repeat: 1 }, "save")
        .to(saveButton, { scale: 0.95, duration: 0.08, yoyo: true, repeat: 1 }, "save")
        .to(toast, { autoAlpha: 1, y: 0, duration: 0.34 }, "save+=0.28")
        .to(cursor, { autoAlpha: 0, duration: 0.2 }, "save+=0.3")
        .to(drawer, { xPercent: 100, duration: 0.66, ease: "power3.in" }, "save+=0.78")
        .to(veil, { autoAlpha: 0.18, duration: 0.48 }, "save+=0.92")
        .to(storySave, { autoAlpha: 0, duration: 0.2 }, "save+=0.78")
        .to(storyPrint, { autoAlpha: 1, duration: 0.25 }, "save+=0.88")

        .addLabel("print", 6.02)
        .to(receiptSlot, { autoAlpha: 1, duration: 0.01 }, "print")
        .to(receiptPaper, { yPercent: 0, duration: 1.05, ease: "power3.out" }, "print")
        .to(receiptLines, { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.07 }, "print+=0.58")
        .to(toast, { autoAlpha: 0, y: -8, duration: 0.28 }, "print+=1.05")

        .addLabel("hold", 7.45)
        .to({}, { duration: 1.65 }, "hold")

        .addLabel("outro", 9.1)
        .to(receiptPaper, { autoAlpha: 0, y: -18, duration: 0.35 }, "outro")
        .to([receiptSlot, veil, storyPrint], { autoAlpha: 0, duration: 0.3 }, "outro+=0.12")
        .to(pair, { autoAlpha: 0, duration: 0.28 }, "outro+=0.5")
        .add(resetScene, "outro+=0.8")
        .set(drawer, { x: 0, xPercent: 100 }, "outro+=0.8")
        .set(receiptPaper, { yPercent: 105, y: 0, autoAlpha: 1 }, "outro+=0.8")
        .set([veil, toast, receiptSlot, flight, cursor, storySave, storyPrint], { autoAlpha: 0 }, "outro+=0.8")
        .set([story, storyAdd], { autoAlpha: 1 }, "outro+=0.8")
        .set(note, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotation: -0.9 }, "outro+=0.8")
        .set(app, { autoAlpha: 1, scale: 1 }, "outro+=0.8")
        .set(product, { backgroundColor: "#ffffff", borderColor: "#dce5ee" }, "outro+=0.8")
        .to(pair, { autoAlpha: 1, duration: 0.38 }, "outro+=0.86");

      let hasStarted = false;
      let isInView = false;
      let isUserPaused = false;
      const renderPause = () => {
        pauseButton.setAttribute("aria-pressed", String(isUserPaused));
        pauseIcon.textContent = isUserPaused ? "▶" : "Ⅱ";
        pauseLabel.textContent = isUserPaused ? "شغّل الحركة" : "أوقف الحركة";
      };
      const playIfVisible = () => {
        if (!document.hidden && isInView && !isUserPaused) tl.resume();
      };
      const onReplay = () => {
        isUserPaused = false;
        renderPause();
        tl.restart();
      };
      const onPause = () => {
        isUserPaused = !isUserPaused;
        renderPause();
        isUserPaused ? tl.pause() : playIfVisible();
      };
      const onVisibility = () => document.hidden ? tl.pause() : playIfVisible();
      const observer = new IntersectionObserver(([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView && !hasStarted){
          hasStarted = true;
          tl.play(0);
        } else if (isInView){
          playIfVisible();
        } else {
          tl.pause();
        }
      }, { threshold: 0.25 });

      observer.observe(pair);
      renderPause();
      replay.addEventListener("click", onReplay);
      pauseButton.addEventListener("click", onPause);
      document.addEventListener("visibilitychange", onVisibility);

      return () => {
        observer.disconnect();
        replay.removeEventListener("click", onReplay);
        pauseButton.removeEventListener("click", onPause);
        document.removeEventListener("visibilitychange", onVisibility);
        tl.kill();
      };
    });
  }
}
