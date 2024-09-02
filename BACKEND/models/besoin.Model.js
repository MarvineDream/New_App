import mongoose from 'mongoose';

const besoinSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: 
    ['établissement de la carte d\'assurance',
     'Renouvellement de la carte d\'assurance',
      'réclamation sur les cartes d\'assurance'] },
});

const Besoin = mongoose.model('Besoin', besoinSchema);

export default Besoin; 