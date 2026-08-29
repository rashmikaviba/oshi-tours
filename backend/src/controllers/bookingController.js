"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = void 0;
const zod_1 = require("zod");
const referenceService_1 = require("../services/referenceService");
const emailService_1 = require("../services/emailService");
const bookingSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    email: zod_1.z.string().email('Invalid email format'),
    phone: zod_1.z.string().min(1, 'Phone is required'),
    nationality: zod_1.z.string().min(1, 'Nationality is required'),
    hasFlightDetails: zod_1.z.boolean(),
    arrivalDate: zod_1.z.string().optional(),
    arrivalTime: zod_1.z.string().optional(),
    arrivalFlightNumber: zod_1.z.string().optional(),
    departureDate: zod_1.z.string().optional(),
    departureTime: zod_1.z.string().optional(),
    departureFlightNumber: zod_1.z.string().optional(),
    startDate: zod_1.z.string().min(1, 'Start date is required'),
    startTime: zod_1.z.string().min(1, 'Start time is required'),
    endDate: zod_1.z.string().min(1, 'End date is required'),
    endTime: zod_1.z.string().min(1, 'End time is required'),
    startLocation: zod_1.z.string().min(1, 'Start location is required'),
    endLocation: zod_1.z.string().min(1, 'End location is required'),
    numberOfTravelers: zod_1.z.number().min(1, 'At least 1 traveler required'),
    transportPreference: zod_1.z.string().min(1, 'Transport preference is required'),
    activitiesOfInterest: zod_1.z.string().optional(),
    medicalConditions: zod_1.z.string().optional(),
    communicationPreference: zod_1.z.string().min(1, 'Communication preference is required'),
    specialRequests: zod_1.z.string().optional(),
    experienceName: zod_1.z.string().optional(),
}).refine(data => {
    if (data.hasFlightDetails) {
        return (!!data.arrivalDate && !!data.arrivalTime && !!data.arrivalFlightNumber &&
            !!data.departureDate && !!data.departureTime && !!data.departureFlightNumber);
    }
    return true;
}, {
    message: "Flight details are missing",
    path: ["hasFlightDetails"]
});
const createBooking = async (req, res) => {
    try {
        // 1. Validate incoming data
        const validatedData = bookingSchema.parse(req.body);
        // 2. Generate Reference Number
        const reference = (0, referenceService_1.generateReferenceNumber)();
        // 3. Send Email
        await (0, emailService_1.sendBookingEmail)(reference, validatedData);
        // 4. Return success
        return res.status(200).json({
            success: true,
            reference,
            message: 'Booking request successfully submitted.'
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
        console.error('Error in createBooking:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while processing booking.'
        });
    }
};
exports.createBooking = createBooking;
//# sourceMappingURL=bookingController.js.map