// TODO: isi dengan alamat email studio. Selama kosong, formulir menampilkan pesan bahwa penerima belum diatur.
const CONTACT_EMAIL = "";

const menuBtn = document.querySelector(".menu-btn");
const nav = document.getElementById("nav-utama");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}

menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    setMenu(false);
    menuBtn.focus();
  }
});

const form = document.getElementById("form-kontak");
const statusEl = document.getElementById("status");
const submitBtn = form.querySelector("button[type=submit]");

const rules = {
  nama: (v) => (v.trim() ? "" : "Isi nama Anda."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Isi alamat email yang valid."),
  pesan: (v) => (v.trim().length >= 10 ? "" : "Ceritakan kebutuhan Anda minimal 10 karakter."),
};

function showStatus(text, kind) {
  statusEl.textContent = text;
  statusEl.className = "status " + kind;
  statusEl.hidden = false;
}

function validate() {
  let first = null;
  for (const name of Object.keys(rules)) {
    const field = form.elements[name];
    const msg = rules[name](field.value);
    const err = document.getElementById("err-" + name);
    err.textContent = msg;
    err.hidden = !msg;
    field.setAttribute("aria-invalid", String(Boolean(msg)));
    if (msg) {
      field.setAttribute("aria-describedby", err.id);
      first = first || field;
    } else {
      field.removeAttribute("aria-describedby");
    }
  }
  return first;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  statusEl.hidden = true;
  const invalid = validate();
  if (invalid) {
    invalid.focus();
    return;
  }
  if (!CONTACT_EMAIL) {
    showStatus("Formulir belum tersambung ke alamat penerima, jadi pesan belum terkirim.", "bad");
    return;
  }
  submitBtn.disabled = true;
  submitBtn.textContent = "Membuka email...";
  const subject = encodeURIComponent("Kebutuhan website dari " + form.nama.value.trim());
  const body = encodeURIComponent(form.pesan.value.trim() + "\n\nNama: " + form.nama.value.trim() + "\nEmail: " + form.email.value.trim());
  window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Kirim Pesan";
    showStatus("Aplikasi email Anda dibuka dengan pesan yang sudah terisi. Kirim dari sana untuk menyelesaikan.", "ok");
  }, 800);
});

form.addEventListener("input", (e) => {
  const name = e.target.name;
  if (rules[name] && e.target.getAttribute("aria-invalid") === "true" && !rules[name](e.target.value)) {
    document.getElementById("err-" + name).hidden = true;
    e.target.setAttribute("aria-invalid", "false");
  }
});
