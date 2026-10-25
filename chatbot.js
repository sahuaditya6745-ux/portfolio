const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatButton = document.getElementById("chatSend");
const chatMessages = document.getElementById("chatMessages");
const chatStatus = document.getElementById("chatStatus");
const chatReset = document.getElementById("chatReset");
const chatPrompts = Array.from(document.querySelectorAll(".chat-prompts [data-prompt]"));
const welcomeMessage = "Hi! What would you like to know about my work?";
let replyTimer;

function showChatMessage(role, text) {
  const message = document.createElement("div");
  message.className = "chat-message " + (role === "user" ? "chat-user" : "chat-assistant");
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return message;
}

function getPortfolioAnswer(question) {
  const text = question.toLocaleLowerCase();

  if (/project|built|work|portfolio|repository|repo/.test(text)) {
    return "Aditya's projects include a factorial calculator, Fibonacci sequence generator, struct-to-dictionary converter, AI-assisted Python refactoring, a reading list app, an interactive quiz app, and a student utilities testing project. Open any project card to visit its repository or live demo.";
  }
  if (/technolog|skill|language|stack|python|javascript|typescript|c\+\+|react|html|css/.test(text)) {
    return "The portfolio lists Python, C++, data structures, HTML, CSS, JavaScript, and AI/ML. The Reading List App uses TypeScript, React, and Tailwind CSS.";
  }
  if (/background|about|who|study|student|education|degree|college|university/.test(text)) {
    return "Aditya is a Computer Science and Engineering student specializing in Artificial Intelligence and Machine Learning. His focus includes software development, algorithmic problem solving, and practical AI-driven applications.";
  }
  if (/ai|machine learning|ml|artificial intelligence|refactor/.test(text)) {
    return "Aditya is exploring AI and machine learning as part of his Computer Science and Engineering studies. One listed project uses Cursor AI workflows to refactor Python code, with custom rules and attention to preserving behavior.";
  }
  if (/contact|email|reach|github|profile/.test(text)) {
    return "You can reach Aditya through the GitHub profile linked in the navigation and footer. No email address is listed on this portfolio.";
  }
  if (/hello|hi\b|hey\b|thanks|thank you/.test(text)) {
    return "Hi! I can share details about Aditya's projects, technologies, or background. What are you curious about?";
  }

  return "I can answer questions about Aditya's projects, skills, and background. Try asking about the projects, technologies, or his studies.";
}

function setChatBusy(isBusy) {
  chatButton.disabled = isBusy;
  chatInput.disabled = isBusy;
  chatPrompts.forEach(function (prompt) {
    prompt.disabled = isBusy;
  });
}

function sendChatMessage(text) {
  const question = (text || chatInput.value).trim();
  if (!question || chatButton.disabled) return;

  showChatMessage("user", question);
  chatInput.value = "";
  setChatBusy(true);
  chatStatus.textContent = "Assistant is thinking...";
  const typingMessage = showChatMessage("assistant", "Thinking...");
  typingMessage.classList.add("chat-thinking");

  replyTimer = window.setTimeout(function () {
    typingMessage.remove();
    showChatMessage("assistant", getPortfolioAnswer(question));
    setChatBusy(false);
    chatStatus.textContent = "";
    chatInput.focus();
  }, 320);
}

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();
  sendChatMessage();
});

chatPrompts.forEach(function (prompt) {
  prompt.addEventListener("click", function () {
    sendChatMessage(prompt.dataset.prompt);
  });
});

chatReset.addEventListener("click", function () {
  window.clearTimeout(replyTimer);
  chatMessages.replaceChildren();
  showChatMessage("assistant", welcomeMessage);
  setChatBusy(false);
  chatStatus.textContent = "";
  chatInput.value = "";
  chatInput.focus();
});