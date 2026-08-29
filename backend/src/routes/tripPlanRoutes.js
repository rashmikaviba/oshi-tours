"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tripPlanController_1 = require("../controllers/tripPlanController");
const router = (0, express_1.Router)();
// POST /api/trip-plans
router.post('/', tripPlanController_1.createTripPlan);
exports.default = router;
//# sourceMappingURL=tripPlanRoutes.js.map