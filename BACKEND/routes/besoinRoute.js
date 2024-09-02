import { Router } from 'express';
import { createBesoin, deleteBesoinById, getAllBesoins, getBesoinById, updateBesoinById } from '../Controllers/besoinController';


const router = Router();


router.get("/ :id", getBesoinById);

router.get("/", getAllBesoins);

router.post("/", createBesoin);

router.put("/:id", updateBesoinById);

router.delete("/:id", deleteBesoinById);








export default router;