import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/index";
import config from "./config";
import morgan from "morgan"

import { CustomRequest } from "./utils/interface";
import { errorHandler } from "./utils/errorHandler";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

declare global {
  namespace Express {
    interface Request extends CustomRequest { }
  }
}

app.use(morgan('combined')); // request logger
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Lendsqr");
});

app.use(errorHandler);
(async () => {
  process.on("warning", (e) => config.logger.warn(e.stack));
  app.listen(process.env.PORT || 3000, async () => {
    console.log(
      `server started on port ${port || 3000}`
    );
  });
})();

process.on("unhandledRejection", (error: any) => {
  console.log("FATAL UNEXPECTED UNHANDLED REJECTION!", error.message);
  console.error("\n\n", error, "\n\n");
});


