const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'detailedLogs.txt');

const detailedLogger = (req, res, next) => {
  const start = Date.now();

  // Intercepter la méthode de réponse pour calculer le temps de réponse
  const originalSend = res.json;
  res.send = function(...args) {
    const duration = Date.now() - start;
    const logEntry = `
      Time: ${new Date().toISOString()}
      Method: ${req.method}
      URL: ${req.url}
      Headers: ${JSON.stringify(req.headers)}
      User-Agent: ${req.headers['user-agent']}
      Response Time: ${duration}ms
      -----------------------
    `;
    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
    originalSend.apply(res, args);
  };

  next();
};

module.exports = detailedLogger;