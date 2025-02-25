import React, { FC, useState } from 'react';
import { Input } from './ui/Input';

interface CityProps {
    onChange: (city: string) => void;
}

const City: FC<CityProps> = ({ onChange }) => {
    const [city, setCity] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onChange(city);
    };

    return (
        <div className="bg-white rounded-md p-2">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 rounded-md disabled:bg-gray-400"
                    disabled={!city.trim()}
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default City;