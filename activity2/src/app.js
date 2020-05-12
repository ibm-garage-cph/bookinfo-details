const express = require("express");
const app = express();

//Add Prometheus client library 
const promBundle = require("express-prom-bundle");
//Add logging library
const { createLogger, format, transports } = require('winston')

const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    promClient: {
        collectDefaultMetrics: {
        }
    }
});

const logger = createLogger({
    level: 'debug',
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD'T'HH:mm:ss.SSSZ"
      }),
      format.json()
    ),
    transports: [new transports.Console()]
  });

app.use(metricsMiddleware);

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" })
    logger.info("Hello World!", {"errCode": "DET00001I"})
})

module.exports = { app };
