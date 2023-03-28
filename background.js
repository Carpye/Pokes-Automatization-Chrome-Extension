// event to run execute.js content when extension's button is clicked
// chrome.action.onClicked.addListener(execScript);
chrome.storage.onChanged.addListener(storageOnChanged);

// async function execScript() {
//   const tabId = await getTabId();
//   chrome.scripting.executeScript({
//     target: {tabId: tabId},
//     files: ['execute.js']
//   })
// }

async function getTabId() {
  const tabs = await chrome.tabs.query({active: true, currentWindow: true});
  return (tabs.length > 0) ? tabs[0].id : null;
}

async function storageOnChanged(changes) {
  const tabId = await getTabId();
  await chrome.scripting.executeScript({
    target: {tabId: tabId},
    files: ['after.js']
  })
}
