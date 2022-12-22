const getExchangeRates = async () => {
  const data = await fetch(
    `https://belarusbank.by/api/kursExchange?city=Гомель`
  );
  const result = await data.json();
  return {
    usd_in: result[0].USD_in,
    usd_out: result[0].USD_out,
  };
};

const getMyCityName = async () => {
  const data = await fetch(`http://ip-api.com/json/?fields=city`);
  const result = await data.json();

  return result.city;
};

export const getWeather = async () => {
  const cityName = await getMyCityName();
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=${process.env.WEATHER_KEY}&units=metric`
  );
  const result = await data.json();

  return {
    city: cityName,
    description: result.weather[0].description,
    temp_min: result.main.temp_min,
    temp_max: result.main.temp_max,
  };
};

export default getExchangeRates;
