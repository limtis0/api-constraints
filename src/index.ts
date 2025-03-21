import { sequelize } from "@/services/sequelize";
import { umzug } from "@/services/umzug";

async function runMigrations() {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        await umzug.up();
        console.log("Migrations executed.");

        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

async function main() {
    await runMigrations();
}

main();
