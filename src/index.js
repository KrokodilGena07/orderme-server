const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..', `.${process.env.NODE_ENV}.env`)});
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const compressionMiddleware = require('./middlewares/compression.middleware');
const fileUpload = require('express-fileupload');
const router = require('./router');
const errorMiddleware = require('./middlewares/error.middleware');
const db = require('./config/db');
require('./models/index');

const app = express();
const PORT = process.env.PORT;

console.log(path.resolve(__dirname, '..', `.${process.env.NODE_ENV}.env`));

app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(compression({filter: compressionMiddleware}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorMiddleware);

async function start() {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
        await db.authenticate();
        await db.sync();
    } catch (e) {
        console.log(e);
    }
}

start().then();