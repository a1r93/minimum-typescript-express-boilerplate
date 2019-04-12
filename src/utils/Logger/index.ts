import * as winston from "winston"
import { createLogger } from "./create-logger"

let loggerInstance: Logger

export class Logger {
  logger: winston.LoggerInstance
  messages: string[]

  constructor(logName?: string) {
    this.logger = createLogger(logName)
  }

  public debug(message: string) {
    this.logger.debug(message)
  }

  public info(message: string) {
    this.logger.info(message)
  }

  public notice(message: string) {
    this.logger.notice(message)
  }

  public warning(message: string) {
    this.logger.notice(message)
  }

  public error(message: string) {
    this.logger.error(message)
  }

  public crit(message: string) {
    this.logger.crit(message)
  }

  public alert(message: string) {
    this.logger.alert(message)
  }

  public emerg(message: string) {
    this.logger.alert(message)
  }

  public stack(message: string) {
    this.messages.push(message)
  }

  public emptyStack() {
    this.messages = []
  }

  public showStack(error?: string) {
    const message: string = error
      ? `${error}\n${this.messages.join("\n\t- ")}`
      : `${this.messages.join("\n- ")}`

    const level: Function = error ? this.logger.error : this.logger.info

    level(message)
  }
}

/**
 * @brief use this function in order to use a single logger instance in the
 * entire app, if you want to use a logger by entity you should create a
 * Logger for each entity
 *
 * @param logName The name of the log file
 *
 * @returns the Logger instance
 */
export const getLoggerInstance = (logName?: string) => {
  if (loggerInstance) {
    return loggerInstance
  }
  loggerInstance = new Logger(logName)

  return loggerInstance
}
