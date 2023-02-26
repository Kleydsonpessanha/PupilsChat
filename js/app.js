const socket = io();
const nameOfUser =  document.querySelector(".name-of-user")
const btnCommunity = document.getElementById("community")
const btnHistory = document.getElementById("chat-history")
const btnContact = document.getElementById("contact")
const logOff = document.getElementById("log-off")
const input = document.getElementById("input-send-message")
const form = document.getElementById("form")
const messages = document.getElementById("messages")
const buttonSend = document.getElementById("button-send")
         
        
socket.on('connect', function() {
    const username = document.getElementById("email-login").value
    user = {id: socket.id, name: username}
    socket.emit("NEW USER", user)
    users[socket.id] = user
    renderUsers()
})


buttonSend.addEventListener('click', function(e) {
e.preventDefault()
 if(input.value) {
    socket.emit("chat message", input.value)
    input.value = "";
 }
})

socket.on("chat message", function(msg) {
const li = document.createElement("li")
li.textContent = msg;
messages.appendChild(li)
})

let users = {}
let user = undefined

function renderUsers() {
    nameOfUser.innerHTML = `${Object.keys(users).map((userId) => {
        const user = users[userId]
        nameOfUser.innerHTML = user.name
    }).join('')}`
}