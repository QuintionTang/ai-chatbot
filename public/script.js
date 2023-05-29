const socket = io();

const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");
const messages = document.getElementById("messages");

function displayMessage(role, message) {
    const div = document.createElement("div");
    div.innerHTML = `<div class="ctext-wrap"><p><b>${
        role === "user" ? "You" : "Assistant"
    }:</b> ${message}</p></div>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

messageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = messageInput.value;
    displayMessage("user", message); //

    socket.emit("sendMessage", message, (error) => {
        if (error) {
            return alert(error);
        }

        messageInput.value = "";
        messageInput.focus();
    });
});

socket.on("message", (message) => {
    displayMessage("assistant", message);
});
