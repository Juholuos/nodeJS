const express = require('express');
const app = express();
const PORT = 3000;
const uri =
  'mongodb+srv://juholuos:Jussipussi123@maintenanceappcluster.5wdxgxd.mongodb.net/maintenance?retryWrites=true&w=majority&appName=MaintenanceAppCluster';
const connectDB = require('./db/connect');

const {
  getAllMaintenances,
  createMaintenance,
  getMaintenance,
  deleteMaintenance,
  updateMaintenance,
} = require('./controllers/maintenances');

app.use(express.json());

app.get('/', getAllMaintenances);
app.get('/:id', getMaintenance);
app.delete('/:id', deleteMaintenance);
app.post('/', createMaintenance);
app.patch('/:id', updateMaintenance);

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
