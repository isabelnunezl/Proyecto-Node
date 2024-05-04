const crypto = require("crypto");

const secret = crypto.randomBytes(32).toString("hex");

console.log(secret); //a47bfaee4bfdc8c8f126be5f2d52df5f21550d5d057df49de29d8f62732fcd50
