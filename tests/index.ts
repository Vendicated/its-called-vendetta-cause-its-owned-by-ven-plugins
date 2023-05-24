import { readdirSync } from "fs";

for (const test of readdirSync(__dirname)) {
    if (test !== "index.ts") {
        require(`./${test}`);
    }
}
