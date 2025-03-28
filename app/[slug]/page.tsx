"use client";
import WeeklyForcast from "@/component/weekForcast";
import { WeatherData } from "@/dataTypes/weather";
import { Box, Card, Grid2 } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function WeatherLocation() {
  const d = new Date();
  const slug = usePathname().replace("/", "");

  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [isWeatherDataLoading, setIsWeatherDataLoading] = useState(true);
  const [fetchRes, setFetchRes] = useState(true);

  useEffect(() => {
    const getWeather = async (slug: string) => {
      try {
        const res = await fetch(`/api?slug=${slug}`);
        const resJson = await res.json();
        setWeatherData(resJson);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setFetchRes(false)
      } finally {
        setIsWeatherDataLoading(false);
      }
    };
    getWeather(slug);
  }, [slug]);

  return (
    <>
      {isWeatherDataLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-5xl font-extrabold">{fetchRes ? "LOADING" : "Fetch failed try again later" }</h1>
        </div>
      ) : (
        <>
          <div className="p-8 pb-20">
            <h1 className="text-2xl font-bold text-center p-15">
              {`Current Location: ${weatherData?.resolvedAddress}`}
            </h1>
            <Grid2
              container
              direction={"row"}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {
                <Card variant="outlined" sx={{ borderRadius: 5 }}>
                  <h1 className="text-2xl font-semibold pt-5 pl-10">{`${d.getDate()}/${
                    d.getMonth() + 1
                  }/${d.getFullYear()}`}</h1>
                  <Box sx={{ padding: 5 }}>
                    <h3 className="">
                      Current temperature:{" "}
                      <span className="font-bold">
                        {weatherData?.currentConditions.temp + "F"}
                      </span>
                    </h3>
                    <h3>
                      Current condition:{" "}
                      <span className="font-bold">
                        {weatherData?.currentConditions.conditions}
                      </span>
                    </h3>
                    <p>
                      Todays outlook:{" "}
                      <span className="font-bold">
                        {weatherData?.description}
                      </span>
                    </p>
                  </Box>
                </Card>
              }
            </Grid2>

            <h1 className="text-2xl font-bold text-center p-15">Weekly Forecast</h1>
            <Box>
              <WeeklyForcast week={weatherData!.days} />
            </Box>
          </div>
        </>
      )}
    </>
  );
}
