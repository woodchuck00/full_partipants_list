let list = []

chrome.runtime.onInstalled.addListener(() => {
  let data = []
  chrome.storage.local.set({ list: data })
  console.log('Default list is set to []');
});