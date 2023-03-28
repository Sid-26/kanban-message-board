let webSocket = new WebSocket("ws://david_fill_it");

let data;
webSocket.addEventListener("open", (event) => {
    data = JSON.parse(event.data); // data is {id:id,
    // for now we just connecting the client and showing there is a connection
    console.log("Connected client" + data.id);
});

// idk whats going on here tbh, i just wanna click button and send text as json
document.getElementById("submit-btn-record").addEventListener("click",
    function (event) {
        let value = document.getElementById("record").value;
        let request = {"type":"record","id":data.id,"value":value};
        webSocket.send(JSON.stringify(request));
        event.target.value = "";
    });
