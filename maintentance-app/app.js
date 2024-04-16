const express = require('express');
const app = express();
const PORT = 3000;
const uri =
  'mongodb+srv://juholuos:Jussipussi123@maintenanceappcluster.5wdxgxd.mongodb.net/maintenance?retryWrites=true&w=majority&appName=MaintenanceAppCluster';
const connectDB = require('./db/connect');
const bodyParser = require('body-parser');
const maintenanceRoutes = require('./routes/maintenances');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));

// ohita favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/maintenance', maintenanceRoutes);

app.use(express.json());

app.use(express.static('public'));

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
