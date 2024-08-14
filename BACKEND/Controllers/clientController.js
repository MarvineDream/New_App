// controllers/clientController.js
import Client  from '../models/Client.js';
import RendezVous from '../models/rendez_vous.js';
import  Besoin from '../models/Besoin.js';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ndongabouroupavymarwin@gmail.com',
        pass: 'guty zxrx lunt dvls',
    },
});

const mailOptions = {
    from: 'ndongabouroupavymarwin@gmail.com',
    to: 'leskalpel@example.com',
    subject: 'Test Email',
    text: 'Ceci est un email de test envoyé avec Nodemailer.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Erreur lors de l\'envoi de l\'email:', error);
    }
    console.log('Email envoyé avec succès:', info.response);
});

export const createClient = async (req, res) => {
    const { name, prenom, phone, email, socialStatus, besoin } = req.body;

    const newClient = new Client({
        name,
        prenom,
        phone,
        email,
        socialStatus,
        besoin
    });

    try {
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du client :", error);
        res.status(400).json({ message: "Erreur lors de la création du client", error });
    }
};

export const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find(); // Récupère tous les clients
        res.status(200).json(clients); // Renvoie les clients au format JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des clients' });
    }
};
        
        // Simulons une liste de rendez-vous existants
const rendezVousExistants = [
  { date: new Date('2024-08-10T10:00:00'), client: 'Client A' },
  { date: new Date('2024-08-10T11:00:00'), client: 'Client B' },
  { date: new Date('2024-08-11T09:00:00'), client: 'Client C' },
];

// Fonction pour obtenir la prochaine date et heure disponibles
function getNextAvailableRendezVous() { 
  const today = new Date();
  // Commencer à partir de demain
  today.setDate(today.getDate() + 1);
  
  // Définir les heures d'ouverture (ici : 8h à 17h)
  const heuresOuverture = { debut: 8, fin: 17 };
  const intervalle = 60; // Intervalle en minutes

  for (let i = 0; i < 30; i++) { // Vérifier jusqu'à 30 jours dans le futur
      const dateRendezVous = new Date(today);
      dateRendezVous.setDate(today.getDate() + i);

      // Vérifier les heures dans les horaires d'ouverture
      for (let heure = heuresOuverture.debut; heure < heuresOuverture.fin; heure++) {
          for (let minute = 0; minute < 60; minute += intervalle) {
              const dateHeure = new Date(dateRendezVous);
              dateHeure.setHours(heure, minute, 0, 0);

              // Vérifier si cette date/heure est déjà réservée
              const estReserve = rendezVousExistants.some(rdv => 
                  rdv.date.getTime() === dateHeure.getTime()
              );

              if (!estReserve) {
                  return dateHeure; // Retourner la première date/heure disponible
              }
          }
      }
  }
  return null; // Si aucune disponibilité trouvée
}

// Exemple d'utilisation
const dateRendezVous = getNextAvailableRendezVous();
if (dateRendezVous) {
  console.log('Prochaine date et heure disponibles pour le rendez-vous :', dateRendezVous);
} else {
  console.log('Aucune disponibilité trouvée.');
} 

  
  
  

