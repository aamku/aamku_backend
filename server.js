const express = require('express');

const app  = express() 

const port = process.env.PORT || 3000;

app.use(require('./routes/addUser.js'));
app.use(require('./routes/allUsers.js'));
app.use(require('./routes/sendOtp.js'));

app.listen(port,() => {

    console.log(`Server is running on ${port}.`);
});