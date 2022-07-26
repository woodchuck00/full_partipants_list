let genListButton = document.querySelector('#gen_list')
let clearStorageButton = document.querySelector('#clear_storage')
let displayList = document.querySelector('#display_list ul')
let count = document.querySelector('#count')
let list = []

document.addEventListener("DOMContentLoaded", makeList, false) 

genListButton.addEventListener('click', makeList, false)

clearStorageButton.addEventListener('click', () => {
  let data = []
  chrome.storage.local.set({ list: data })

  document.querySelectorAll("#display_list ul li").forEach((x) => {
    x.remove();
  })
  count.innerHTML = "0"
}, false)

function makeList() {
  chrome.storage.local.get(['list'], ({ list }) => {
    chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
      let tab = tabs[0];

      
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: (x) => {console.log(x)},
        args: [list]
     })

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getData,
        args: [list] 
      });
    });

    if(list.length > 0) {
      list.sort((a, b) => a.localeCompare(b))
    } else {
      list = []
    }

    count.innerHTML = list.length

    document.querySelectorAll("#display_list ul li").forEach((x) => {
      x.remove();
    })

    list.forEach((x) => {
      let newItem = document.createElement('li')
      newItem.innerHTML = x

      displayList.appendChild(newItem)
    })

    window.scrollTo(0, 0)
  });
}

function getData(list) {
  document.querySelectorAll('#author-name').forEach((x) => {
    if(!list.includes(x.textContent)) {
      list.push(x.textContent)
    }
  })

  chrome.storage.local.set({ list: list });
}

