class Application {
  #express = require('express');
  #app = this.#express();
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createRouter();
    this.createServer(PORT);
    this.errorHandler();
  }

  configApplication() {
    const path = require('path');
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.static(path.join(__dirname, '..', 'public')));
  }

  createServer(PORT) {
    const http = require('http');
    const server = http.createServer(this.#app);
    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`server at running port http://localhost:${PORT}`);
    });
  }

  configDatabase(DB_URL) {
    const mongoose = require('mongoose');
    mongoose.connect(DB_URL, (err) => {
      if (err) throw err;
      console.log('connect successfully database ...');
    });
  }

  errorHandler() {
    this.#app.use((req, res, next) => {
      res.status(404).json({
        status: 404,
        success: false,
        message: 'صفحه که دنبال ان میگشتید گم شده است یا ناپدید شده است . ۴۰۴',
      });
    });

    this.#app.use((error, req, res, next) => {
      const status = error?.status || 500;
      const message = error?.message || 'مشکلی در سرور پیش امده است ۵۰۰';

      res.status(status).json({
        status,
        success: false,
        message,
      });
    });
  }

  createRouter() {
    this.#app.get('/', (req, res, next) => {
      return res.json({
        message: 'this is a new Express application',
      });
    });
  }
}

module.exports = Application;
