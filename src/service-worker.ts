const GOOGLE_MEET_ORIGIN = 'meet.google.com';

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
    if (!tab.url) return;
    const url = new URL(tab.url);
    // Enables the side panel on meet.google.com
    if (url.origin.includes(GOOGLE_MEET_ORIGIN)) {
        await chrome.sidePanel.setOptions({
            tabId,
            path: 'src/pages/sidepanel/sidepanel.html',
            enabled: true
        });
        // chrome.tabs.sendMessage(tabId, "REVEAL_ESTIMATIONS").then(response => {console.log(response)});
    } else {
        // Disables the side panel on all other sites
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: false
        });
    }
});

