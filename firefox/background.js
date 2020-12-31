browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "activate_icon") {
        browser.pageAction.show(sender.tab.id);
    }
    else if (request.message === "inactivate_icon") {
        browser.pageAction.hide(sender.tab.id);
    }
});