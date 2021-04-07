const express = require('express');

const app = express();
const PORT = 3000;

const router = require("./routes/routes");

app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ extended: true, limit: "50MB" }));

app.use("/", router);

app.listen(PORT, (error) => {
    if (!error) {
        console.log("🚀 Server running on 🚪", PORT);
    } else {
        console.error("Failed to start the server, ", error);
    }
});
