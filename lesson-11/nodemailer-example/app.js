import nodemailer from "nodemailer";
import "dotenv/config";

const {UKR_NET_PASSWORD, UKR_NET_EMAIL} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, // 25, 887, 2525
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
    from: UKR_NET_EMAIL,
    to: "bafehag141@lespedia.com",
    subject: "Test email",
    html: "<strong>Test</strong>"
}

transport.sendMail(email)
    .then(msg => console.log(msg))
    .catch(error => console.log(error))