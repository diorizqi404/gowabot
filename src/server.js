require("dotenv").config();
const express = require("express");
const webhookRoutes = require("./routes/webhook");
const logger = require("./logger");
const app = express();
app.use(express.raw({ type: "application/json" }));

app.use("/webhook", webhookRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server listening on localhost port ${PORT}`);
});