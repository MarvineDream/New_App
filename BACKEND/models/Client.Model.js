// models/Client.js
import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true
  },
  phone: {
      type: String,
      required: true
  },
  prenom: {
      type: String,
      required: true
  },
  nom: {
      type: String,
      required: true
  },
  Statutsocial: {
      type: String,
      required: true
  }
}, {
  timestamps: true
});

const Client = mongoose.model('Client', clientSchema);
export default Client;