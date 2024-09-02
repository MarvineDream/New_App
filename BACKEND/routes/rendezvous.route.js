import { Router } from 'express';
import { createRendezvous, deleteRendezvous, getRendezvous, getRendezvousById, updateRendezvous } from '../Controllers/rendez_vousController.js';


const router = Router();


router.get("/ :id", getRendezvousById);

router.get("/", getRendezvous);

router.post("/:id", createRendezvous);

router.put("/:id", updateRendezvous);

router.delete("/:id", deleteRendezvous);














export default router;