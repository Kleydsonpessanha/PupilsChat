const socket = io();

function hours() {
    const date = new Date()
    const Hours =  date.getHours()
    const minutes = date.getMinutes()
    const dateOfUser = document.getElementsByClassName('data-of-user')
    

    dateOfUser.appendChild(paragraphHours)
    paragraphHours.innerHTML = `${Hours}:${minutes}`
}

const nameOfUser =  document.querySelector(".name-of-user")
const input = document.getElementById("input-send-message")
const messages = document.getElementById("messages")
const buttonSend = document.getElementById("button-send")

let user = undefined

buttonSend.addEventListener("click", function(e) {
    e.preventDefault()
    if(input.value) {
        socket.emit("chat message", {message: input.value, user: user})
        input.value = "";
     }
    })
    
input.addEventListener('keydown', (event) => {
if(event.key ==  'Enter') {
    if(input.value) {
        socket.emit("chat message", {message: input.value, user: user})
        input.value = "";
     }
}
})



    socket.on('connect', function() {


        const username = prompt('Qual é seu nome?')
        user = {id: socket.id, name: username}
        socket.emit("NEW USER", user)
        users[socket.id] = user
          
    })
    
    

    socket.on("chat message", function(data) {
        const h3 = document.createElement("h3")
        const p = document.createElement("p")
        const paragraphHours = document.createElement('span')
        const div = document.createElement("div")
        const textItens = document.createElement('div')
        
        const date = new Date()
        const Hours =  date.getHours()
        const minutes = date.getMinutes()

       
        h3.textContent = `${data.user.name}: `;
        p.textContent = ` ${data.message}` 
        paragraphHours.textContent = `${date.getHours()}:${date.getMinutes()}`

        div.appendChild(h3)
        textItens.appendChild(p)
        textItens.appendChild(paragraphHours)
        div.appendChild(textItens)
        messages.appendChild(div)
        
        div.setAttribute('class', 'data-global')
        textItens.setAttribute("class", "data-of-user")
        paragraphHours.classList.add('span-hours')
        h3.classList.add('name-of-user')
        p.classList.add('text-message')
        renderUsers()
        })


function renderUsers(users) {
        nameOfUser.innerHTML = Object.keys(users)
          .map((userId) => users[userId].name)
          .join(', ');
      }

        // socket.on("chat message", function(data) {
        //     const h5 = document.createElement("h5")
        //     h5.textContent = `${data.user.name}: ${data.message}`;
        //     messages.appendChild(h5)
        //     renderUsers()
        //     })