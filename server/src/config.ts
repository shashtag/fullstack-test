import dotenv from "dotenv";
import path from "path";
import winston from "winston";
import fs from "fs";
import { homedir } from "os";

export class Configuration {
  private static instace: Configuration;
  public NODE_ENV!: string;
  public HOST!: string;
  public PORT!: string;
  public baseUrl!: string;
  public logger!: winston.Logger;
  private LOG_LEVEL!: string;
  public dataDIR!: string;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Method to get the singleton instance of the Configuration class
  public static getInstance(): Configuration {
    if (!Configuration.instace) {
      Configuration.instace = new Configuration();
      Configuration.instace.setupEnvVar();
      Configuration.instace.setup();
      Configuration.instace.setupLogger();
    }
    return Configuration.instace;
  }

  // Method to set up configuration properties
  private setup() {
    this.HOST = process.env.HOST ? process.env.HOST : "localhost";
    this.PORT = process.env.PORT ? process.env.PORT : "8000";
    this.LOG_LEVEL = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : "info";
    this.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
    this.baseUrl = "http://" + this.HOST + ":" + this.PORT;

    // Set up the data directory
    this.dataDIR = process.env.DATA_DIR
      ? process.env.DATA_DIR
      : path.join(homedir(), "data");
    if (!fs.existsSync(this.dataDIR)) fs.mkdirSync(this.dataDIR);
  }

  // Method to set up environment variables
  private setupEnvVar() {
    const envPath = path.resolve(
      __dirname,
      "../",
      process.env.NODE_ENV + ".env",
    );

    // Load environment variables from the appropriate .env file
    if (fs.existsSync(envPath)) {
      dotenv.config({
        path: envPath,
      });
    } else {
      dotenv.config();
    }
  }

  // Method to set up the logger
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

    // Add console logging in non-production environments
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
