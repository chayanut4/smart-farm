// ช่วงค่าสุ่มของเซนเซอร์แต่ละตัว
const sensors = {
  "v-temp":  { min: 20, max: 40 },   // °C
  "v-humid": { min: 30, max: 90 },   // %
  "v-light": { min: 50, max: 999 },  // cd
  "v-water": { min: 1,  max: 30 }    // cm.
};

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function randomize(id) {
  const { min, max } = sensors[id];
  document.getElementById(id).textContent = rand(min, max);
}

// สุ่มค่าทั้งหมดตอนโหลดหน้า
Object.keys(sensors).forEach(randomize);

// toggle: ON = สุ่มค่าใหม่ทุก 2 วินาที, OFF = ค้างค่าไว้
const timers = {};

document.querySelectorAll(".toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.target;
    const on = btn.getAttribute("aria-checked") !== "true";
    btn.setAttribute("aria-checked", on);

    if (on) {
      randomize(id);
      timers[id] = setInterval(() => randomize(id), 2000);
    } else {
      clearInterval(timers[id]);
    }
  });
});
