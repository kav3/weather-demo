export const fetchWeather = async (city: string) => {
    if (!city) return;

    try {
        // cached for 60 seconds in the server
        const result = await fetch(`/api/weather/?city=${city}`);
        return await result.json();
    } catch {
        throw new Error("Failed to fetch weather data");
    }
};