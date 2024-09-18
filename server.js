/**
 * An Express.js server that listens on port 3000 and provides a single endpoint to scramble incoming messages.
 *
 * The server expects incoming requests to have a JSON body with a 'msg' property containing the message to be scrambled.
 *
 * The scrambling algorithm used is a simple Caesar cipher, where each letter in the message is shifted by a fixed number of positions (default is 3) in the alphabet.
 *
 * Non-alphabetic characters in the message are left unchanged.
 *
 * The scrambled message is returned as a string in the response body.
 *
 * @example
 * Send a request to the server with a message to be scrambled
 * fetch('http://localhost:3000/', {
 *   method: 'GET',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ msg: 'Hello, World!' })
 * })
 * .then(response => response.text())
 * .then(scrambledMessage => console.log(scrambledMessage)); // Output: Khoor, Zruog!
 *
 * @author [c-stxrm]
 */

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
	const message = JSON.stringify(req.body.msg);
	const shift = 3; // you can adjust this value
	console.log("recived message :", message);
	const scrambledMessage = message
		.split("")
		.map((char) => {
			if (char.match(/[a-zA-Z]/)) {
				const asciiOffset = char === char.toUpperCase() ? 65 : 97;
				return String.fromCharCode(
					((char.charCodeAt(0) - asciiOffset + shift) % 26) + asciiOffset
				);
			}
			return char;
		})
		.join("");

	res.send(scrambledMessage);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
