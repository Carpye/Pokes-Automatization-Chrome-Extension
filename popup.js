document.addEventListener("DOMContentLoaded", function(){
    printUsers()
    const input = document.getElementById('input_name')

    document.getElementById('submit_btn').addEventListener('click', () => {
        const name = input.value
        if (name) addUser(name)
        input.value = ""
    })

});

function printUsers() {
    const allowedUsersList = document.getElementById('allowedUsers')
    chrome.storage.sync.get(['allowedUsers'], function (result) {
        const allowedUsers = (!result.allowedUsers) ? [] : JSON.parse(result.allowedUsers)
        
        allowedUsersList.innerHTML = allowedUsers.map((user, index) => `<li>${user}<button class='remove_btn' id='user${index}'>Remove</button></li>`)

        document.querySelectorAll('.remove_btn').forEach(el => el.addEventListener('click', (e) => {
            ('click');
            const index = Number(e.target.id.slice(4))
            removeUser(index)
        }))
    }) || []


}

function addUser(name) {
    chrome.storage.sync.get(['allowedUsers'], function (result) {
        const allowedUsers = (!result.allowedUsers) ? [] : JSON.parse(result.allowedUsers)
        allowedUsers.push(name)
        chrome.storage.sync.set({'allowedUsers': JSON.stringify(allowedUsers)}).then(() => {
            ("Value is set to" + JSON.stringify(allowedUsers));
        })
        printUsers()
    }) || []

}

function removeUser(index) {
    chrome.storage.sync.get(['allowedUsers'], function (result) {
        const allowedUsers = JSON.parse(result.allowedUsers) || []
        allowedUsers.splice(index, 1)
        chrome.storage.sync.set({'allowedUsers': JSON.stringify(allowedUsers)}).then(() => {
            ("Value is set to" + JSON.stringify(allowedUsers));
        })
        printUsers()
    }) || []

    
}