const socketUrl = "ws://localhost:8080/api-1.0-SNAPSHOT/"
// Create WebSocket connection.
let socket;
// const socket = new WebSocket(socketUrl);

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
                // open the socket
                socket = new WebSocket(socketUrl);

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
        pwd: document.getElementById('password').value,
        cpwd: document.getElementById('password-confirm').value
    };
    if(formData.pwd !== formData.cpwd){
        alert("Passwords don't match!");
    }
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
                // open the socket
                socket = new WebSocket(socketUrl);
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
// socket.addEventListener("open", (event) => {
//     socket.send("Hello Server!");
// });

// Listen for messages
// socket.addEventListener("message", (event) => {
//     console.log("Message from server ", event.data);
// });



const cardsContainer = document.querySelector('.cards-container');
const addCardBtn = document.querySelector('#add-card-btn');

addCardBtn.addEventListener('click', () => {
    // Create a new card
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.id = 'title';

    // Create the card title input
    const cardTitleInput = document.createElement('input');
    cardTitleInput.type = 'text';
    cardTitleInput.placeholder = 'Add a title...';
    cardTitleInput.id = 'title';

    // Create the card title submit button
    const cardTitleSubmitBtn = document.createElement('button');
    cardTitleSubmitBtn.type = 'button';
    cardTitleSubmitBtn.textContent = 'Submit';
    cardTitleSubmitBtn.className = 'card-title-submit-btn';

    // Delete button
    const deleteCardButton = document.createElement('button');
    deleteCardButton.type = 'button';
    deleteCardButton.className = 'add-message-btn';
    deleteCardButton.textContent = 'Delete Card';

    // Append the card title input and submit button to the new card
    newCard.appendChild(cardTitleInput);
    newCard.appendChild(cardTitleSubmitBtn);
    newCard.appendChild(deleteCardButton);

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
        // Check if the title input is empty
        if (cardTitleInput.value.trim() === '') {
            cardTitleInput.value = 'Empty Title';
        }

        // Create the card title
        const cardTitle = document.createElement('div');
        cardTitle.className = 'card-title';
        cardTitle.textContent = cardTitleInput.value;

        // Insert the card title into the new card
        newCard.insertBefore(cardTitle, cardTitleInput);

        // Remove the title input and submit button
        newCard.removeChild(cardTitleInput);
        newCard.removeChild(cardTitleSubmitBtn);
    };
    const deleteCard = (event) => {
        event.target.parentNode.remove();
    };


    cardTitleSubmitBtn.addEventListener('click', createCardTitle);
    cardTitleInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            createCardTitle();
        }
    });
    deleteCardButton.addEventListener('click', deleteCard);
    deleteCardButton.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            deleteCard(event);
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
        messageSubmitBtn.className = 'add-message-btn';

        // Create the message delete button
        const messageDeleteBtn = document.createElement('button');
        messageDeleteBtn.type = 'button';
        messageDeleteBtn.textContent = 'Delete Message';
        messageDeleteBtn.className = 'add-message-btn';

        // Create the message card
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.appendChild(messageInput);
        messageCard.appendChild(messageSubmitBtn);
        messageCard.appendChild(messageDeleteBtn);

        // Add the message card to the card
        newCard.appendChild(messageCard);
        // Focus the message input box
        messageInput.focus();

        // When the user clicks the message submit button or presses Enter, create the message
        const createMessage = () => {
            // Check if the message input is empty
            if (messageInput.value.trim() === '') {
                messageInput.value = 'Empty Message';
            }

            // Create the message element
            const message = document.createElement('div');
            message.className = 'message';
            message.textContent = messageInput.value;

            // Insert the message into the message card
            messageCard.insertBefore(message, messageInput);

            // Remove the message input and submit button
            messageCard.removeChild(messageInput);
            messageCard.removeChild(messageSubmitBtn);
        };

        messageSubmitBtn.addEventListener('click', createMessage);
        messageInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                createMessage();
            }
        });
        const deleteMessage = (event) => {
            event.target.parentNode.remove();
        };

        messageDeleteBtn.addEventListener('click', deleteMessage);
        messageDeleteBtn.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                deleteMessage(event);
            }
        });
    });
});
