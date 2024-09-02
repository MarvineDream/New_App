import Besoin from '../models/besoin.Model.js'; 

// Créer un nouveau besoin
export const createBesoin = async (req, res) => {
    const { type } = req.body;

    const newBesoin = new Besoin({
        type
    });

    try {
        const savedBesoin = await newBesoin.save();
        res.status(201).json(savedBesoin);
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du besoin :", error);
        res.status(400).json({ message: "Erreur lors de la création du besoin", error });
    }
};

// Récupérer tous les besoins
export const getAllBesoins = async (req, res) => {
    try {
        const besoins = await Besoin.find(); // Récupère tous les besoins
        res.status(200).json(besoins); // Renvoie les besoins au format JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des besoins:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des besoins' });
    }
};

// Récupérer un besoin par ID
export const getBesoinById = async (req, res) => {
    const { id } = req.params; // Récupérer l'ID du besoin à partir des paramètres de la requête

    try {
        const besoin = await Besoin.findById(id);
        if (!besoin) {
            return res.status(404).json({ message: 'Besoin non trouvé' });
        }
        res.status(200).json(besoin);
    } catch (error) {
        console.error('Erreur lors de la récupération du besoin:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du besoin' });
    }
};

// Mettre à jour un besoin par ID
export const updateBesoinById = async (req, res) => {
    const { id } = req.params; // Récupérer l'ID du besoin à partir des paramètres de la requête
    const { type } = req.body;

    try {
        const updatedBesoin = await Besoin.findByIdAndUpdate(id, { type }, { new: true }); // Retourner le document mis à jour

        if (!updatedBesoin) {
            return res.status(404).json({ message: 'Besoin non trouvé' });
        }

        res.status(200).json(updatedBesoin);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du besoin:', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du besoin' });
    }
};

// Supprimer un besoin par ID
export const deleteBesoinById = async (req, res) => {
    const { id } = req.params; // Récupérer l'ID du besoin à partir des paramètres de la requête

    try {
        const deletedBesoin = await Besoin.findByIdAndDelete(id);
        if (!deletedBesoin) {
            return res.status(404).json({ message: 'Besoin non trouvé' });
        }
        res.status(200).json({ message: 'Besoin supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du besoin:', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du besoin' });
    }
};