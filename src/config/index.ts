import { isEmpty } from "lodash";
import logger from "pino";
import dotenv from "dotenv";

dotenv.config();

const config = {
  logger: logger(),
  JWT_KEY: process.env.JWT_KEY,
  APP_NAME: process.env.APP_NAME,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
};

const absentConfig = Object.entries(config)
  .map(([key, value]) => [key, !!value])
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (!isEmpty(absentConfig)) {
  throw new Error(`Missing Config: ${absentConfig.join(", ")}`);
}

export default config;
