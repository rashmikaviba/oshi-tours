import { Request, Response } from 'express';
import { z } from 'zod';
import { generateReferenceNumber } from '../services/referenceService';
import { sendTripPlanEmail } from '../services/emailService';
import type { TripPlanRequestPayload } from '../types';
import {
  ACTIVITY_CATALOG_MAP,
  TOTAL_AVAILABLE_ACTIVITY_POINTS,
} from '../data/activityCatalog';

const placeItemSchema = z.object({
  id: z.string(),
  placeId: z.string().optional(),
  name: z.string().min(1, 'Place name is required'),
  formattedAddress: z.string().default(''),
  lat: z.number(),
  lng: z.number(),
  mapsUrl: z.string().optional(),
  photoUrl: z.string().optional(),
  photoAttribution: z.string().optional(),
  editorialSummary: z.string().optional(),
  types: z.array(z.string()).optional(),
});

const itineraryDaySchema = z.object({
  dateString: z.string().min(1, 'Date string is required'),
  displayDate: z.string().default(''),
  places: z.array(placeItemSchema).default([]),
});

const selectedActivityPointSchema = z.object({
  categoryId: z.string(),
  categoryTitle: z.string(),
  activityId: z.string(),
  activityName: z.string(),
});

const tripPlanSchema = z.object({
  submissionType: z.literal('trip-planner').default('trip-planner'),
  planName: z.string().min(1, 'Travel plan name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),

  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
  nationality: z.string().min(1, 'Nationality is required'),

  hasFlightDetails: z.boolean().default(false),
  arrivalDate: z.string().optional(),
  arrivalTime: z.string().optional(),
  arrivalFlightNumber: z.string().optional(),
  departureDate: z.string().optional(),
  departureTime: z.string().optional(),
  departureFlightNumber: z.string().optional(),

  itinerary: z.array(itineraryDaySchema).default([]),

  transportPreference: z.string().min(1, 'Transport preference is required'),

  hasActivities: z.boolean().default(false),
  selectedActivities: z.array(selectedActivityPointSchema)
    .max(TOTAL_AVAILABLE_ACTIVITY_POINTS, `Maximum ${TOTAL_AVAILABLE_ACTIVITY_POINTS} activity selections allowed`)
    .default([]),
  medicalConditions: z.string().optional(),
  communicationPreference: z.string().min(1, 'Communication preference is required'),
  specialRequests: z.string().optional(),
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
    return (
      !!data.arrivalDate && !!data.arrivalTime && !!data.arrivalFlightNumber &&
      !!data.departureDate && !!data.departureTime && !!data.departureFlightNumber
    );
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
  if (!data.selectedActivities || data.selectedActivities.length === 0) return true;

  const seenKeys = new Set<string>();
  for (const item of data.selectedActivities) {
    const key = `${item.categoryId}::${item.activityId}`;
    if (seenKeys.has(key)) return false;
    seenKeys.add(key);

    const catalogItem = ACTIVITY_CATALOG_MAP.get(key);
    if (!catalogItem) return false;
    if (item.categoryTitle !== catalogItem.categoryTitle) return false;
    if (item.activityName !== catalogItem.activityName) return false;
  }
  return true;
}, {
  message: "Invalid or duplicate activity selections submitted",
  path: ["selectedActivities"]
});

export const createTripPlan = async (req: Request, res: Response) => {
  try {
    const validatedData = tripPlanSchema.parse(req.body);
    const reference = generateReferenceNumber();

    await sendTripPlanEmail(reference, validatedData as TripPlanRequestPayload);

    return res.status(200).json({
      success: true,
      reference,
      message: 'Trip plan request successfully submitted.'
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: (error as any).issues || (error as any).errors
      });
    }

    console.error('Error in createTripPlan:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing trip plan.'
    });
  }
};
