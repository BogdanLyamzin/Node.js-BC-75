import nodemailer from "nodemailer";
import "dotenv/config";

import {getEnvVar} from "./getEnvVar.js";

const user = getEnvVar("UKR_NET_EMAIL");
const pass = getEnvVar("UKR_NET_PASSWORD");

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, // 25, 887, 2525
    secure: true,
    auth: {
        user,
        pass
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = payload => {
    const email = {...payload, from: user};
    return transport.sendMail(email);
};
