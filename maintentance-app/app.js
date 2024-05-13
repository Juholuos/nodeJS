const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();
const uri =
  'mongodb+srv://juholuos:Jussipussi123@maintenanceappcluster.5wdxgxd.mongodb.net/maintenance?retryWrites=true&w=majority&appName=MaintenanceAppCluster';
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const flashMessage = require('./middleware/flashMessages');
const maintenanceRoutes = require('./routes/maintenances');
const homeRoute = require('./routes/index');
const userRoute = require('./routes/user');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const authMiddleware = require('./middleware/jwtAuth');
const formatMaintenanceDate = require('./middleware/formatMaintenanceDate');
const staticConfig = require('./middleware/config/static');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

// middleware
app.use(
  session({
    secret: 'secret', // Use a strong secret key for sessions
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(formatMaintenanceDate);

//ota flash käyttöön
app.use(flash());
app.use(flashMessage);

// ohita favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(staticConfig);

// reititys
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/maintenance', authMiddleware, maintenanceRoutes);
app.use('/user', userRoute);
app.use('/', authMiddleware, homeRoute);

const start = async () => {
  try {
    await connectDB(uri);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
