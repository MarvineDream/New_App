import rendez_vous from '../models/rendez_vous.js'


// Créer un rendez-vous
export const createAppointment = async (req, res) => {
    const { client, dateRendezVous, besoin } = req.body;

    if (!client || !dateRendezVous || !besoin) {
        return res.status(400).json({ message: 'Données de rendez-vous manquantes' });
    }

    try {
        const newAppointment = new Appointment({ client, dateRendezVous, besoin });
        await newAppointment.save();
        res.status(201).json({ message: 'Rendez-vous enregistré avec succès', newAppointment });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du rendez-vous:', error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement du rendez-vous' });
    }
};

// Récupérer tous les rendez-vous
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
    }
};

// Récupérer un rendez-vous par ID
export const getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        console.error('Erreur lors de la récupération du rendez-vous:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du rendez-vous' });
    }
};

// Supprimer un rendez-vous par ID
export const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
        res.status(200).json({ message: 'Rendez-vous supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du rendez-vous:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du rendez-vous' });
    }
};

export default {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    deleteAppointment,
  }; 