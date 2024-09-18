/**

RAM Cache Proxy Server:
A caching layer between clients and a backend server,
using an in-memory cache to store responses
and reduce the load on the backend,
with a single GET endpoint that checks
the cache before making
 a request to the backend server. */

/**
 * RAM Cache Proxy Server
 *
 * This server acts as a proxy between clients and a backend server, caching responses to reduce the load on the backend.
 *
 * @author [c-stxrm]
 */

const express = require("express");
const app = express();
const port = 4000;
const axios = require("axios");

/**
 * RAM Cache storage
 * @type {Array<{msg: string, res: any}>}
 */
var RamCache = [];

app.use(express.json());

/**
 * Handle GET requests to the proxy server
 *
 * @param {express.Request} req - The incoming request
 * @param {express.Response} res - The response to send back to the client
 */
app.get("/", async (req, res) => {
	let state = 0;
	console.table(req.body);
	console.table(RamCache);
	for (let i = 0; i < RamCache.length; i++) {
		console.log("READING CACHE :::", RamCache[i].msg);
		if (RamCache[i].msg === req.body.msg) {
			console.log("Found msg cached at index", i);
			res.json(RamCache[i].res);
			state = 1;
			break;
		}
	}
	if (state === 0) {
		console.log("didn't find in cache, searching on the server");
		try {
			/**
			 * Make a request to the backend server
			 * @type {Promise<AxiosResponse<any>>}
			 */
			const response = await axios.get("http://localhost:3000/", {
				params: {},
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					msg: req.body.msg,
				},
			});

			RamCache.push({ msg: req.body.msg, res: response.data });
			res.json(response.data);
		} catch (error) {
			console.error("Error fetching data from server:", error);
			res.status(500).json({ error: "Failed to fetch data from server" });
		}
	}
});

/**
 * Start the server
 */
app.listen(port, () => {
	console.log(`RAMCACHE PROXY RUNNING ::: ${port}`);
});
