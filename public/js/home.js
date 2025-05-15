function toggleChat() {

  const chatBody = document.getElementById("chat-main-container");
  const closeIcon = document.getElementById("close-chatbot")

  chatBody.style.display = chatBody.style.display === "none" ? "block" : "none";
  const arrow = chatBody.style.display === "none" ? "arrow_drop_up" : "arrow_drop_down"
  closeIcon.innerHTML = `<i class="material-icons">${arrow}</i>`

}
// async function sendChat() {
//   const input = document.getElementById("chat-input");
//   const msg = input.value.trim();
//   if (!msg) return;

//   const messagesDiv = document.getElementById("chat-messages");
//   messagesDiv.innerHTML += `<div><strong>You:</strong> ${msg}</div>`;
//   input.value = '';

//   const response = await fetch('/api/chat', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ message: msg })
//   });

//   const data = await response.json();
//   messagesDiv.innerHTML += `<div><strong>LaceBot:</strong> ${data.reply}</div>`;
//   messagesDiv.scrollTop = messagesDiv.scrollHeight;
// }

const userData = {
  message: null
}

document.addEventListener("DOMContentLoaded", () => {
  const chatBody = document.querySelector(".chat-body");
  const messageInput = document.getElementById("message-input-id");

  const sendButton = document.getElementById("send-message");

  // Create a message element with dynamic classes and return it
  const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
  }

  //Handle outgoing user messages
  const handleOutgoingMessage = (userMessage) => {
    userData.message = messageInput.value.trim();

    const messageContent = `<div class="message-text">${userData.message}</div>`;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");

    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message
    chatBody.appendChild(outgoingMessageDiv)

    //To simulate thinking response from the chatBot
    setTimeout(() => {
      const messageContent = `<img class="bot-avatar" src="/images/chatbot.png" width="50" height="50" />
                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;

      const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
      chatBody.appendChild(incomingMessageDiv)
    }, 600)
  }

  sendButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    const userMessage = messageInput.value.trim();

    if (userMessage) {
      console.log("User message:", userMessage);
      handleOutgoingMessage(e)
      messageInput.value = ""; // Clear input field
    } else {
      console.log("Input is empty");
    }
  });
});

