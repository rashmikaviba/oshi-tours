import { Router } from 'express';
import { createBooking } from '../controllers/bookingController';

const router = Router();

// POST /api/bookings
router.post('/', createBooking as any);

export default router;
