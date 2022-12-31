const customerModel = require('../models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ShadowCoster'
const nodemailer = require("nodemailer");

const register = async (req, res) => {
    try {
        const customerObj = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
        }
        const existingUser = await customerModel.findOne({ $or: [{ email: customerObj.email }, { phone: customerObj.phone }] });
        if (!existingUser) {
            const hashPassword = await bcrypt.hash(customerObj.password, 10);
            customerObj.password = hashPassword;
            const token = jwt.sign(customerObj, SECRET_KEY)
            customerObj.token = token;
            const result = await customerModel.create(customerObj)
            return res.status(200).json({ status: '200', data: result, token: token, message: 'Customer Created succesfully' })
        } else {
            return res.status(200).json({ status: '200', message: ' Email or phone already Exists' })
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

const login = async (req, res) => {
    try {
        const customerObj = {
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
        }
        const existingUser = await customerModel.findOne({ $or: [{ email: customerObj.email }, { phone: customerObj.phone }] });
        if (existingUser) {
            const matchPassword = await bcrypt.compare(customerObj.password, existingUser.password)
            if (matchPassword) {
                return res.status(200).json({ status: '200', data: existingUser, message: 'Customer Login succesfully' })
            } else {
                return res.status(200).json({ status: '400', message: 'Invalid Credentials' })
            }
        } else {
            return res.status(200).json({ status: '400', message: 'user not found' })
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({ status: '500', message: 'Something went wrong' })
    }
}

const forgotPassword = async (req, res) => {
     const email =  req.body.email
    try {

        const existingUser = await customerModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(200).json({ status: '404', message: 'User not found' });
        } else {

            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: email, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            });

            // console.log("Message sent: %s", info.messageId);
            if(info){
                return res.status(200).json({ status: '200', data : info ,  message: 'Password reset link sent' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ status: '500', message: "Something went wrong" })
    }
}
module.exports = { register, login, forgotPassword }