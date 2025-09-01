import formData from "form-data";
import Mailgun from "mailgun.js";
import "dotenv/config";

const { MAILGAN_DOMAIN, MAILGUN_API_KEY } = process.env;

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: MAILGUN_API_KEY,
});

/*
const payload = {
  to: ["bafehag141@lespedia.com"],
  subject: "Hello",
  text: "Testing some Mailgun awesomness!",
  html: "<h1>Testing some Mailgun awesomness!</h1>",
};
*/
export const sendEmail = payload => {
    const email = {...payload, from: `Excited User <mailgun@${MAILGAN_DOMAIN}>`};
    return mg.messages.create(MAILGAN_DOMAIN, email);
}

