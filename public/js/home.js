function toggleChat() {
  
    const chatBody = document.getElementById("chat-main-container");
    const closeIcon = document.getElementById("close-chatbot")

    chatBody.style.display = chatBody.style.display === "none" ? "block" : "none";
    const arrow = chatBody.style.display === "none"? "arrow_drop_up" : "arrow_drop_down"
    closeIcon.innerHTML =  `<i class="material-icons">${arrow}</i>`
    
  }
  async function sendChat() {
    const input = document.getElementById("chat-input");
    const msg = input.value.trim();
    if (!msg) return;

    const messagesDiv = document.getElementById("chat-messages");
    messagesDiv.innerHTML += `<div><strong>You:</strong> ${msg}</div>`;
    input.value = '';

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })
    });

    const data = await response.json();
    messagesDiv.innerHTML += `<div><strong>LaceBot:</strong> ${data.reply}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }