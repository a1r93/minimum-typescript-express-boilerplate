import * as dotenv from "dotenv"

/**
 * @brief Loads the .env file into process.env, and returns the loaded
 * key/values.
 *
 * @return The loaded values.
 *
 * @throws {SquidApiException} The loading failed.
 */
export const loadEnvironment = () => {
  const { parsed, error } = dotenv.config()
  if (error) {
    throw new Error("Error while trying to load environment file")
  }
  return parsed
}
