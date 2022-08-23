
function listener(details) {
    // ATTENTION: security ferature ahead!
    // This makes sure, only requests to from this extension are modified, not *all* web responses.
    // **Do not remove this!**
    if (details.originUrl !== browser.runtime.getURL("background/background.html") ||
        details.documentUrl !== browser.runtime.getURL("background/background.html")) {
        return;
    }

    const additionalHeader = {
        name: "Access-Control-Allow-Origin",
        value: "*"
    };

    details.responseHeaders.push(additionalHeader);

    return { responseHeaders: details.responseHeaders };
}

/**
 * Initialize the module.
 */
export function init() {
    browser.webRequest.onHeadersReceived.addListener(
        listener,
        { urls: ["https://www.gstatic.com/*"] },
        ["blocking", "responseHeaders"]
    );
}
