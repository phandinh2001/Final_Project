import express from "express";
import dateFormat from "dateformat";
import queryString from "qs";
import crypto from 'crypto'

const CLIENT_ID = 'AZRaICvwB92NhPFMLvqK4c82zUVkchM8MCMwFtSRWxcx3JwXgH3Mx8nOF1nJUBY2NzcOjW6Zsz5-aSI6'
const paymentRouter = express.Router();


paymentRouter.get('/config', (req, res) => {
    return res.status(200).json({
        status: 'OK',
        data: CLIENT_ID
    })
})

paymentRouter.post('/create_payment_url', function (req, res, next) {
    var ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;


    var tmnCode = 'XS15MRKO';
    var secretKey = 'UHDZXPIKWGOAQSSQNRASDWFPRJVZIGSD';
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    var returnUrl = "http://localhost:3001/purchase";

    var date = new Date();

    var createDate = dateFormat(date, 'yyyymmddHHmmss');
    var orderId = '123456';
    var amount = req.body.amount;
    var bankCode = 'NCB';

    var orderInfo = 'thanhtoanhoadon';
    var orderType = 'billPayment';
    var locale = 'vn';
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};

    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    // vnp_Params = sortObject(vnp_Params);

    var signData = queryString.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("SHA256", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + queryString.stringify(vnp_Params, { encode: false });

    res.json(vnpUrl)
});

export default paymentRouter;
