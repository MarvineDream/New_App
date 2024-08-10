// models/Client.js
import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  numeroTelephone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  besoin: { type: String, required: true, enum: ['établissement de la carte d\'assurance', 'Renouvellement de la carte d\'assurance', 'réclamation sur les cartes d\'assurance'] },
  dateRendezVous: { type: Date, required: true },
});

const Client = mongoose.model('Client', clientSchema);

export default Client;