import type { BookingRequestPayload } from '../types';

export const generateBookingEmailHTML = (
  reference: string,
  data: BookingRequestPayload
): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Request - Ref #${reference}</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #2C3E2D;
      background-color: #D3D6BB;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #D3D6BB;
      padding: 40px 0;
    }
    .container {
      max-width: 640px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #3B5937;
      color: #FFFFFF;
      text-align: center;
      padding: 45px 20px;
    }
    .logo {
      font-family: 'Times New Roman', Times, serif;
      font-size: 32px;
      letter-spacing: 4px;
      margin: 0;
      font-weight: normal;
    }
    .tagline {
      margin: 10px 0 0;
      font-size: 11px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      opacity: 0.8;
    }
    .content {
      padding: 50px 40px;
    }
    h1 {
      font-family: 'Times New Roman', Times, serif;
      color: #3B5937;
      font-size: 28px;
      font-weight: normal;
      margin: 0 0 5px;
      text-align: center;
    }
    .ref-number {
      font-size: 13px;
      color: #8C998B;
      text-align: center;
      margin-bottom: 45px;
      font-family: monospace;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
    .section-title {
      font-family: 'Times New Roman', Times, serif;
      font-size: 15px;
      color: #3B5937;
      text-transform: uppercase;
      letter-spacing: 2px;
      border-bottom: 1px solid #D3D6BB;
      padding-bottom: 10px;
      margin-bottom: 20px;
      margin-top: 35px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table td {
      padding: 14px 0;
      border-bottom: 1px solid rgba(59, 89, 55, 0.08);
    }
    .data-table tr:last-child td {
      border-bottom: none;
    }
    .label {
      font-size: 11px;
      color: #8C998B;
      text-transform: uppercase;
      letter-spacing: 1px;
      width: 35%;
      vertical-align: top;
      padding-top: 16px;
    }
    .value {
      font-size: 15px;
      color: #2C3E2D;
      text-align: right;
      font-weight: 500;
    }
    .value.empty {
      color: #A0AAB0;
      font-style: italic;
      font-weight: 400;
    }
    .footer {
      background-color: #F7F8F3;
      padding: 30px;
      text-align: center;
      font-size: 11px;
      color: #8C998B;
      letter-spacing: 0.5px;
      border-top: 1px solid #EAEBE3;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h2 class="logo">OSHĪ</h2>
        <p class="tagline">Private Expeditions</p>
      </div>

      <div class="content">
        <h1>New Booking Request</h1>
        <div class="ref-number">Reference &middot; #${reference}</div>

        <div class="section-title">Personal Details</div>
        <table class="data-table">
          <tr>
            <td class="label">Name</td>
            <td class="value">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr>
            <td class="label">Email</td>
            <td class="value"><a href="mailto:${data.email}" style="color:#3B5937; text-decoration:none;">${data.email}</a></td>
          </tr>
          <tr>
            <td class="label">Phone</td>
            <td class="value">${data.phone || '<span class="empty">Not provided</span>'}</td>
          </tr>
          <tr>
            <td class="label">Nationality</td>
            <td class="value">${data.nationality}</td>
          </tr>
        </table>

        ${data.hasFlightDetails ? `
        <div class="section-title">Flight Details</div>
        <table class="data-table">
          <tr>
            <td class="label">Arrival</td>
            <td class="value">
              ${data.arrivalDate || 'TBD'} @ ${data.arrivalTime || 'TBD'}<br>
              <span style="font-size:12px; color:#8C998B; margin-top:4px; display:inline-block;">Flight: ${data.arrivalFlightNumber || 'TBD'}</span>
            </td>
          </tr>
          <tr>
            <td class="label">Departure</td>
            <td class="value">
              ${data.departureDate || 'TBD'} @ ${data.departureTime || 'TBD'}<br>
              <span style="font-size:12px; color:#8C998B; margin-top:4px; display:inline-block;">Flight: ${data.departureFlightNumber || 'TBD'}</span>
            </td>
          </tr>
        </table>
        ` : ''}

        <div class="section-title">Trip Itinerary</div>
        <table class="data-table">
          ${data.experienceName ? `<tr>
            <td class="label">Travel Plan</td>
            <td class="value">${data.experienceName}</td>
          </tr>` : ''}
          <tr>
            <td class="label">Journey Route</td>
            <td class="value">${data.startLocation} &rarr; ${data.endLocation}</td>
          </tr>
          <tr>
            <td class="label">Dates</td>
            <td class="value">${data.startDate} to ${data.endDate}</td>
          </tr>
          <tr>
            <td class="label">Travelers</td>
            <td class="value">${data.numberOfTravelers} Guests</td>
          </tr>
          <tr>
            <td class="label">Transport</td>
            <td class="value">${data.transportPreference}</td>
          </tr>
        </table>

        <div class="section-title">Preferences & Requests</div>
        <table class="data-table">
          <tr>
            <td class="label">Communication</td>
            <td class="value">${data.communicationPreference}</td>
          </tr>
          <tr>
            <td class="label">Activities</td>
            <td class="value ${!data.activitiesOfInterest ? 'empty' : ''}">${data.activitiesOfInterest || 'None specified'}</td>
          </tr>
          <tr>
            <td class="label">Medical / Diet</td>
            <td class="value ${!data.medicalConditions ? 'empty' : ''}">${data.medicalConditions || 'None specified'}</td>
          </tr>
          <tr>
            <td class="label">Special Requests</td>
            <td class="value ${!data.specialRequests ? 'empty' : ''}">${data.specialRequests || 'None specified'}</td>
          </tr>
        </table>
      </div>

      <div class="footer">
        This is an automated enquiry from the OSHĪ platform.<br>
        Please reply directly to the guest's email to initiate the curation process.
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
