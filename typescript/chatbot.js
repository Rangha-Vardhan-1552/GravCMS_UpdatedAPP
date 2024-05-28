var chatbotToggler = document.querySelector(".chatbot-toggler");
var closeBtn = document.querySelector(".close-btn");
var chatbox = document.querySelector(".chatbox");
var chatInput = document.querySelector(".chat-input textarea");
var sendChatBtn = document.querySelector(".chat-input span");
var userMessage = null; // Variable to store user's message
var API_KEY = ""; // Paste your API key here
var inputInitHeight = chatInput ? chatInput.scrollHeight : 0;
var createChatLi = function (message, className) {
    // Create a chat <li> element with passed message and className
    var chatLi = document.createElement("li");
    chatLi.classList.add("chat", "".concat(className));
    var chatContent = className === "outgoing" ? "<p></p>" : "<span class=\"material-symbols-outlined\">smart_toy</span><p></p>";
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
};
var generateResponse = function (chatElement) {
    var API_URL = "https://api.openai.com/v1/chat/completions";
    var messageElement = chatElement.querySelector("p");
    // Define the properties and message for the API request
    var requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer ".concat(API_KEY)
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        })
    };
    // Display "Thinking..." message while waiting for the response
    if (messageElement)
        messageElement.textContent = "Thinking...";
    // Send POST request to API and handle streaming response
    fetch(API_URL, requestOptions)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var content = data.choices[0].message.content.trim(); // Extract content from response
        // Split the content into words
        var words = content.split(' ');
        var index = 0;
        if (messageElement)
            messageElement.textContent = "";
        // Function to display words word-by-word with a delay
        var typingInterval = window.setInterval(function () {
            if (index < words.length) {
                // Append the next word to the partial message
                if (messageElement)
                    messageElement.textContent += (index === 0 ? '' : ' ') + words[index];
                index++;
            }
            else {
                // Stop the interval when all words are displayed
                clearInterval(typingInterval);
                // Scroll to bottom after adding all words
                if (chatbox)
                    chatbox.scrollTo(0, chatbox.scrollHeight);
            }
        }, 200); // Adjust typing speed as needed
    })
        .catch(function () {
        if (messageElement) {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }
    });
};
var handleChat = function () {
    userMessage = chatInput ? chatInput.value.trim() : null; // Get user entered message and remove extra whitespace
    if (!userMessage)
        return;
    // Clear the input textarea and set its height to default
    if (chatInput) {
        chatInput.value = "";
        chatInput.style.height = "".concat(inputInitHeight, "px");
    }
    // Append the user's message to the chatbox
    if (chatbox) {
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
    setTimeout(function () {
        // Display "Thinking..." message while waiting for the response
        var incomingChatLi = createChatLi("Thinking...", "incoming");
        if (chatbox) {
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }
        generateResponse(incomingChatLi);
    }, 600);
};
chatInput === null || chatInput === void 0 ? void 0 : chatInput.addEventListener("input", function () {
    // Adjust the height of the input textarea based on its content
    if (chatInput) {
        chatInput.style.height = "".concat(inputInitHeight, "px");
        chatInput.style.height = "".concat(chatInput.scrollHeight, "px");
    }
});
chatInput === null || chatInput === void 0 ? void 0 : chatInput.addEventListener("keydown", function (e) {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});
sendChatBtn === null || sendChatBtn === void 0 ? void 0 : sendChatBtn.addEventListener("click", handleChat);
closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", function () { return document.body.classList.remove("show-chatbot"); });
chatbotToggler === null || chatbotToggler === void 0 ? void 0 : chatbotToggler.addEventListener("click", function () { return document.body.classList.toggle("show-chatbot"); });
