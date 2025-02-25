import { FC } from "react";

interface WeatherItem {
  time: string;
  icon: string;
  condition: string;
  temp: number;
}

interface ForecastCardProps {
  weatherData: WeatherItem[];
}

const ForecastCard: FC<ForecastCardProps> = ({ weatherData }) => {
  // Group weather data by date
  const groupByDay = weatherData.reduce((acc, item) => {
    const date = item.time.split(" ")[0]; // Extract the date part
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, WeatherItem[]>);

  // Filter days starting from today
  const filteredDays = Object.keys(groupByDay).filter(
    (day) => new Date(day).getDate() >= new Date().getDate()
  );

  return (
    <div className="flex flex-col bg-white dark:bg-zinc-800 dark:text-white rounded-lg overflow-hidden text-black">
      {filteredDays.map((day) => (
        <div key={day} className="flex items-center odd:bg-zinc-100 dark:odd:bg-zinc-900 px-2">
          <h3 className="text-2xl">{new Date(day).getDate()}</h3>
          {groupByDay[day].map((item) => (
            <div key={item.time} className="flex flex-col items-center">
              <span>{new Date(item.time).getHours()}:00</span>
              <img
                src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                alt={item.condition}
                className="-my-3"
              />
              <span>{Math.floor(item.temp)}°C</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ForecastCard;