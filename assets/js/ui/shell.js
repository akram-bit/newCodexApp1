import { APP_NAME } from "../utils/constants.js";

const navItems = [
  { key: "home", href: "index.html", label: "الرئيسية" },
  { key: "login", href: "login.html", label: "تسجيل الدخول" },
  { key: "admin", href: "admin.html", label: "المشرف العام" }
];

export function renderShell(containerId = "app-shell") {
  const root = document.getElementById(containerId);

  if (!root) {
    return;
  }

  const pageKey = document.body?.dataset?.page || "";

  const links = navItems
    .map((item) => {
      const activeClass = item.key === pageKey ? "active" : "";
      return `<a class="nav-link ${activeClass}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  root.innerHTML = `
    <header class="top-bar">
      <div class="container py-2 d-flex align-items-center justify-content-between gap-2 flex-wrap">
        <span class="top-bar__brand">${APP_NAME}</span>
        <nav class="nav nav-pills small">${links}</nav>
      </div>
    </header>
  `;
}
