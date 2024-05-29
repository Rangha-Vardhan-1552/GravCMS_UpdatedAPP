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

var generateResponse = async function (chatElement) {
    var messageElement = chatElement.querySelector("p");
    var requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer ".concat(API_KEY)
        },
        body: JSON.stringify({
            model: "phi3",
            prompt: userMessage,
            stream: true
        })
    };
    if (messageElement) {
        messageElement.textContent = "Thinking...";
    }
    try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) throw new Error("Network response was not ok");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let content = "";
        let wordCount = 0;
        let popupContentElement;

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            // Split the chunk into JSON objects if multiple objects are received
            const jsonObjects = chunk.split('\n').filter(Boolean);
            for (const jsonObject of jsonObjects) {
                const data = JSON.parse(jsonObject);
                const responseContent = data.response || data.content || ""; // Adjust according to your response structure
                content += responseContent;

                // Count words in the response content
                const words = content.split(/\s+/);
                wordCount = words.length;

                if (wordCount > 100) {
                    if (!messageElement.querySelector(".read-more")) {
                        const truncatedContent = words.slice(0, 100).join(' ');
                        messageElement.textContent = truncatedContent;

                        const readMoreLink = document.createElement("a");
                        readMoreLink.href = "#";
                        readMoreLink.textContent = " ...read more";
                        readMoreLink.classList.add("read-more");
                        readMoreLink.addEventListener("click", function (e) {
                            e.preventDefault();
                            popupContentElement = showPopup(content);
                        });
                        messageElement.appendChild(readMoreLink);
                    }
                } else {
                    messageElement.textContent = content;
                }

                if (popupContentElement) {
                    popupContentElement.textContent = content;
                }

                if (chatbox) chatbox.scrollTo(0, chatbox.scrollHeight);
            }
        }
    } catch (error) {
        if (messageElement) {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }
    }
};

var showPopup = function (content) {
    // Create a blur background element
    var blurBackground = document.createElement("div");
    blurBackground.classList.add("blur-background");

    // Create a popup element
    var popup = document.createElement("div");
    popup.classList.add("popup");

    // Create a close button for the popup
    var closePopupBtn = document.createElement("button");
    closePopupBtn.textContent = "X";
    closePopupBtn.classList.add("close-popup");
    closePopupBtn.addEventListener("click", function () {
        document.body.removeChild(popup);
        document.body.removeChild(blurBackground);
        document.body.classList.remove("show-popup");
    });

    // Create a content element for the popup
    var popupContent = document.createElement("p");
    popupContent.textContent = content;

    // Append the content and close button to the popup
    popup.appendChild(closePopupBtn);
    popup.appendChild(popupContent);

    // Append the blur background and popup to the body
    document.body.appendChild(blurBackground);
    document.body.appendChild(popup);

    // Apply blur background
    document.body.classList.add("show-popup");

    return popupContent;
};

var handleChat = function () {
    userMessage = chatInput ? chatInput.value.trim() : null; // Get user entered message and remove extra whitespace
    if (!userMessage) return;
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

chatInput?.addEventListener("input", function () {
    // Adjust the height of the input textarea based on its content
    if (chatInput) {
        chatInput.style.height = "".concat(inputInitHeight, "px");
        chatInput.style.height = "".concat(chatInput.scrollHeight, "px");
    }
});

chatInput?.addEventListener("keydown", function (e) {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn?.addEventListener("click", handleChat);
closeBtn?.addEventListener("click", function () {
    return document.body.classList.remove("show-chatbot");
});
chatbotToggler?.addEventListener("click", function () {
    return document.body.classList.toggle("show-chatbot");
});
