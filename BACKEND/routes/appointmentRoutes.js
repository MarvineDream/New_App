import express from 'express';
import mongoose from 'mongoose';
import RendezVous from '../BACKEND/models/rendezVousModel.js'; 
import * as rendez_vousController from '../Controllers/rendez_vousController.js'


const router = express.Router();

// Route pour enregistrer un rendez-vous
router.post('/', async (req, res) => {
  const { client, dateRendezVous, besoin } = req.body;

  if (!client || !dateRendezVous || !besoin) {
    return res.status(400).json({ message: 'Données de rendez-vous manquantes' });
  }

  // Vérifier si les identifiants sont valides
  if (!mongoose.Types.ObjectId.isValid(client) || !mongoose.Types.ObjectId.isValid(besoin)) {
    return res.status(400).json({ message: 'Identifiant client ou besoin invalide' });
  }

  try {
    const nouveauRendezVous = new RendezVous({
      client,
      dateRendezVous,
      besoin,
    });

    await nouveauRendezVous.save();
    res.status(201).json({ message: 'Rendez-vous enregistré avec succès', nouveauRendezVous });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du rendez-vous:', error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement du rendez-vous' });
  }
});

// Créer un rendez-vous
export const createAppointment = async (req, res) => {
    const { client, dateRendezVous, besoin } = req.body;

    if (!client || !dateRendezVous || !besoin) {
        return res.status(400).json({ message: 'Données de rendez-vous manquantes' });
    }

    try {
        const nouveauRendezVous = new RendezVous({ client, dateRendezVous, besoin });
        await nouveauRendezVous.save();
        res.status(201).json({ message: 'Rendez-vous enregistré avec succès', nouveauRendezVous });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du rendez-vous:', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrements du rendez-vous' });
    }
};

// Route pour récupérer tous les rendez-vous
app.get('/appointments', async (req, res) => {
    try {
      const appointments = await RendezVous.find();
      if (appointments.length === 0) {
        return res.status(404).json({ message: 'Aucun rendez-vous trouvé' });
      }
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
    }
  });
  
  // Route pour récupérer un rendez-vous par ID
  app.get('/appointments/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const appointment = await RendezVous.findById(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Rendez-vous non trouvé' });
      }
      res.status(200).json(appointment);
    } catch (error) {
      console.error('Erreur lors de la récupération du rendez-vous:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération du rendez-vous' });
    }
  });
  
  // Route pour supprimer un rendez-vous par ID
  app.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const appointment = await RendezVous.findByIdAndDelete(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Rendez-vous non trouvé' });
      }
      res.status(200).json({ message: 'Rendez-vous supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du rendez-vous:', error);
      res.status(500).json({ message: 'Erreur lors de la suppression du rendez-vous' });
    }
  });
  
  //Exemple de création d'un rendez-vous (à retirer ou déplacer si nécessaire)
  const exempleRendezVous = new RendezVous({
    "client": "60d5ec49e1a0c8b1f4d8b1b1",  // Exemple d'ObjectId valide
    "dateRendezVous": "2024-08-11T10:00:00Z",
    "besoin": "60d5ec49e1a0c8b1f4d8b1b2" // Exemple d'ObjectId valide
  }); 
  
  exempleRendezVous.save()
    .then(result => {
      console.log('Rendez-vous créé avec succès:', result);
    })
    .catch(err => {
      console.error('Erreur lors de la création du rendez-vous:', err);
    }); 
  
    