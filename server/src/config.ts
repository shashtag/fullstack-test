import dotenv from "dotenv";
import path from "path";
import winston from "winston";
import fs from "fs";
import { homedir } from "os";

class Configuration {
  private static instace: Configuration;
  public NODE_ENV!: string;
  public HOST!: string;
  public PORT!: string;
  public baseUrl!: string;
  public logger!: winston.Logger;
  private LOG_LEVEL!: string;
  public dataDIR!: string;

  private constructor() {}

  public static getInstance(): Configuration {
    if (!Configuration.instace) {
      Configuration.instace = new Configuration();
      Configuration.instace.setupEnvVar();
      Configuration.instace.setup();
      Configuration.instace.setupLogger();
    }
    return Configuration.instace;
  }

  private setup() {
    console.log(process.env.PORT);
    this.HOST = process.env.HOST ? process.env.HOST : "localhost";
    this.PORT = process.env.PORT ? process.env.PORT : "8000";
    this.LOG_LEVEL = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info";
    this.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
    this.baseUrl = "http://" + this.HOST + ":" + this.PORT;

    this.dataDIR = process.env.DATA_DIR
      ? process.env.DATA_DIR
      : path.join(homedir(), "boilerplate");
    if (!fs.existsSync(this.dataDIR)) fs.mkdirSync(this.dataDIR);
  }

  private setupEnvVar() {
    const envPath = path.resolve(
      __dirname,
      "../",
      process.env.NODE_ENV + ".env",
    );

    if (fs.existsSync(envPath)) {
      dotenv.config({
        path: envPath,
      });
    } else {
      dotenv.config();
    }
  }

  private setupLogger() {
    const logDIR = path.join(this.dataDIR, "./log");
    if (!fs.existsSync(logDIR)) fs.mkdirSync(logDIR);

    const { combine, timestamp, printf } = winston.format;
    const customLogFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}] ${message}`;
    });
    const logFilePath = path.join(logDIR, "logger.log");
    this.logger = winston.createLogger({
      level: this.LOG_LEVEL || "info",
      format: combine(timestamp(), customLogFormat),
      transports: [
        new winston.transports.File({
          filename: path.join(logDIR, "error.log"),
          level: "error",
        }),
        new winston.transports.File({ filename: logFilePath }),
      ],
    });
    if (this.NODE_ENV !== "production") {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }
  }
}

const { NODE_ENV, HOST, PORT, baseUrl, logger } = Configuration.getInstance();
export { NODE_ENV, HOST, PORT, baseUrl, logger };