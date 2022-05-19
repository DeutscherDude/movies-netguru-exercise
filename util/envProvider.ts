import * as dotenv from "dotenv";

dotenv.config();

export function provideStringEnvVar(
    key: keyof NodeJS.ProcessEnv
): string {
    const value = process.env[key];

    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value
}

export function provideNumericStringEnvVar(
    key: keyof NodeJS.ProcessEnv
): number {
    const value = process.env[key];

    if (Number.isNaN(value)) {
        throw new Error(`Environment variable ${key} is not a number`);
    }
    return Number(value);
}