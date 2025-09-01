import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'node:crypto';
import path from "node:path";
import { readFile } from 'node:fs/promises';
import Handlebars from 'handlebars';
import jwt from "jsonwebtoken";

import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';

import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/auth-constants.js';

import {sendEmail} from "../utils/sendEmail.js";
import { getEnvVar } from '../utils/getEnvVar.js';

import { TEMPLATES_DIR } from '../constants/index.js';

const baseUrl = getEnvVar("BASE_URL");
const jwtSecret = getEnvVar("JWT_SECRET");

const verifyTemplatePath = path.join(TEMPLATES_DIR, "verify-email.html");
const verifyTemplateSource = await readFile(verifyTemplatePath, "utf-8");

const createSession = () => ({
  accessToken: randomBytes(30).toString('base64'),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + accessTokenLifeTime),
  refreshTokenValidUntil: new Date(Date.now() + refreshTokenLifeTime),
});

const sendVerifyEmail = (email)=> {
  const template = Handlebars.compile(verifyTemplateSource);

  const verifyPayload = {
    email,
  };

  const token = jwt.sign(verifyPayload, jwtSecret, {expiresIn: "1h"});

  const html = template({
    verifyLink: `${baseUrl}/auth/verify?token=${token}`
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html,
  };

  return sendEmail(verifyEmail);
}

export const findSession = (query) => SessionCollection.findOne(query);

export const findUser = (query) => UserCollection.findOne(query);

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await UserCollection.findOne({ email });
  if (user) {
    throw createHttpError(409, 'Email already exist');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await UserCollection.create({ ...payload, password: hashPassword });

  await sendVerifyEmail(email);

  return newUser;
};

export const verifyUser = async token => {
  try {
    const {email} = jwt.verify(token, jwtSecret);
    await UserCollection.findOneAndUpdate({email}, {verify: true});
  }
  catch (error) {
    throw createHttpError(401, error.message);
  }
};

export const resendVerifyUser = async email => {
  const user = await findUser({email, verify: false});
  if(!user) {
    throw createHttpError(401, "Invalid email or user aldready verified");
  }
  await sendVerifyEmail(email);
};

export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
  }

  if(!user.verify) {
    throw createHttpError(401, 'Email not verified');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  await SessionCollection.findOneAndDelete({ userId: user._id });

  const session = createSession();

  return SessionCollection.create({
    userId: user._id,
    ...session,
  });
};

export const refreshUserSession = async ({ refreshToken, sessionId }) => {
    console.log(refreshToken);
  const oldSession = await findSession({ refreshToken, _id: sessionId });
  if (!oldSession) {
    throw createHttpError(401, 'Session not found');
  }

  await SessionCollection.findByIdAndDelete(oldSession._id);

  if (oldSession.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  return SessionCollection.create({
    userId: oldSession.userId,
    ...newSession,
  });
};

export const logoutUser = sessionId => SessionCollection.findOneAndDelete({_id: sessionId});