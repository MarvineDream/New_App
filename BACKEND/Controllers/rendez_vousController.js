import RendezVous from '../models/rendezvous.model.js'; 
import nodemailer from 'nodemailer';
import Client from '../models/Client.Model.js';

// Récupérer le prochain rendez-vous disponible
const getNextAvailableRendezVous = async () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Commencer à partir de demain

    const heuresOuverture = { debut: 8, fin: 17 };
    const intervalle = 60; // Intervalle en minutes

    // Récupérer les rendez-vous existants
    const rendezVousExistants = await RendezVous.find({});

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
                    new Date(rdv.date).getTime() === dateHeure.getTime()
                );

                if (!estReserve) {
                    return dateHeure; // Retourner la première date/heure disponible
                }
            }
        }
    }
    return null; // Si aucune disponibilité trouvée
};

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ndongabouroupavymarwin@gmail.com', 
        pass: 'guty zxrx lunt dvls' 
    }
});

// Créer un rendez-vous
export const createRendezvous = async (req, res) => {
    try {
        const { id: clientId } = req.params;
        const besoin = req.body.besoin; // Assurez-vous que besoin est une chaîne

        // Vérification que l'ID du client est fourni
        if (!clientId) {
            return res.status(400).json({ error: "ID est requis." });
        }

        // Recherche du client dans la base de données
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({ error: "Client non trouvé." });
        }

        // Vérification que l'email du client est présent
        if (!client.email) {
            return res.status(400).json({ error: "L'email du client est requis." });
        }

        if (!besoin) {
            return res.status(400).json({ error: "Le champ 'besoin' est requis." });
        }

        // Appel à la fonction pour obtenir la prochaine disponibilité
        const dateHeureDisponible = await getNextAvailableRendezVous();
        if (!dateHeureDisponible) {
            return res.status(404).json({ error: "Aucune disponibilité trouvée." });
        }

        // Création d'un nouvel objet RendezVous
        const rendezvous = new RendezVous({
            client: clientId,
            date: dateHeureDisponible, // Utiliser la date/heure trouvée
            heure: dateHeureDisponible.toISOString().substr(11, 5), // Extraire l'heure au format HH:MM
            email: client.email,
            besoin
        });

        // Sauvegarde du rendez-vous dans la base de données
        await rendezvous.save();

        // Préparation de l'email à envoyer au client
        const mailOptions = {
            from: 'ndongabouroupavymarwin@gmail.com', // Votre adresse email
            to: client.email, // Email du client
            subject: 'Confirmation de votre rendez-vous',
            text: `Bonjour Mr/Mme ${client.nom},\n\nVotre rendez-vous a été confirmé pour le ${dateHeureDisponible.toLocaleDateString()} à ${dateHeureDisponible.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} pour ${besoin}.\n\nMerci pour votre confiance!`
        };

        // Envoi de l'email au client
        await transporter.sendMail(mailOptions);

        // Réponse avec le rendez-vous créé
        res.status(201).json(rendezvous);
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du rendez-vous:", error);
        res.status(500).json({ error: "Erreur lors de l'enregistrement du rendez-vous." });
    }
};

// Supprimer un rendez-vous par ID
export const deleteRendezvous = async (req, res) => {
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
};

// Route pour récupérer tous les rendez-vous
export const getRendezvous = async (req, res) => {
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
};

// Récupérer un rendez-vous par ID
export const getRendezvousById = async (req, res) => {
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
};

// Mettre à jour un rendez-vous par ID
export const updateRendezvous = async (req, res) => {
    const { id } = req.params;
    const { client, dateRendezVous, besoin } = req.body;

    // Vérifier si au moins une donnée est fournie pour la mise à jour
    if (!client && !dateRendezVous && !besoin) {
        return res.status(400).json({ message: 'Aucune donnée à mettre à jour' });
    }

    try {
        const updatedAppointment = await RendezVous.findByIdAndUpdate(
            id,
            { client, dateRendezVous, besoin },
            { new: true, runValidators: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }

        res.status(200).json({ message: 'Rendez-vous mis à jour avec succès', updatedAppointment });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du rendez-vous:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du rendez-vous' });
    }
};