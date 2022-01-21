import io from "socket.io-client";
const ENDPOINT = 'http://localhost:4400';
export default io(ENDPOINT);