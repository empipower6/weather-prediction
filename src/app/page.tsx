"use client";
import styles from "./scss/weather.module.scss";
import Ellipse from "./components/svg/ellipse";
import { use, useEffect, useState } from "react";
import { generateRandomRGB } from "./components/library/hexcodeGenerator";
import { findLocation } from "./components/library/locationFinder";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [weatherData, setWeatherData] = useState({
    name: "-",
    country: "-",
    temperature: "-",
    humidity: "-",
    wind: "-",
    fetch: false,
  });
  const [error, setError] = useState("");
  const [ellipsisColor, setEllipsisColor] = useState({
    first: generateRandomRGB(),
    second: generateRandomRGB(),
  });

  const currentDate = new Date(); // Get the current date
  const currentYear = currentDate.getFullYear(); // Get the current year

  const formattedDate = `${currentDate.toLocaleString("en-US", {
    month: "long",
  })} ${currentDate.getDate()}`; // Format the date

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const rgbValue =
        Math.floor((Number(e.screenX) * 256) / Number(window.innerWidth)) - 1;
      const newColors = {
        first: ellipsisColor.first,
        second: [ellipsisColor.second[0], rgbValue, rgbValue],
      };
      setEllipsisColor(newColors);
    });
  });
  useEffect(() => {
    // let location: (string | number)[] = findLocation();
    //If the location is not found, location will return an error message
    //In that case, we'll use the default location Toronto longitude and latitude
    // if (location && location[2]) {
    //   setError(String(location[2]));
    // }
    //default by toronto for now
    const location = [43.6534817, -79.3839347];
    if (!weatherData.fetch) {
      fetchWeatherData(Number(location[0]), Number(location[1]));
    }
  }, []); // Empty dependency array ensures this effect runs only once, on component mount

  // Function to fetch weather data from the OpenWeatherMap API
  const fetchWeatherData = (latitude: number, longitude: number) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json(); // Parse response body as JSON
      })
      .then((data) => {
        // Set the weather data state
        setWeatherData({
          name: data.name,
          country: data.sys.country,
          temperature: String(Math.ceil(data.main.temp) + 12),
          humidity: data.main.humidity,
          wind: data.wind.speed,
          fetch: true,
        });
      })
      .catch((error) => {
        // Handle fetch errors
        setError("Failed to fetch weather data: " + error.message);
      });
  };
  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <div className={styles.left}>
          <div className={styles.sectionTop}>
            <p>{error}</p>
            <h1 className={styles.date}>
              {formattedDate}, <b style={{ color: "#F25858" }}> {Number(currentYear)+20} </b>
            </h1>
            <h2 className={styles.temperature}>{weatherData.temperature}C</h2>
          </div>
          <div className={styles.sectionBottom}>
            <h3 className={styles.location}>
              {weatherData.name} {weatherData.country}
            </h3>
            <div className={styles.titletoParagraphSpace}></div>
            <p className={styles.details}>Wind: {weatherData.wind}</p>
            <p className={styles.details}>Humidity: {weatherData.humidity}</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.caution}>
            <div className={styles.alignmentSpace}></div>
            <h2 className={styles.cautionTitle}>Caution</h2>
            <div className={styles.titletoParagraphSpace}></div>
            <p className={styles.cautionItem}>
              Drink plenty of water to stay hydrated.
            </p>
            <p className={styles.cautionItem}>
              Avoid unnecessary outdoor activities, especially during the peak
              heat hours between 10 a.m. and 4 p.m.
            </p>
          </div>
          <div className={styles.graphics}>
            <div className={styles.sphere1}>
              <Ellipse color={ellipsisColor.first} />
            </div>
            <div className={styles.sphere2}>
              <Ellipse color={ellipsisColor.second} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
