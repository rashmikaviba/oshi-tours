"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTripPlanEmailHTML = void 0;
function escapeHtml(str) {
    if (!str)
        return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
const generateTripPlanEmailHTML = (reference, data) => {
    const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Colombo',
        dateStyle: 'full',
        timeStyle: 'medium',
    });
    const itineraryRowsHTML = data.itinerary && data.itinerary.length > 0
        ? data.itinerary.map(day => {
            const dateHeader = escapeHtml(day.displayDate || day.dateString);
            let placesHTML = '';
            if (day.places && day.places.length > 0) {
                placesHTML = day.places.map((place, idx) => {
                    const placeName = escapeHtml(place.name);
                    const address = escapeHtml(place.formattedAddress);
                    const mapsUrl = place.mapsUrl
                        ? escapeHtml(place.mapsUrl)
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.formattedAddress)}`;
                    return `
              <div style="margin-top: 8px; padding: 10px 12px; background-color: #F8F9F5; border-left: 3px solid #3B5937; border-radius: 2px;">
                <div style="font-weight: 600; color: #2C3E2D; font-size: 14px;">
                  ${idx + 1}. ${placeName}
                </div>
                ${address ? `<div style="font-size: 12px; color: #667064; margin-top: 2px;">${address}</div>` : ''}
                <div style="margin-top: 4px;">
                  <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 11px; color: #3B5937; font-weight: 500; text-decoration: underline;">
                    View on Google Maps &rarr;
                  </a>
                </div>
              </div>
            `;
                }).join('');
            }
            else {
                placesHTML = `
            <div style="margin-top: 6px; font-size: 12px; color: #9DA79B; font-style: italic;">
              No places added for this day
            </div>
          `;
            }
            return `
          <div style="margin-bottom: 20px; border-bottom: 1px dashed rgba(59, 89, 55, 0.15); padding-bottom: 14px;">
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 16px; font-weight: bold; color: #3B5937;">
              ${dateHeader}
            </div>
            ${placesHTML}
          </div>
        `;
        }).join('')
        : '<div style="color: #9DA79B; font-style: italic;">No itinerary days generated.</div>';
    let activitiesHTML = '';
    if (data.hasActivities && data.selectedActivities && data.selectedActivities.length > 0) {
        const grouped = data.selectedActivities.reduce((acc, point) => {
            const cat = escapeHtml(point.categoryTitle);
            if (!acc[cat])
                acc[cat] = [];
            acc[cat].push(escapeHtml(point.activityName));
            return acc;
        }, {});
        activitiesHTML = Object.entries(grouped).map(([categoryTitle, names]) => `
      <div style="margin-bottom: 8px; text-align: left;">
        <div style="font-weight: 600; color: #3B5937; font-size: 13px;">${categoryTitle}</div>
        <ul style="margin: 3px 0 0 0; padding-left: 18px; color: #2C3E2D; font-size: 13px;">
          ${names.map(name => `<li style="margin-bottom: 2px;">${name}</li>`).join('')}
        </ul>
      </div>
    `).join('');
    }
    else {
        activitiesHTML = '<span class="empty">None selected</span>';
    }
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trip Planner Request - Ref #${escapeHtml(reference)}</title>
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
      padding: 40px 35px;
    }
    h1 {
      font-family: 'Times New Roman', Times, serif;
      color: #3B5937;
      font-size: 26px;
      font-weight: normal;
      margin: 0 0 5px;
      text-align: center;
    }
    .ref-number {
      font-size: 13px;
      color: #8C998B;
      text-align: center;
      margin-bottom: 35px;
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
      padding-bottom: 8px;
      margin-bottom: 16px;
      margin-top: 30px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table td {
      padding: 10px 0;
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
      padding-top: 2px;
    }
    .value {
      font-size: 14px;
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
      padding: 24px;
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
        <p class="tagline">Custom Trip Planner Request</p>
      </div>

      <div class="content">
        <h1>Trip Planner Request</h1>
        <div class="ref-number">Reference &middot; #${escapeHtml(reference)}</div>

        <div class="section-title">Plan Summary</div>
        <table class="data-table">
          <tr>
            <td class="label">Plan Name</td>
            <td class="value">${escapeHtml(data.planName)}</td>
          </tr>
          <tr>
            <td class="label">Travel Dates</td>
            <td class="value">${escapeHtml(data.startDate)} &rarr; ${escapeHtml(data.endDate)}</td>
          </tr>
        </table>

        <div class="section-title">Personal Details</div>
        <table class="data-table">
          <tr>
            <td class="label">Name</td>
            <td class="value">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</td>
          </tr>
          <tr>
            <td class="label">Email</td>
            <td class="value"><a href="mailto:${escapeHtml(data.email)}" style="color:#3B5937; text-decoration:none;">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td class="label">Phone</td>
            <td class="value">${escapeHtml(data.phone) || '<span class="empty">Not provided</span>'}</td>
          </tr>
          <tr>
            <td class="label">Nationality</td>
            <td class="value">${escapeHtml(data.nationality)}</td>
          </tr>
        </table>

        ${data.hasFlightDetails ? `
        <div class="section-title">Flight Details</div>
        <table class="data-table">
          <tr>
            <td class="label">Arrival</td>
            <td class="value">
              ${escapeHtml(data.arrivalDate) || 'TBD'} @ ${escapeHtml(data.arrivalTime) || 'TBD'}<br>
              <span style="font-size:12px; color:#8C998B; margin-top:2px; display:inline-block;">Flight: ${escapeHtml(data.arrivalFlightNumber) || 'TBD'}</span>
            </td>
          </tr>
          <tr>
            <td class="label">Departure</td>
            <td class="value">
              ${escapeHtml(data.departureDate) || 'TBD'} @ ${escapeHtml(data.departureTime) || 'TBD'}<br>
              <span style="font-size:12px; color:#8C998B; margin-top:2px; display:inline-block;">Flight: ${escapeHtml(data.departureFlightNumber) || 'TBD'}</span>
            </td>
          </tr>
        </table>
        ` : ''}

        <div class="section-title">Custom Day-by-Day Itinerary</div>
        ${itineraryRowsHTML}

        <div class="section-title">Transportation & Logistics</div>
        <table class="data-table">
          <tr>
            <td class="label">Transport</td>
            <td class="value">${escapeHtml(data.transportPreference)}</td>
          </tr>
        </table>

        <div class="section-title">Preferences & Requests</div>
        <table class="data-table">
          <tr>
            <td class="label">Communication</td>
            <td class="value">${escapeHtml(data.communicationPreference)}</td>
          </tr>
          <tr>
            <td class="label">Activities</td>
            <td class="value">${activitiesHTML}</td>
          </tr>
          <tr>
            <td class="label">Medical / Diet</td>
            <td class="value ${!data.medicalConditions ? 'empty' : ''}">${escapeHtml(data.medicalConditions) || 'None specified'}</td>
          </tr>
          <tr>
            <td class="label">Special Requests</td>
            <td class="value ${!data.specialRequests ? 'empty' : ''}">${escapeHtml(data.specialRequests) || 'None specified'}</td>
          </tr>
          <tr>
            <td class="label">Submitted At</td>
            <td class="value">${timestamp}</td>
          </tr>
        </table>
      </div>

      <div class="footer">
        This custom itinerary request was generated from the OSHĪ Trip Planner.<br>
        Please reply directly to the guest's email to begin curating their bespoke route.
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
exports.generateTripPlanEmailHTML = generateTripPlanEmailHTML;
//# sourceMappingURL=tripPlanEmail.js.map