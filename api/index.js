const serverless = require("serverless-http");
let server;

module.exports = async (req, res) => {
  if (!server) {
    // Build must have been run at vercel-build step so backend/dist exists
    const { NestFactory } = require("@nestjs/core");
    const { ExpressAdapter } = require("@nestjs/platform-express");
    const express = require("express");

    // Import compiled Nest AppModule and data source
    const { AppModule } = require("./backend/dist/src/app.module");
    const { AppDataSource } = require("./backend/dist/src/data-source");

    const appExpress = express();
    const adapter = new ExpressAdapter(appExpress);
    const nestApp = await NestFactory.create(AppModule, adapter);

    nestApp.enableCors();

    // Initialize DB if not initialized yet (safe for serverless)
    try {
      if (
        AppDataSource &&
        AppDataSource.initialize &&
        !AppDataSource.isInitialized
      ) {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized (serverless).");
      }
    } catch (err) {
      console.error("Error during Data Source initialization", err);
    }

    await nestApp.init();
    server = serverless(appExpress);
  }

  return server(req, res);
};
