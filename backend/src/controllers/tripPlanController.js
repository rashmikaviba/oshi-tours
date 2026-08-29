"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTripPlan = void 0;
const zod_1 = require("zod");
const referenceService_1 = require("../services/referenceService");
const emailService_1 = require("../services/emailService");
const activityCatalog_1 = require("../data/activityCatalog");
const placeItemSchema = zod_1.z.object({
    id: zod_1.z.string(),
    placeId: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, 'Place name is required'),
    formattedAddress: zod_1.z.string().default(''),
    lat: zod_1.z.number(),
    lng: zod_1.z.number(),
    mapsUrl: zod_1.z.string().optional(),
    photoUrl: zod_1.z.string().optional(),
    photoAttribution: zod_1.z.string().optional(),
    editorialSummary: zod_1.z.string().optional(),
    types: zod_1.z.array(zod_1.z.string()).optional(),
});
const itineraryDaySchema = zod_1.z.object({
    dateString: zod_1.z.string().min(1, 'Date string is required'),
    displayDate: zod_1.z.string().default(''),
    places: zod_1.z.array(placeItemSchema).default([]),
});
const selectedActivityPointSchema = zod_1.z.object({
    categoryId: zod_1.z.string(),
    categoryTitle: zod_1.z.string(),
    activityId: zod_1.z.string(),
    activityName: zod_1.z.string(),
});
const tripPlanSchema = zod_1.z.object({
    submissionType: zod_1.z.literal('trip-planner').default('trip-planner'),
    planName: zod_1.z.string().min(1, 'Travel plan name is required'),
    startDate: zod_1.z.string().min(1, 'Start date is required'),
    endDate: zod_1.z.string().min(1, 'End date is required'),
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    email: zod_1.z.string().email('Invalid email format'),
    phone: zod_1.z.string().min(1, 'Phone is required'),
    nationality: zod_1.z.string().min(1, 'Nationality is required'),
    hasFlightDetails: zod_1.z.boolean().default(false),
    arrivalDate: zod_1.z.string().optional(),
    arrivalTime: zod_1.z.string().optional(),
    arrivalFlightNumber: zod_1.z.string().optional(),
    departureDate: zod_1.z.string().optional(),
    departureTime: zod_1.z.string().optional(),
    departureFlightNumber: zod_1.z.string().optional(),
    itinerary: zod_1.z.array(itineraryDaySchema).default([]),
    transportPreference: zod_1.z.string().min(1, 'Transport preference is required'),
    hasActivities: zod_1.z.boolean().default(false),
    selectedActivities: zod_1.z.array(selectedActivityPointSchema)
        .max(activityCatalog_1.TOTAL_AVAILABLE_ACTIVITY_POINTS, `Maximum ${activityCatalog_1.TOTAL_AVAILABLE_ACTIVITY_POINTS} activity selections allowed`)
        .default([]),
    medicalConditions: zod_1.z.string().optional(),
    communicationPreference: zod_1.z.string().min(1, 'Communication preference is required'),
    specialRequests: zod_1.z.string().optional(),
}).refine(data => {
    if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
    }
    return true;
}, {
    message: "End date cannot be earlier than start date",
    path: ["endDate"]
}).refine(data => {
    if (data.hasFlightDetails) {
        return (!!data.arrivalDate && !!data.arrivalTime && !!data.arrivalFlightNumber &&
            !!data.departureDate && !!data.departureTime && !!data.departureFlightNumber);
    }
    return true;
}, {
    message: "Flight details are incomplete",
    path: ["hasFlightDetails"]
}).refine(data => {
    if (!data.hasActivities) {
        return data.selectedActivities.length === 0;
    }
    return true;
}, {
    message: "selectedActivities must be empty when hasActivities is false",
    path: ["selectedActivities"]
}).refine(data => {
    if (!data.selectedActivities || data.selectedActivities.length === 0)
        return true;
    const seenKeys = new Set();
    for (const item of data.selectedActivities) {
        const key = `${item.categoryId}::${item.activityId}`;
        if (seenKeys.has(key))
            return false;
        seenKeys.add(key);
        const catalogItem = activityCatalog_1.ACTIVITY_CATALOG_MAP.get(key);
        if (!catalogItem)
            return false;
        if (item.categoryTitle !== catalogItem.categoryTitle)
            return false;
        if (item.activityName !== catalogItem.activityName)
            return false;
    }
    return true;
}, {
    message: "Invalid or duplicate activity selections submitted",
    path: ["selectedActivities"]
});
const createTripPlan = async (req, res) => {
    try {
        const validatedData = tripPlanSchema.parse(req.body);
        const reference = (0, referenceService_1.generateReferenceNumber)();
        await (0, emailService_1.sendTripPlanEmail)(reference, validatedData);
        return res.status(200).json({
            success: true,
            reference,
            message: 'Trip plan request successfully submitted.'
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.issues || error.errors
            });
        }
        console.error('Error in createTripPlan:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while processing trip plan.'
        });
    }
};
exports.createTripPlan = createTripPlan;
//# sourceMappingURL=tripPlanController.js.map