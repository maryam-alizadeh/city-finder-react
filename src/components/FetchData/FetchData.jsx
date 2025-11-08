import { useEffect, useState } from "react";
import styles from "./FetchData.module.css"


function FetchData({ city }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "da4ac487bdb3c3714b74b415aaef879b";

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const json = await res.json();

        if (json.cod === 200) {
          setData(json);
        } else {
          setError("City not found");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) return <div className={styles.card}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!data) return null;

  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <span role="img" aria-label="globe">🌍</span>
        <span>{data.name}</span>
      </div>

      <div className={styles.info}>
        <span role="img" aria-label="thermometer">🌡️</span>
        {Math.round(data.main.temp)}°C |{" "}
        {data.weather[0].description.charAt(0).toUpperCase() +
          data.weather[0].description.slice(1)}
      </div>

      <div className={styles.coords}>
        <span role="img" aria-label="pin">📍</span>
        lat: {data.coord.lat.toFixed(2)} | lon: {data.coord.lon.toFixed(2)}
      </div>
    </div>
  );
}
export default FetchData;
