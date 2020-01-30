const express = require('express');

const app  = express() 

const port = process.env.PORT || 3000;

app.use(require('./routes/addUser.js'));
app.use(require('./routes/allUsers.js'));
app.use(require('./routes/sendOtp.js'));
app.use(require('./routes/checkOtp.js'));
app.use(require('./routes/saveRetailer.js'));
app.use(require('./routes/getPendingRetailers.js'));
app.use(require('./routes/approveRetailer.js'));
app.use(require('./routes/getSalesRetailer.js'));
app.use(require('./routes/adminItemsAdd.js'));
app.use(require('./routes/adminSeeRetailers.js'));
app.use(require('./routes/cancelRetailer.js'));
app.use(require('./routes/addItemByAdmin.js'));
app.use(require('./routes/showItems.js'));
app.use(require('./routes/retailerLoginOtp.js'));
app.use(require('./routes/sendExcelToSales.js'));
app.use(require('./routes/retManageShow.js'));
app.use(require('./routes/allDealers.js'));
app.use(require('./routes/dealerCount.js'));
app.use(require('./routes/retailerIdSpinner.js'));
app.use(require('./routes/getGenOrderRetInfo.js'));
app.use(require('./routes/getProductNameInSpinner.js'));
app.use(require('./routes/getProducts.js'));

app.listen(port,() => {

    console.log(`Server is running on ${port}.`);
});