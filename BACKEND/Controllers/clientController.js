import Client from "../models/Client.Model.js";
import nodemailer from 'nodemailer';




const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ndongabouroupavymarwin@gmail.com',
        pass: 'guty zxrx lunt dvls', 
    },
});


// Créer un nouveau client
export const createClient = async (req, res) => {
    const { nom, prenom, phone, email, Statutsocial } = req.body;

    // Vérifiez si le client existe déjà
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
        return res.status(400).json({ error: "Un client avec cet email existe déjà." });
    }

    const newClient = new Client({
        nom,
        prenom,
        phone,
        email,
        Statutsocial,
    });

    try {
        const savedClient = await newClient.save();
        
        // Options de l'email
        const mailOptions = {
            from: 'ndongabouroupavymarwin@gmail.com',
            to: email,
            subject: 'Confirmation de votre inscription',
            text: `Bonjour Mr/Mme ${nom},\n\nMerci de vous être inscrit. Voici un récapitulatif de vos informations :\n\nNom: ${nom}\nPrénom: ${prenom}\nTéléphone: ${phone}\nEmail: ${email}\nStatut social: ${Statutsocial}\n\nCordialement,\nL'équipe.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Erreur lors de l\'envoi de l\'email:', error);
            } else {
                console.log('Email envoyé avec succès:', info.response);
            }
        });

        res.status(201).json(savedClient); // Réponse correcte
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du client :", error);
        res.status(400).json({ message: "Erreur lors de la création du client", error });
    }
};

// Récupérer tous les clients
export const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find(); // Récupère tous les clients
        res.status(200).json(clients); // Renvoie les clients au format JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des clients' });
    }
};

// Récupérer un client par ID
export const getClientById = async (req, res) => {
    const { id } = req.params; // Récupérer l'ID du client à partir des paramètres de la requête

    try {
        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }
        res.status(200).json(client);
    } catch (error) {
        console.error('Erreur lors de la récupération du client:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du client' });
    }
};

// Mettre à jour un client par ID
export const updateClientById = async (req, res) => {
    const { id } = req.params; // Récupérer l'ID du client à partir des paramètres de la requête
    const { name, prenom, phone, email, socialStatus, besoin } = req.body;

    try {
        const updatedClient = await Client.findByIdAndUpdate(id, {
            name,
            prenom,
            phone,
            email,
            socialStatus,
            besoin
        }, { new: true }); // Retourner le document mis à jour

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }

        res.status(200).json(updatedClient);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du client:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du client' });
    }
};

// Supprimer un client par ID
export const deleteClientById = async (req, res) => {
    const { id } = req.params; // Récupérer l'ID du client à partir des paramètres de la requête

    try {
        const deletedClient = await Client.findByIdAndDelete(id);
        if (!deletedClient) {
            return res.status(404).json({ message: 'Client non trouvé' });
        }
        res.status(200).json({ message: 'Client supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du client:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du client' });
    }
};