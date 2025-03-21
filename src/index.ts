import { sequelize } from "@/services/sequelize";
import { umzug } from "@/services/umzug";
import express from "express";
import { createTestUser } from "./utils/createTestUser";

async function runMigrations() {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        const executed = await umzug.up();
        console.log('Executed migrations:', executed.map(m => m.name));
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

async function startExpressServer() {
    const app = express();
    const port = Number(process.env.API_PORT);

    app.get('/healthz', (_, res) => {
        res.status(200).send('OK');
    });

    app.listen(port, async () => {
        console.log(`Server is running at port ${port}.`);
    });
}

runMigrations().then(createTestUser).then(startExpressServer);
