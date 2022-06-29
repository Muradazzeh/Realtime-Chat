`use strict`
const chatForm=document.getElementById("chat-form")
const chatMessage=document.querySelector('.chat-messages')
const roomName=document.getElementById('room-name')
const userList=document.getElementById('users')

/// how to get user details 
const {username, room }= Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
console.log(username,room)
const socket=io()

// join chat 
socket.emit('joinRoom',{username,room})

/// get romm and user 
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room)
    outputUsers(users)
})

// message from server
socket.on("message",message=>{
    // console.log(message)
    outputMessage(message)

    chatMessage.scrollTop=chatMessage.scrollHeight
})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const msg=e.target.elements.msg.value
    console.log(msg)

socket.emit("chatMessage",msg)
    e.target.elements.msg.value=''
    e.target.elements.msg.focus()

})

// output massage to user , DOM

function outputMessage(message){
    const div=document.createElement('div')
    div.classList.add('message')
    div.innerHTML=`<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

// room name 
function outputRoomName(room){
roomName.innerText=room
}

// user name 
function  outputUsers(users){
    userList.innerHTML=`
    ${users.map(user=>`<li>${user.username}</li>`).join("")}

    `
}

