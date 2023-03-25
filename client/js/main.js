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