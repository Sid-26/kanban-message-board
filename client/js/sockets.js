let webSocket = new WebSocket("ws://localhost:8080/api-1.0-SNAPSHOT/ws");

let data;
webSocket.addEventListener("open", (event) => {
    // for now we just connecting the client and showing there is a connection
    console.log("Connected client");
});

webSocket.addEventListener("message",(event)=>{
    console.log(event.data)
    data = JSON.parse(event.data); // data is {id:id,
    console.log("Connected client is " + data["id"])
})

// idk whats going on here tbh, i just wanna click button and send text as json
document.getElementById("submit-btn-record").addEventListener("click",
    function (event) {
        let value = document.getElementById("record").value;
        let request = {"type":"record","id":data.id,"value":value};
        webSocket.send(JSON.stringify(request));
        event.target.value = "";
    });
