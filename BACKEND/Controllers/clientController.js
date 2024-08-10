// controllers/clientController.js
import Client  from '../models/Client.js';
import RendezVous from '../models/rendez_vous.js';
import  Besoin from '../models/Besoin.js';
import nodemailer from 'nodemailer';


let clients = []; // stockage temporaire des clients

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: '',
    },
});

export const createClient = async (req, res) => {
    try {
        const { nom, prenom, numeroTelephone, email, besoin } = req.body;

        
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


        

        const client = new Client({ nom, prenom, numeroTelephone, email, besoin });
        await client.save();

        const rendezVous = new RendezVous({
            client: client._id,
            dateRendezVous: dateRendezVous,
            besoin: besoin,
        });
        await rendezVous.save();

        // Envoi de l'email de confirmation
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Confirmation de votre rendez-vous',
            text: `Bonjour ${prenom},\n\nVotre rendez-vous pour ${besoin} est confirmé pour le ${dateRendezVous}.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Rendez-vous créé avec succès!', client });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du rendez-vous', error });
    }
};

export default createClient;


