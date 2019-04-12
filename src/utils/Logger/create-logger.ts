import { join } from "path"
import * as winston from "winston"

const tsFormat = () => new Date().toLocaleTimeString()

/**
 * @brief Creates a new Logger with the given name, and returns it.
 *
 * @description
 *
 * As the logName is used in the log filename, it must not
 * contains characters that could interfers with the path ("/", "\", ":", ...")
 *
 * @param {string} logName The log name
 *
 * @returns {winston.LoggerInstance} The logger.
 */
export const createLogger = (logName?: string) => {
  const logPath = process.env.LOGS_PATH || ""
  const fileTransport = logName
    ? new (require("winston-daily-rotate-file"))({
        datePattern: "YYYY-MM-DD",
        filename: join(logPath, `%DATE%-${logName}.log`),
        prepend: true,
        timestamp: tsFormat
      })
    : undefined
  const transports = fileTransport
    ? [new winston.transports.Console(), fileTransport]
    : [new winston.transports.Console()]
  return new winston.Logger({ transports })
}
