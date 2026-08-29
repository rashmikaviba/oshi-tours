export interface BookingRequestPayload {
  // Step 1 - Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;

  // Step 2 - Flight Details
  hasFlightDetails: boolean;
  arrivalDate?: string;
  arrivalTime?: string;
  arrivalFlightNumber?: string;
  departureDate?: string;
  departureTime?: string;
  departureFlightNumber?: string;

  // Step 3 - Trip Details
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  startLocation: string;
  endLocation: string;
  numberOfTravelers: number;

  // Step 4 - Transportation
  transportPreference: string;

  // Step 5 - Additional Info
  activitiesOfInterest?: string;
  medicalConditions?: string;
  communicationPreference: string;
  specialRequests?: string;

  // Experience/Plan Name (auto-set from experience page)
  experienceName?: string;
}

export interface PlaceItemPayload {
  id: string;
  placeId?: string;
  name: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  mapsUrl?: string;
  photoUrl?: string;
  photoAttribution?: string;
  editorialSummary?: string;
  types?: string[];
}

export interface ItineraryDayPayload {
  dateString: string;
  displayDate: string;
  places: PlaceItemPayload[];
}

export interface SelectedActivityPointPayload {
  categoryId: string;
  categoryTitle: string;
  activityId: string;
  activityName: string;
}

export interface TripPlanRequestPayload {
  submissionType: 'trip-planner';
  planName: string;
  startDate: string;
  endDate: string;

  // Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;

  // Flight Details
  hasFlightDetails: boolean;
  arrivalDate?: string;
  arrivalTime?: string;
  arrivalFlightNumber?: string;
  departureDate?: string;
  departureTime?: string;
  departureFlightNumber?: string;

  // Itinerary
  itinerary: ItineraryDayPayload[];

  // Transportation
  transportPreference: string;

  // Additional Info
  hasActivities: boolean;
  selectedActivities: SelectedActivityPointPayload[];
  medicalConditions?: string;
  communicationPreference: string;
  specialRequests?: string;
}
