import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "node",
    collectCoverageFrom: [
        "**/**/*.{ts,tsx}",
        "!**/node_modules/**",
        "!**/dist/**",
        "!**/coverage/**",
        "!**/jest.config.ts",
        "!**/index.ts"
    ],
    
    setupFiles: [
        'dotenv/config'
    ]
};

export default config;
