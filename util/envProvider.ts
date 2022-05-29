import * as dotenv from "dotenv";

dotenv.config();

class EnvVariableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnvVariableError";
  }
}

export function provideStringEnvVar(
    key: keyof NodeJS.ProcessEnv
): string {
    const value = process.env[key];

    if (value === undefined) {
        throw new EnvVariableError(`Environment variable ${key} is not set`);
    }
    return value
}
