// for demo purposes

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import WeatherCard from './WeatherCard'

test('WeatherCard', () => {
    const mockWeather = {
        condition: "Cloudy",
        temp: 15.7,
        city: "Vancouver",
        icon: "04d",
    };

    render(<WeatherCard weather={mockWeather} />)

    expect(screen.getByText(/vancouver/i)).toBeDefined();
    expect(screen.getByText(/cloudy/i)).toBeDefined();
    expect(screen.getByText(/15°C/i)).toBeDefined();
})