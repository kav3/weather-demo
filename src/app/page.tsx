"use client";

import { useEffect, useState } from "react";
import ForecastCard from "@/components/ForecastCard";
import City from "@/components/City";
import { Button } from "@/components/ui/Button";
import WeatherCard from "@/components/WeatherCard";
import ThemeSelector from "@/components/ui/ThemeSelector";
import { fetchWeather } from "@/services/weather-service";

export default function Home() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // default city is the second part of the timezone string
  const defaultCity = timezone.split("/")[1].replace("_", " ") ?? "Vancouver";

  const [city, setCity] = useState(defaultCity);
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [showCityModal, setShowCityModal] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get the city name from local storage if it's available (client-side only)
    if (typeof window !== "undefined") {
      const storedCity = localStorage.getItem("city");
      setCity(storedCity || defaultCity);
    } else {
      setCity(defaultCity);
    }
  }, []);

  const fetchWeatherData = async () => {
    if (!city) return;

    // reset the state
    setError(false);
    setLoading(true);
    setWeather(null);

    try {
      const result = await fetchWeather(city);
      const { weather, forecast } = result;

      if (!weather || !forecast)
        throw new Error("Failed to fetch weather data");

      setWeather(weather);
      setForecast(forecast);

      // save the city name to local storage if it's valid
      localStorage.setItem("city", city);

    } catch {
      setError(true);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    setShowCityModal(false);
  }, [city]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-t from-blue-300 to-blue-500 dark:from-blue-600 dark:to-blue-900 p-4 gap-3">
      {weather && (
        <div className="flex gap-10">
          <WeatherCard weather={weather} />
          <ForecastCard weatherData={forecast} />
        </div>
      )}

      {loading && <span className="text-4xl">Loading...</span>}

      {error && (
        <span className="text-4xl text-center">
          Sorry, you should provide a valid city name.
        </span>
      )}

      <span className="flex gap-2">
        <Button onClick={() => setShowCityModal(!showCityModal)}>Change City</Button>
        <ThemeSelector />
      </span>

      {showCityModal && (
        <>
          <div className="absolute inset-0 bg-black/80"></div>
          <div onClick={(e) => {
            if (e.target === e.currentTarget)
              setShowCityModal(false)
          }} className="absolute inset-0 z-10 flex items-center justify-center">
            <City onChange={(selectedCity: string) => setCity(selectedCity)} />
          </div>
        </>
      )}
    </div>
  );
}