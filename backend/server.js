'use strict';

const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

const db = require('./config/db');
const app = require('./app');

(async () => {
  try {
    await db.authenticate();
    // await db.sync({ force: true });
    console.log('Connected to postgresql');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
