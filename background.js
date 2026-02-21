// Forsyth Linewize – background service worker
// Disables Linewize filtering extensions using the management API.

const LINEWIZE_IDS = [
  "ddfbkhpmcdbciejenfcolaaiebnjcbfc", // Linewize
  "ifinpabiejbjobcphhaomiifjibpkjlf"  // Linewize Filter
];

function disableLinewize() {
  LINEWIZE_IDS.forEach(id => {
    chrome.management.setEnabled(id, false, () => {
      if (chrome.runtime.lastError) {
        // Extension not installed or policy-managed; ignore
      }
    });
  });
}

chrome.runtime.onInstalled.addListener(disableLinewize);

// Re-check periodically in case the extension restarts itself
chrome.alarms.create("linewizeWatchdog", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "linewizeWatchdog") disableLinewize();
});

