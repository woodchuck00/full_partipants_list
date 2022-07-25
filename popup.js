let checkPageButton = document.querySelector('#check_page')
let displayList = document.querySelector('#display_list ul')
let count = document.querySelector('#count')
let list = []

checkPageButton.addEventListener('click', function() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    let tab = tabs[0];

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getData,
      args: [list] 
    });
  });

  chrome.storage.local.get(["list"], ({ list }) => {
    if(list.length > 0) {
        list.sort((a, b) => a.localeCompare(b))
      }

    count.innerHTML = list.length

    list.forEach((x) => {
      let newItem = document.createElement('li')
      newItem.innerHTML = x

      displayList.appendChild(newItem)
    })
  });
}, false);

function getData(list) {
  document.querySelectorAll('#author-name').forEach((x) => {
    if(!list.includes(x.textContent)) {
      list.push(x.textContent)
    }
  })

  chrome.storage.local.set({ list: list });
}

