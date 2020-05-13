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

var logLevel = process.env.LOG_LEVEL || 'info';

const logger = createLogger({
    level: logLevel,
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
  //simulate random request delay 0-100ms
  var delay = Math.round(Math.random() * 100);
  if(errorSource()) {
    setTimeout(() => {
      res.send({ message: "Hello World!" })
      logger.debug("Hello World!", {"errCode": "DET00001D", transactionTime: delay + 'ms'})
    }, delay)
  } else {
    res.sendStatus(500)
    logger.error("Informative error message", {"errCode": "DET00001E"})
  }
})

function errorSource() {
  // 10% error rate
  return Math.random() >= 0.1
}

module.exports = { app };
