export interface BookingFormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;

  // Step 2
  hasFlightDetails: boolean;
  arrivalDate: string;
  arrivalTime: string;
  arrivalFlightNumber: string;
  departureDate: string;
  departureTime: string;
  departureFlightNumber: string;

  // Step 3
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  startLocation: string;
  endLocation: string;
  numberOfTravelers: number;

  // Step 4
  transportPreference: string;

  // Step 5
  activitiesOfInterest: string;
  medicalConditions: string;
  communicationPreference: string;
  specialRequests: string;
  customActivity?: string; // Optional field for additional custom activity or special interest
}

export const INITIAL_FORM_DATA: BookingFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  nationality: '',

  hasFlightDetails: false,
  arrivalDate: '',
  arrivalTime: '',
  arrivalFlightNumber: '',
  departureDate: '',
  departureTime: '',
  departureFlightNumber: '',

  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  startLocation: '',
  endLocation: '',
  numberOfTravelers: 1,

  transportPreference: '',

  activitiesOfInterest: '',
  medicalConditions: '',
  communicationPreference: 'Email',
  specialRequests: '',
  customActivity: '',
};
