import nodemailer from 'nodemailer';
import { generateBookingEmailHTML } from '../templates/bookingEmail';
import { generateTripPlanEmailHTML } from '../templates/tripPlanEmail';
import type { BookingRequestPayload, TripPlanRequestPayload } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendBookingEmail = async (
  reference: string,
  bookingData: BookingRequestPayload
): Promise<void> => {
  const mailOptions = {
    from: process.env.MAIL_FROM || '"OSHĪ Bookings" <noreply@oshi.com>',
    to: process.env.MAIL_TO || 'oshitourslanka@gmail.com',
    subject: `New Booking Request — Ref #${reference}`,
    html: generateBookingEmailHTML(reference, bookingData),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully for Ref #${reference}`);
  } catch (error) {
    console.error(`Failed to send email for Ref #${reference}:`, error);
    throw error;
  }
};

export const sendTripPlanEmail = async (
  reference: string,
  tripPlanData: TripPlanRequestPayload
): Promise<void> => {
  const mailOptions = {
    from: process.env.MAIL_FROM || '"OSHĪ Trip Planner" <noreply@oshi.com>',
    to: process.env.MAIL_TO || 'oshitourslanka@gmail.com',
    subject: `New Custom Trip Plan Request — Ref #${reference} (${tripPlanData.planName})`,
    html: generateTripPlanEmailHTML(reference, tripPlanData),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Trip Plan Email sent successfully for Ref #${reference}`);
  } catch (error) {
    console.error(`Failed to send Trip Plan email for Ref #${reference}:`, error);
    throw error;
  }
};

