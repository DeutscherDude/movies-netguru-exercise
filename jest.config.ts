import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "node",
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
    ],
    
    setupFiles: [
        'dotenv/config'
    ]
};

export default config;
