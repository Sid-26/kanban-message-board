const socketUrl = "ws://localhost:8080/api-1.0-SNAPSHOT/"
// Create WebSocket connection.
const socket = new WebSocket(socketUrl);

// Login handler
function login() {
    // get form data
    const formData = {
        user: document.getElementById('username').value,
        pwd: document.getElementById('password').value
    };

    // make API call
    fetch('/login-servlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // check login status and display appropriate message
            if (data.loginStatus) {
                // redirect to home page
                window.location.href = '/index.html';

            } else {
                alert('Invalid username or password');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred during login');
        });
}

function signup() {
    // get form data
    const formData = {
        user: document.getElementById('username').value,
        pwd: document.getElementById('password').value
    };

    // make API call
    fetch('/signup-servlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // check login status and display appropriate message
            if (data.success) {
                alert('Signup successful!');
            } else {
                alert('Signup failed');
            }
        })
        .catch(error => {
            console.error('Error during signup:', error);
            alert('An error occurred during signup');
        });
}
// Connection opened
socket.addEventListener("open", (event) => {
    socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
});
function post_to_server(endpoint, contentType) {

    // setting the url
    const url = "http://localhost:8080/api-1.0-SNAPSHOT/api/format/" + endpoint;

    // getting the payload
    const payload = document.getElementById("chart").innerHTML;

    /// creating a response to the server
    const request = new XMLHttpRequest();
    request.open("POST", url);                              // setting the method
    request.setRequestHeader("Content-Type", "text/html");  // setting the sending content-type
    request.setRequestHeader("Accept", contentType);        // setting the receiving content-type

    // on response handler
    request.onload = () => {
        if (request.status !== 200) {
            console.log(request.responseText);
            console.error("Something went wrong went contacting the server");
            console.log("Received from the server: ", request.responseText)
            return
        }
        console.log("Received from the server: ", request.responseText) // this contains the received payload

        /**
         * this is how to programmatically download something in javascript.
         * 1. create an invisible anchor tag
         * 2. set the href attribute (contains file data)
         * 3. set the download attribute (contains the file name)
         * 4. click it
         */
        var element = document.createElement('a');
        element.setAttribute('href', `data:${contentType};charset=utf-8,` + encodeURIComponent(request.responseText));
        element.setAttribute('download', `students.${endpoint}`);
        element.click();
    }

    // sending the payload to the server
    request.send(payload);
}
const cardsContainer = document.querySelector('.cards-container');
const addCardBtn = document.querySelector('#add-card-btn');

addCardBtn.addEventListener('click', () => {
    // Create a new card
    const newCard = document.createElement('div');
    newCard.className = 'card';

    // Create the card title input
    const cardTitleInput = document.createElement('input');
    cardTitleInput.type = 'text';
    cardTitleInput.placeholder = 'Add a title...';
    cardTitleInput.className = 'card-title-input';

    // Create the card title submit button
    const cardTitleSubmitBtn = document.createElement('button');
    cardTitleSubmitBtn.type = 'button';
    cardTitleSubmitBtn.textContent = 'Submit';
    cardTitleSubmitBtn.className = 'card-title-submit-btn';

    // Append the card title input and submit button to the new card
    newCard.appendChild(cardTitleInput);
    newCard.appendChild(cardTitleSubmitBtn);

    // Add the "Add Message" button to the new card
    const addMessageBtn = document.createElement('button');
    addMessageBtn.textContent = 'Add Message';
    addMessageBtn.className = 'add-message-btn';
    newCard.appendChild(addMessageBtn);

    // Add the new card to the cards container
    cardsContainer.insertBefore(newCard, addCardBtn);

    // Focus the card title input
    cardTitleInput.focus();

    // When the user clicks the submit button or presses Enter, create the card title
    const createCardTitle = () => {
        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = cardTitleInput.value;
        newCard.insertBefore(cardTitle, cardTitleInput);
        newCard.removeChild(cardTitleInput);
        newCard.removeChild(cardTitleSubmitBtn);
    };
    cardTitleSubmitBtn.addEventListener('click', createCardTitle);
    cardTitleInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            createCardTitle();
        }
    });

    // When the user clicks the "Add Message" button, create a message input box
    addMessageBtn.addEventListener('click', () => {
        // Create the message input box
        const messageInput = document.createElement('input');
        messageInput.type = 'text';
        messageInput.placeholder = 'Add a message...';
        messageInput.className = 'message-input';

        // Create the message submit button
        const messageSubmitBtn = document.createElement('button');
        messageSubmitBtn.type = 'button';
        messageSubmitBtn.textContent = 'Submit';
        messageSubmitBtn.className = 'message-submit-btn';

        // Create the message card
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.style.backgroundColor = '#60aeff';
        messageCard.style.display = 'block';
        messageCard.style.borderRadius = '3px';
        messageCard.style.boxShadow = '0 1px 0 rgba(9,30,66,.25)';
        messageCard.style.padding = '10px';
        messageCard.style.cursor = 'pointer';
        messageCard.style.marginBottom = '10px';
        messageCard.appendChild(messageInput);
        messageCard.appendChild(messageSubmitBtn);

        // Add the message card to the card
        newCard.appendChild(messageCard);

        // Focus the message input box
        messageInput.focus();

        // When the user clicks the message submit button or presses Enter, create the message
        const createMessage = () => {
            const message = document.createElement('div');
            message.className = 'message';

            message.textContent = messageInput.value;
            messageCard.insertBefore(message, messageInput);
            messageCard.removeChild(messageInput);
            messageCard.removeChild(messageSubmitBtn);
        };
        messageSubmitBtn.addEventListener('click', createMessage);
        messageInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                createMessage();
            }
        });
    });
});
