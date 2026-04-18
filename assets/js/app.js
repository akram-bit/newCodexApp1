import { getSupabaseClient, testSupabaseConnection } from "./services/supabase-client.js";
import { renderShell } from "./ui/shell.js";
import { setStatusMessage } from "./utils/helpers.js";

async function loadLocalConfigIfExists() {
  try {
    const response = await fetch("./assets/js/config.local.js", { cache: "no-store" });

    if (!response.ok) {
      return false;
    }

    const scriptText = await response.text();
    const run = new Function(scriptText);
    run();
    return true;
  } catch (_error) {
    return false;
  }
}

function bindConnectionTest() {
  const button = document.getElementById("test-connection-btn");
  const output = document.getElementById("connection-status");

  if (!button || !output) {
    return;
  }

  const { error } = getSupabaseClient();
  if (error) {
    setStatusMessage(output, `${error} انسخ config.example.js إلى config.local.js ثم حدّث القيم.`, "info");
  }

  button.addEventListener("click", async () => {
    button.disabled = true;
    setStatusMessage(output, "جاري اختبار الاتصال...", "secondary");

    const result = await testSupabaseConnection();

    if (result.ok) {
      setStatusMessage(output, result.message, "success");
    } else {
      setStatusMessage(output, result.message, "danger");
    }

    button.disabled = false;
  });
}

async function init() {
  await loadLocalConfigIfExists();
  renderShell();
  bindConnectionTest();
}

init();
