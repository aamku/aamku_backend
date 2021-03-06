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
app.use(require('./routes/orderBySalesPerson.js'));
app.use(require('./routes/getTotalPrice.js'));
app.use(require('./routes/deleteOrder.js'));
app.use(require('./routes/salesOrderHis.js'));
app.use(require('./routes/retailerOrderHis.js'));
app.use(require('./routes/getRetailerDataOrder.js'));
app.use(require('./routes/generateBill.js'));
app.use(require('./routes/getBillingRetInfo.js'));
app.use(require('./routes/allBillingInfo.js'));
app.use(require('./routes/salesNewOrderFrag.js'));
app.use(require('./routes/placeOrder.js'));
app.use(require('./routes/getPendingOrderForRetailer.js'));
app.use(require('./routes/retSectionBillingInfo.js'));
app.use(require('./routes/retSectionBillingDetail.js'));
app.use(require('./routes/retGenerateBill.js'));
app.use(require('./routes/retPlaceOrder.js'));
app.use(require('./routes/getRetNewOrderFragDetails.js'));
app.use(require('./routes/adminSeeNewOrders.js'));
app.use(require('./routes/adminAcceptNewOrders.js'));
app.use(require('./routes/adminSectionBillingDetail.js'));
app.use(require('./routes/adminAcceptAll.js'));
app.use(require('./routes/adminCancelOrder.js'));
app.use(require('./routes/adminOrderSummary.js'));
app.use(require('./routes/getStates.js'));
app.use(require('./routes/getCities.js'));
app.use(require('./routes/getFilterRetailer'));
app.use(require('./routes/getPin'));
app.use(require('./routes/salesDeleteItem'));
app.use(require('./routes/priceAfterDelete'));

// web api

app.use(require('./routes/erpApi/addRetailer.js'));
app.use(require('./routes/erpApi/smsApiTest.js'));


app.listen(port,() => {

    console.log(`Server is running on ${port}.`);
});