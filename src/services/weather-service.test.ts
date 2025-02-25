// for demo purposes

import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchWeather } from './weather-service';

vi.mock('axios');

describe('fetchWeather', () => {
  it('should fetch weather and forecast data for a given city', async () => {
    const city = 'London';
    const weatherData = {
      name: 'London',
      main: { temp: 15 },
      weather: [{ description: 'clear sky', icon: '01d' }],
    };
    const forecastData = {
      list: [
        {
          main: { temp: 15 },
          weather: [{ description: 'clear sky', icon: '01d' }],
          dt_txt: '2023-10-01 12:00:00',
        },
      ],
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: weatherData });
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: forecastData });

    const result = await fetchWeather(city);

    expect(result).toEqual({
      weather: {
        city: 'London',
        temp: 15,
        condition: 'clear sky',
        icon: '01d',
      },
      forecast: [
        {
          temp: 15,
          condition: 'clear sky',
          icon: '01d',
          time: '2023-10-01 12:00:00',
        },
      ],
    });
  });

  it('should throw an error if the API call fails', async () => {
    const city = 'London';
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('API call failed'));

    await expect(fetchWeather(city)).rejects.toThrow('Failed to fetch weather data');
  });

  it('should return undefined if no city is provided', async () => {
    const result = await fetchWeather('');
    expect(result).toBeUndefined();
  });
});