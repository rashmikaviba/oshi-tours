"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTripPlanEmail = exports.sendBookingEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const bookingEmail_1 = require("../templates/bookingEmail");
const tripPlanEmail_1 = require("../templates/tripPlanEmail");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
const sendBookingEmail = async (reference, bookingData) => {
    const mailOptions = {
        from: process.env.MAIL_FROM || '"OSHĪ Bookings" <noreply@oshi.com>',
        to: process.env.MAIL_TO || 'rajkumararashmika@gmail.com',
        subject: `New Booking Request — Ref #${reference}`,
        html: (0, bookingEmail_1.generateBookingEmailHTML)(reference, bookingData),
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully for Ref #${reference}`);
    }
    catch (error) {
        console.error(`Failed to send email for Ref #${reference}:`, error);
        throw error;
    }
};
exports.sendBookingEmail = sendBookingEmail;
const sendTripPlanEmail = async (reference, tripPlanData) => {
    const mailOptions = {
        from: process.env.MAIL_FROM || '"OSHĪ Trip Planner" <noreply@oshi.com>',
        to: process.env.MAIL_TO || 'rajkumararashmika@gmail.com',
        subject: `New Custom Trip Plan Request — Ref #${reference} (${tripPlanData.planName})`,
        html: (0, tripPlanEmail_1.generateTripPlanEmailHTML)(reference, tripPlanData),
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`Trip Plan Email sent successfully for Ref #${reference}`);
    }
    catch (error) {
        console.error(`Failed to send Trip Plan email for Ref #${reference}:`, error);
        throw error;
    }
};
exports.sendTripPlanEmail = sendTripPlanEmail;
//# sourceMappingURL=emailService.js.map