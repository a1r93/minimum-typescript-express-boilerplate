import * as winston from "winston"
import { createLogger } from "./create-logger"

interface ILoggerInstances {
  [key: string]: Logger
}

const loggerInstances: ILoggerInstances = {}

export class Logger {
  private logger: winston.LoggerInstance
  private messages: string[]

  constructor(logName?: string) {
    this.logger = createLogger(logName)
    this.messages = []
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

    const level: winston.LeveledLogMethod = error
      ? this.logger.error
      : this.logger.info

    this.emptyStack()

    level(message)
  }
}

/**
 * @brief use this function in order to get the logger of the entity
 * you need.
 *
 * @param logName The name of the log file
 *
 * @returns the Logger instance
 */
export const getLoggerInstance = (logName: string) => {
  if (!logName) {
    throw new Error("A logger instance requires the name of an entity")
  }

  if (loggerInstances[logName]) {
    return loggerInstances[logName]
  }
  loggerInstances[logName] = new Logger(logName)

  return loggerInstances[logName]
}
