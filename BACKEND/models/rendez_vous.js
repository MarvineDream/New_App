import mongoose from 'mongoose';

const rendezVousSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  dateRendezVous: { type: Date, required: true },
  besoin: { type: mongoose.Schema.Types.ObjectId, ref: 'Besoin', required: true },
});

const RendezVous = mongoose.model('RendezVous', rendezVousSchema);

export default RendezVous;


//module.exports = mongoose.model('RendezVous', rendezVousSchema);