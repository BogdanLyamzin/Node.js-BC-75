import bcrypt from "bcrypt";

const hashPassword = async password => {
    const hashPassword = await bcrypt.hash(password, 10);
    const compareResult1 = await bcrypt.compare(password, hashPassword);
    console.log(compareResult1);
    const compareResult2 = await bcrypt.compare("123457", hashPassword);
    console.log(compareResult2);
}

hashPassword("123456");