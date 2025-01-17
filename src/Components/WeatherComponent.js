import React, { useState, useEffect } from 'react';
import useWeather from '../hooks/useWeather';

const WeatherComponent = () => {
    const { weatherData, loading, error } = useWeather();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching weather data: {error.message}</div>;
    }

    return (
        <div>
            <h1>Weather Information</h1>
            {weatherData && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherComponent;