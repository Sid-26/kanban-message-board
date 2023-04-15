const socketUrl = "ws://localhost:8080/api-1.0-SNAPSHOT/ws"
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
                // redirect to home page
                window.location.href = '/home.html';
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
                // open the socket
                socket = new WebSocket(socketUrl);
                // redirect to page

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
    console.log(event);
});

// Listen for messages
socket.addEventListener("message", (event) => {
    switch(event.data.type){
        case "new-card":
            addCard(event.data.title);
            break;
        case "delete-card":
            removeCard(event.data.position);
            break;
        case "new-note":
            addNote(title,cardPos);
            break;
        case "delete-note":
            removeNote(pos,cardPos);
            break;
    }
});

function addCard(title){

}

function removeCard(pos){}

function addNote(title,cardPos){}

function removeNote(){}