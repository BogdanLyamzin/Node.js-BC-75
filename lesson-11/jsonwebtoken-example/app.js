import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    email: "bafehag141@lespedia.com"
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});
// console.log(token)
const decodeToken = jwt.decode(token);
// console.log(decodeToken)

try {
    const {email} = jwt.verify(token, JWT_SECRET);
    console.log(email);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhZmVoYWcxNDFAbGVzcGVkaWEuY29tIiwiaWF0IjoxNzU2NzQxMzMxLCJleHAiOjE3NTY3NDQ5MzF9.8uWLJVeER5o3xwalPFo7rMhhFwN1-Gze4gdpHJ5smVy";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}