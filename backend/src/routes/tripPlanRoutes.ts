import { Router } from 'express';
import { createTripPlan } from '../controllers/tripPlanController';

const router = Router();

// POST /api/trip-plans
router.post('/', createTripPlan as any);

export default router;
