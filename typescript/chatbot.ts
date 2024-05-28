const chatbotToggler: HTMLElement | null = document.querySelector(".chatbot-toggler");
const closeBtn: HTMLElement | null = document.querySelector(".close-btn");
const chatbox: HTMLElement | null = document.querySelector(".chatbox");
const chatInput: HTMLTextAreaElement | null = document.querySelector(".chat-input textarea") as HTMLTextAreaElement;
const sendChatBtn: HTMLElement | null = document.querySelector(".chat-input span");

let userMessage: string | null = null; // Variable to store user's message
const API_KEY: string = ""; // Paste your API key here
const inputInitHeight: number = chatInput ? chatInput.scrollHeight : 0;

const createChatLi = (message: string, className: string): HTMLLIElement => {
    // Create a chat <li> element with passed message and className
    const chatLi: HTMLLIElement = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent: string = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p")!.textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement: HTMLLIElement): void => {
    const API_URL: string = "https://api.openai.com/v1/chat/completions";
    const messageElement: HTMLElement | null = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        })
    };

    // Display "Thinking..." message while waiting for the response
    if (messageElement) messageElement.textContent = "Thinking...";

    // Send POST request to API and handle streaming response
    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            const content: string = data.choices[0].message.content.trim(); // Extract content from response

            // Split the content into words
            const words: string[] = content.split(' ');
            let index: number = 0;
            if (messageElement) messageElement.textContent = "";
            // Function to display words word-by-word with a delay
            const typingInterval: number = window.setInterval(() => {
                if (index < words.length) {
                    // Append the next word to the partial message
                    if (messageElement) messageElement.textContent += (index === 0 ? '' : ' ') + words[index];
                    index++;
                } else {
                    // Stop the interval when all words are displayed
                    clearInterval(typingInterval);
                    // Scroll to bottom after adding all words
                    if (chatbox) chatbox.scrollTo(0, chatbox.scrollHeight);
                }
            }, 200); // Adjust typing speed as needed
        })
        .catch(() => {
            if (messageElement) {
                messageElement.classList.add("error");
                messageElement.textContent = "Oops! Something went wrong. Please try again.";
            }
        });
};


const handleChat = (): void => {
    userMessage = chatInput ? chatInput.value.trim() : null; // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    if (chatInput) {
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;
    }

    // Append the user's message to the chatbox
    if (chatbox) {
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi: HTMLLIElement = createChatLi("Thinking...", "incoming");
        if (chatbox) {
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput?.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    if (chatInput) {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
    }
});

chatInput?.addEventListener("keydown", (e: KeyboardEvent) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn?.addEventListener("click", handleChat);
closeBtn?.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler?.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));


