import { Request, Response } from 'express';
import { z } from 'zod';
import { generateReferenceNumber } from '../services/referenceService';
import { sendBookingEmail } from '../services/emailService';
import type { BookingRequestPayload } from '../types';

const bookingSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  
  hasFlightDetails: z.boolean(),
  arrivalDate: z.string().optional(),
  arrivalTime: z.string().optional(),
  arrivalFlightNumber: z.string().optional(),
  departureDate: z.string().optional(),
  departureTime: z.string().optional(),
  departureFlightNumber: z.string().optional(),
  
  startDate: z.string().min(1, 'Start date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endDate: z.string().min(1, 'End date is required'),
  endTime: z.string().min(1, 'End time is required'),
  startLocation: z.string().min(1, 'Start location is required'),
  endLocation: z.string().min(1, 'End location is required'),
  numberOfTravelers: z.number().min(1, 'At least 1 traveler required'),
  
  transportPreference: z.string().min(1, 'Transport preference is required'),
  
  activitiesOfInterest: z.string().optional(),
  medicalConditions: z.string().optional(),
  communicationPreference: z.string().min(1, 'Communication preference is required'),
  specialRequests: z.string().optional(),
  experienceName: z.string().optional(),
}).refine(data => {
  if (data.hasFlightDetails) {
    return (
      !!data.arrivalDate && !!data.arrivalTime && !!data.arrivalFlightNumber &&
      !!data.departureDate && !!data.departureTime && !!data.departureFlightNumber
    );
  }
  return true;
}, {
  message: "Flight details are missing",
  path: ["hasFlightDetails"] 
});

export const createBooking = async (req: Request, res: Response) => {
  try {
    // 1. Validate incoming data
    const validatedData = bookingSchema.parse(req.body);

    // 2. Generate Reference Number
    const reference = generateReferenceNumber();

    // 3. Send Email
    await sendBookingEmail(reference, validatedData as BookingRequestPayload);

    // 4. Return success
    return res.status(200).json({
      success: true,
      reference,
      message: 'Booking request successfully submitted.'
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: (error as any).issues || (error as any).errors
      });
    }
    
    console.error('Error in createBooking:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing booking.'
    });
  }
};
