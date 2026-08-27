// IMD Weather & Satellite Precipitation Data
export const weather = {
  current: {
    rainfall24h: 145,
    rainfall1h: 16.5,
    rainfall6h: 68.2,
    rainfall72h: 312.0,
    forecast: 'Heavy to very heavy rainfall expected across Meghalaya plateau (next 48h)',
    humidity: 88,
    temperature: 24,
    pressure: 1004,
    wind: '14 km/h ENE',
    soilSaturationIndex: '92% (Critical Saturation)',
    source: 'India Meteorological Department (IMD) AWS & Doppler Radar',
    lastUpdated: '26 Aug 2026, 14:30 IST'
  },
  satellite: {
    satelliteName: 'INSAT-3D / GSAT-17 Meteorological Payload',
    observationTime: '14:15 IST (26 Aug 2026)',
    cloudCover: '94% Deep Convective Clouds',
    precipitationIndex: 'Extreme (Red Alert Status)',
    resolution: '1 km Thermal Infrared'
  },
  hourlyTrend: [
    { time: '04:00', rain: 8.2, cumulative: 88, riskLevel: 55 },
    { time: '06:00', rain: 10.5, cumulative: 98, riskLevel: 62 },
    { time: '08:00', rain: 12.4, cumulative: 111, riskLevel: 68 },
    { time: '10:00', rain: 14.1, cumulative: 125, riskLevel: 72 },
    { time: '12:00', rain: 15.8, cumulative: 139, riskLevel: 76 },
    { time: '14:00', rain: 16.5, cumulative: 145, riskLevel: 78 }
  ],
  forecast5Day: [
    { day: 'Wed (Today)', rain: 145, temp: 24, condition: 'Heavy Rain', alertLevel: 'CRITICAL', warning: 'High runoff and slope destabilization expected' },
    { day: 'Thu (27 Aug)', rain: 160, temp: 23, condition: 'Very Heavy Rain', alertLevel: 'CRITICAL', warning: 'Peak saturation trigger window' },
    { day: 'Fri (28 Aug)', rain: 120, temp: 24, condition: 'Heavy Rain', alertLevel: 'HIGH', warning: 'Continued landslide vulnerability' },
    { day: 'Sat (29 Aug)', rain: 85, temp: 25, condition: 'Moderate Rain', alertLevel: 'MODERATE', warning: 'Gradual decrease in intensity' },
    { day: 'Sun (30 Aug)', rain: 45, temp: 26, condition: 'Light Rain', alertLevel: 'LOW', warning: 'Residual risk monitoring' }
  ]
};
