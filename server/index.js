const express = require('express');
const app = express();
const PORT = 3000;

const database = require('./database/connection');

app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ extended: true, limit: "50MB" }));

function findUsers() {
    const users = database.select().where({"id": 1}).table("tbl_users")
        .then((response) => response)
        .catch((error) => {
            console.log(error);
        });

    return users;
}

app.get("/users", async (req, res) => {
    const users = await findUsers();

    console.log(users);

    res.json(users);
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log("🚀 Server running on 🚪", PORT);
    } else {
        console.error("Failed to start the server, ", error);
    }
});
