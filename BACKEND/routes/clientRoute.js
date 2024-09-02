import { Router } from 'express';
import express from 'express';
import { createClient, deleteClientById, getAllClients, getClientById, updateClientById } from '../Controllers/clientController.js';


const router = Router();



router.get("/", getAllClients);

router.get("/ :id", getClientById);

router.post("/", createClient);

router.put("/:id", updateClientById);

router.delete("/:id", deleteClientById);









export default router;