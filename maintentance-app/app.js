const express = require('express');
const app = express();
const PORT = 3000;
const uri =
  'mongodb+srv://juholuos:Jussipussi123@maintenanceappcluster.5wdxgxd.mongodb.net/maintenance?retryWrites=true&w=majority&appName=MaintenanceAppCluster';
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');
const maintenanceRoutes = require('./routes/maintenances');
const indexRoute = require('./routes/index');
const formatMaintenanceDate = require('./middleware/formatMaintenanceDate');

app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(formatMaintenanceDate);

// ohita favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// reititys
app.use('/', indexRoute);
app.use('/maintenance', maintenanceRoutes);

// Palvele staattisia tiedostoja
app.use(
  express.static('public', {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.js')) {
        res.set('Content-Type', 'text/javascript');
      } else if (path.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
      }
    },
  })
);

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
