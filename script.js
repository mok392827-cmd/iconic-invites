/*
  ==========================================
  WEDDING TEMPLATE — EDIT CLIENT DATA HERE
  ==========================================
*/
const weddingData = {
  groomName: "Adam",
  brideName: "Layan",

  // IMPORTANT: local Cairo time. Format: YYYY-MM-DDTHH:MM:SS
  weddingDate: "2026-12-19T19:00:00",

  venue: "The Gardenia Palace",
  city: "Cairo, Egypt",
  address: "New Cairo, Cairo, Egypt",

  // Replace this URL for every client.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Gardenia+Palace+Cairo"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const weddingMoment = new Date(weddingData.weddingDate);

function formatDateParts() {
  const full = new Intl.DateTimeFormat("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  }).format(weddingMoment);

  const weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(weddingMoment);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: true
  }).format(weddingMoment);

  const short = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "2-digit", year: "2-digit"
  }).format(weddingMoment).replaceAll("/", ".");

  $$("[data-groom]").forEach(el => el.textContent = weddingData.groomName);
  $$("[data-bride]").forEach(el => el.textContent = weddingData.brideName);
  $$("[data-date-label]").forEach(el => el.textContent = `${weekday} · ${full.split(", ")[1]}`);
  $$("[data-full-date]").forEach(el => el.textContent = full);
  $$("[data-weekday]").forEach(el => el.textContent = weekday);
  $$("[data-date-short]").forEach(el => el.textContent = short);
  $$("[data-time]").forEach(el => el.textContent = time);
  $$("[data-venue]").forEach(el => el.textContent = weddingData.venue);
  $$("[data-city]").forEach(el => el.textContent = weddingData.city);
  $$("[data-address]").forEach(el => el.textContent = weddingData.address);
  $$("[data-maps]").forEach(el => el.href = weddingData.mapsUrl);

  document.title = `${weddingData.groomName} & ${weddingData.brideName} — Wedding Invitation`;
}

function startCountdown() {
  const update = () => {
    const diff = weddingMoment.getTime() - Date.now();

    if (diff <= 0) {
      $("#countdown").innerHTML = '<p style="grid-column:1/-1;font-family:var(--serif);font-size:25px">The day has arrived. Let the celebration begin ♡</p>';
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    $("#days").textContent = String(days).padStart(2, "0");
    $("#hours").textContent = String(hours).padStart(2, "0");
    $("#minutes").textContent = String(minutes).padStart(2, "0");
    $("#seconds").textContent = String(seconds).padStart(2, "0");
  };

  update();
  setInterval(update, 1000);
}

function buildCalendar() {
  const year = weddingMoment.getFullYear();
  const month = weddingMoment.getMonth();
  const date = weddingMoment.getDate();

  $("#calendarMonth").textContent = new Intl.DateTimeFormat("en-US", { month: "long" }).format(weddingMoment).toUpperCase();
  $("#calendarYear").textContent = year;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid = $("#calendarDays");

  grid.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("span");
    empty.className = "empty";
    empty.textContent = ".";
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const day = document.createElement("span");
    day.textContent = d;
    if (d === date) day.className = "wedding-day";
    grid.appendChild(day);
  }
}

function downloadCalendarFile() {
  const start = new Date(weddingMoment);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

  const toICS = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `DTSTART:${toICS(start)}`,
    `DTEND:${toICS(end)}`,
    `SUMMARY:${weddingData.groomName} & ${weddingData.brideName} — Wedding`,
    `LOCATION:${weddingData.venue}, ${weddingData.city}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\\r\\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-date.ics";
  a.click();
  URL.revokeObjectURL(url);
}

function setupGuestbook() {
  $("#guestbookForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("#guestName").value.trim();

    if (!name) return;
    $("#formNote").textContent = `Thank you, ${name}. Your wish has been received for this demo. ♡`;
    event.target.reset();
  });
}

function setupOpening() {
  $("#openInvitation").addEventListener("click", () => {
    document.body.classList.remove("locked");
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".reveal").forEach(el => observer.observe(el));
}

window.addEventListener("load", () => {
  formatDateParts();
  startCountdown();
  buildCalendar();
  setupGuestbook();
  setupOpening();
  setupRevealAnimations();

  setTimeout(() => $("#preloader").classList.add("hide"), 900);
});
