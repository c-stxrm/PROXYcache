# Proxy Server and Backend Server

================================

This repository contains three files:

### server.js

This file contains the backend server code, which listens on port 3000. It receives GET requests and responds with a message.

### proxy.js

This file contains the proxy server code, which listens on port 4000. It acts as an intermediary between clients and the backend server, caching responses to reduce the load on the backend server.

### HTTP Requests

This directory contains two example HTTP requests:

#### the main request you should be doing

```http
GET http://localhost:4000/
Content-Type: application/json

{
    "msg": "sample request to the mainline proxy"
}
```

### Running the Servers
run * `npm i` to setup the modules automatically
To run the servers, execute the following commands in separate terminals:

* `node server.js` to start the backend server
* `node proxy.js` to start the proxy server

### Sending Requests

Then, use a tool like `curl` or a web browser to send requests to:

* The proxy server: `http://localhost:4000/`
