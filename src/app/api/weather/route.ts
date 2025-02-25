import { NextResponse } from 'next/server';

export async function GET(req: Request) {

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city")

    if (!city)
        return NextResponse.json({ error: "City is required" }, { status: 400 })

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl, { next: { revalidate: 1 } }),
        fetch(forecastUrl, { next: { revalidate: 1 } }),
    ]);

    const weatherJson = await weatherResponse.json()
    const forecastJson = await forecastResponse.json()

    if (weatherJson.cod !== 200) {
        return NextResponse.json({ error: weatherJson.message }, { status: weatherJson.cod });
    }

    const weather = {
        city: weatherJson.name,
        temp: weatherJson.main.temp,
        condition: weatherJson.weather[0].description,
        icon: weatherJson.weather[0].icon,
    };

    const forecast = forecastJson.list.map((item: any) => ({
        temp: item.main.temp,
        condition: item.weather[0].description,
        icon: item.weather[0].icon,
        time: item.dt_txt,
    }));

    return NextResponse.json({
        weather,
        forecast
    })
}