// server.js
import express from 'express';
import mongoose from 'mongoose';
import clientRoutes from './BACKEND/routes/clientRoutes.js';
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/MoukelaDB', )
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

app.use('/client', clientRoutes);


app.post('/', (req, res) => {
  const appointment = req.body; // Récupérer les données du corps
  // Logique pour enregistrer le rendez-vous (par exemple, dans une base de données)
  res.status(201).json(appointment); // Répondre avec les données créées
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});