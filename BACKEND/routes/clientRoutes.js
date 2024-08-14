// routes/clientRoutes.js
import express from 'express';
import { createClient }  from '../Controllers/clientController.js';


const router = express.Router();

router.post('/clients', createClient);


export default router;
// module.exports = router; 