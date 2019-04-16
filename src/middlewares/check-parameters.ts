import { NextFunction, Request, Response } from "express"

import { HttpStatus } from "../utils"

export interface ICheckParameter {
  name: string
  required?: boolean
  email?: boolean
}

/**
 * @brief checks if a given email address is valid or not
 *
 * @param email the email address to check
 */
const checkForValidEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

/**
 * @brief middleware used in order to check a set of required
 * parameters.
 *
 * If one of the given parameters is missing, a bad request
 * status code is sent to the client.
 *
 * If all the required parameters are found, the next route is
 * called
 *
 * @param params The list of the required keys to be found in
 * the request
 */
const checkParameters = (params: ICheckParameter[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const missing = []
  for (const { email, name, required } of params) {
    const value = req.params[name] || req.query[name] || req.body[name]

    // Check if the value is required and is passed as parameter
    if (!value && required) {
      missing.push(name)
      continue
    }

    // check if the value is a valid email address if needed
    if (email && !checkForValidEmail(value)) {
      res
        .status(HttpStatus.BadRequest)
        .json({ error: `The following email is invalid: ${value}` })
        .send()

      return
    }
  }

  if (missing.length !== 0) {
    const missingParams = missing.join(", ")
    const plural = missing.length === 1 ? "" : "s"
    res
      .status(HttpStatus.BadRequest)
      .json({
        error: `Missing the following parameter${plural}: ${missingParams}`
      })
      .send()

    return
  }

  next()
}

export default checkParameters
