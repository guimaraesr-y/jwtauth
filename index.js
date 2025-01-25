import app from "./app.js";
import config from "./config.js";

const { server } = config;
const { port } = server;

app.listen(port, () => console.log("[+] listening on", port));