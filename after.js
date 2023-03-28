// this code will be executed after page load
// import data from './config.json';

(function() {
  // const data = require('./config.json');
  ('after.js executed');

  
  // const allowedUsers = ['Karolina Zaraza', 'Krzysztof Godyń', 'Kamil Włodarczyk']
  chrome.storage.sync.get(['allowedUsers']).then(result => {
    const allowedUsers = (!result.allowedUsers) ? [] : JSON.parse(result.allowedUsers)
  
    logic(allowedUsers)
  })

  
  

})();


function getName(element) {
  const name = element.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerText
  return name
}

function getButton(element) {
  const button = element.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0]
  return button
}

function logic(allowedUsers) {
  const temp = []
  document.querySelectorAll('[class="x1n2onr6 x1ja2u2z x9f619 x78zum5 xdt5ytf x2lah0s x193iq5w xjkvuk6 x1cnzs8"]').forEach(el => {
    if (el.getAttribute('style') === "margin-bottom: 8px;") {
      temp.push(el)
    }
  })

  const wrapper = temp[0].parentElement
    const [head, ...rows] = wrapper.childNodes
    rows.splice(rows.length -1, 1)

    let count = 0;
    rows.forEach((el, index) => {
      const name = getName(el)
      const button = getButton(el)
      if (allowedUsers.includes(name)) {
        const interval = setInterval(() => {
          if (button.getAttribute('aria-disabled') != "true") {
            button.click()
            count++
            (`Clicked ${count} times`);
          }
        }, 1000)
      }
    })
}