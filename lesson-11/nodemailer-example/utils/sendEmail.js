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

/*
const payload = {
    to: "bafehag141@lespedia.com",
    subject: "Test email",
    html: "<strong>Test</strong>"
}
*/

export const sendEmail = payload => {
    const email = {...payload, from: UKR_NET_EMAIL};
    return transport.sendMail(email);
}
