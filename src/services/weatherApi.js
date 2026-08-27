// IMD Meteorological Weather Data Service
import { apiRequest } from './api';

const MOCK_WEATHER = {
  current: {
    rainfall24h: '145 mm',
    forecast: 'Heavy rainfall expected (next 48h)',
    humidity: '88%',
    temperature: '24°C',
    pressure: '1004 hPa',
    source: 'IMD Data',
    wind: '14 km/h ENE'
  },
  forecast5Day: [
    { day: 'Wed (Today)', rain: 145, temp: '24°C', condition: 'Heavy Rain' },
    { day: 'Thu', rain: 160, temp: '23°C', condition: 'Heavy Rain' },
    { day: 'Fri', rain: 120, temp: '24°C', condition: 'Moderate Rain' },
    { day: 'Sat', rain: 85, temp: '25°C', condition: 'Light Rain' },
    { day: 'Sun', rain: 45, temp: '26°C', condition: 'Partly Cloudy' }
  ],
  hourlyRain: [
    { time: '10:00', amount: 8.5 },
    { time: '11:00', amount: 10.2 },
    { time: '12:00', amount: 12.8 },
    { time: '13:00', amount: 15.0 },
    { time: '14:00', amount: 16.5 }
  ]
};

export async function getWeatherData() {
  const data = await apiRequest('/weather');
  return data || MOCK_WEATHER;
}
