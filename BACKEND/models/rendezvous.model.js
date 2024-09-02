import mongoose from 'mongoose';

// le schéma pour un rendez-vous
const rendezvousSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID du client
        ref: 'Client', 
        required: true 
    },
    date: {
        type: Date, 
        required: true 
    },
    heure: {
        type: String, 
        required: true 
    },
    besoin: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    }
},
 {
    timestamps: true // Ajoute createdAt et updatedAt
});


const RendezVous = mongoose.model('RendezVous', rendezvousSchema);


export default RendezVous;