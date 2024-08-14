// server.js
import express from 'express';
import mongoose from 'mongoose';
import clientRoutes from './BACKEND/routes/clientRoutes.js';
import cors from 'cors';
import RendezVous from './BACKEND/models/rendez_vous.js';
import * as clientController from './BACKEND/Controllers/clientController.js'
import bodyParser from 'body-parser';
import appointmentController from './BACKEND/Controllers/rendez_vousController.js'



const app = express();
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/MoukelaDB',)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur de connexion à MongoDB', err));

app.use('/client', clientRoutes);

// Route pour enregistrer un rendez-vous
app.post('/appointment', async (req, res) => {
  const appointmentData = req.body; // Récupérer les données du corps
  if (!appointmentData) {
    return res.status(400).json({ message: 'Données de rendez-vous manquantes' });
  }

  try {
    // Créer une nouvelle instance du modèle RendezVous
    const appointment = new RendezVous(appointmentData);
    
    // Sauvegarder le rendez-vous dans la base de données
    await appointment.save();

    // Répondre avec les données créées
    res.status(201).json({ message: 'Rendez-vous enregistré avec succès', appointment });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du rendez-vous:', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement du rendez-vous' });
  }
});
  
  // Route pour enregistrer un rendez-vous
  app.post('/appointment', appointmentController.createAppointment);
  
  // Route pour récupérer tous les rendez-vous
  app.get('/appointments', appointmentController.getAllAppointments);
  
  // Route pour récupérer un rendez-vous par ID
  app.get('/appointments/:id', appointmentController.getAppointmentById);
  
  // Route pour supprimer un rendez-vous par ID
  app.delete('/appointments/:id', appointmentController.deleteAppointment); 


  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});












