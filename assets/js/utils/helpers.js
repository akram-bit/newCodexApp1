export function getConfig() {
  return window.APP_CONFIG || {};
}

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function setStatusMessage(element, message, tone = "secondary") {
  if (!element) {
    return;
  }

  const toneClassMap = {
    success: "text-success",
    danger: "text-danger",
    info: "text-primary",
    secondary: "text-secondary"
  };

  element.className = `${toneClassMap[tone] || toneClassMap.secondary} small fw-semibold`;
  element.textContent = message;
}
