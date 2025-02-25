import { FC } from "react"

const WeatherCard: FC<{ weather: { condition: string, temp: number, city: string, icon: string } }> = ({ weather }) => {
    return (
        <span className="flex flex-col items-center" >
            <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt={weather.condition}
            />
            <h1 className="text-4xl -mt-10">{weather.city}</h1>
            <h2 className="text-2xl capitalize">{weather.condition}</h2>
            <h3 className="text-4xl">{Math.floor(weather.temp)}°C</h3>
        </span>
    )
}

export default WeatherCard