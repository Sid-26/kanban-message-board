const socketUrl = "ws://localhost:8080/webboards-1.0-SNAPSHOT/ws"
const baseUrl = "http://localhost:8080/webboards-1.0-SNAPSHOT"
// Create WebSocket connection.
let socket;
// const socket = new WebSocket(socketUrl);
let username;

// Login handler
function login() {
    // get form data
    const formData = {
        "user": document.getElementById('username').value,
        "pwd": document.getElementById('password').value
    };
    console.log(JSON.stringify(formData));
    // make API call
    fetch(baseUrl+'/login-servlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // check login status and display appropriate message
            if (data.loginStatus) {
                username = data.username;
                // redirect to home page
                window.localStorage.setItem("username",username);
                window.location.href = 'home.html';
                // // open the socket
                // socket = new WebSocket(socketUrl+`/${username}`);
                // setupSocket(socket);

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
        "user": document.getElementById('username').value,
        "pwd": document.getElementById('password').value
    };

    // make API call
    fetch(baseUrl+'/signup-servlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // check login status and display appropriate message
            if (data.success) {
                alert('Signup successful!');
                username = data.username;
                // redirect to page
                window.localStorage.setItem("username",username);
                window.location.href = 'home.html';
                // // open the socket
                // socket = new WebSocket(socketUrl+`/${username}`);
                // console.log("Socket connection created: "+socket);
                // setupSocket(socket);
            } else {
                alert('Signup failed');
            }
        })
        .catch(error => {
            console.log('Error during signup:', error);
            // alert('An error occurred during signup');
        });
}
function setupSocket(){
    socket = new WebSocket(socketUrl+`/${window.localStorage.getItem("username")}`);

    // Connection opened
    socket.addEventListener("open", (event) => {
        console.log(event);
        console.log(socket.readyState);
    });

// Listen for messages (work in progress)
    socket.addEventListener("message", (event) => {
        console.log(event.data)
        console.log("got message")
        switch(event.data.type){
            case "new-card":
                addCard(event.data.title);
                break;
            case "delete-card":
                removeCard(event.data.position);
                break;
            case "new-note":
                addNote(event.data.position,event.data.card);
                break;
            case "delete-note":
                removeNote(pos,cardPos);
                break;
        }
    });
    return socket;
}


function addCard(title){

}

function removeCard(pos){}

function addNote(title,cardPos){}

function removeNote(){}