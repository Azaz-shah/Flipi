require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Routes
app.use("/api/users", require("./Routes/user.route"));
app.use("/api/listings", require("./Routes/user.listing"));

app.listen(PORT, () => {
    console.log(`Server is  listening at http://localhost:${PORT}`);
});