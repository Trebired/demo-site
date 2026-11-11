import { createLog } from "@trebired/logger";

export const logger = createLog({
    console: { metadata: false, timestamp: false },
    save: false,
    source: "demo-site",
});
