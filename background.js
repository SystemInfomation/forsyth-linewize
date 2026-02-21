// Forsyth Linewize – background service worker
// Blocks requests to Linewize filtering domains using the declarativeNetRequest API.

const LINEWIZE_IDS = [
  "ddfbkhpmcdbciejenfcolaaiebnjcbfc", // Linewize
  "ifinpabiejbjobcphhaomiifjibpkjlf"  // Linewize Filter
];

const rules = LINEWIZE_IDS.map((id, index) => ({
  id: index + 1,
  priority: 1,
  action: { type: "block" },
  condition: { urlFilter: `chrome-extension://${id}/*`, resourceTypes: ["main_frame", "sub_frame", "xmlhttprequest", "script", "image", "stylesheet", "font", "media", "websocket", "other"] }
}));

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(r => r.id),
    addRules: rules
  });
});

