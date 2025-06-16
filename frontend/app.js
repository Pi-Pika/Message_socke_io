// Get references to the DOM elements
const joinRoomButton = document.getElementById("RoomButton");
const messageInput = document.getElementById("Message");
const roomInput = document.getElementById("Room");
const form = document.getElementById("Form");
const socket = io(); // Connects to the server

socket.on("connect", () => {
    displayMessage(`You connected with id: ${socket.id}`);
});

socket.on("receive-message", message => {
    displayMessage(message);
})

// Add an event listener to the form for submission
form.addEventListener("submit", e => {
    e.preventDefault();
    
    const message = messageInput.value;

    console.log("Message is send: "+ message);
    const room = roomInput.value;
    if (message === "") return;

    displayMessage(message);
    socket.emit("send-message", message, room);
    messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
    const room = roomInput.value;
    socket.emit("join-room", room, message => {
        displayMessage(message);
    });
});

function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("MessageBox").append(div);
}
