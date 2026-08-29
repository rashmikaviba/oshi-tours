export interface BookingRequestPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    hasFlightDetails: boolean;
    arrivalDate?: string;
    arrivalTime?: string;
    arrivalFlightNumber?: string;
    departureDate?: string;
    departureTime?: string;
    departureFlightNumber?: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    startLocation: string;
    endLocation: string;
    numberOfTravelers: number;
    transportPreference: string;
    activitiesOfInterest?: string;
    medicalConditions?: string;
    communicationPreference: string;
    specialRequests?: string;
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
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    hasFlightDetails: boolean;
    arrivalDate?: string;
    arrivalTime?: string;
    arrivalFlightNumber?: string;
    departureDate?: string;
    departureTime?: string;
    departureFlightNumber?: string;
    itinerary: ItineraryDayPayload[];
    transportPreference: string;
    hasActivities: boolean;
    selectedActivities: SelectedActivityPointPayload[];
    medicalConditions?: string;
    communicationPreference: string;
    specialRequests?: string;
}
//# sourceMappingURL=index.d.ts.map