"use client";
import WeeklyForcast from "@/component/weekForcast";
import { WeatherData } from "@/dataTypes/weather";
import { Alert, Box, Button, Card, Grid2 } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WeatherLocation() {
  const d = new Date();
  const slug = usePathname().replace("/", "");

  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [isWeatherDataLoading, setIsWeatherDataLoading] = useState(true);
  const [fetchRes, setFetchRes] = useState(true);
  const [isDueToWrongCity, setIsDueToWrongCity] = useState(false);
  useEffect(() => {
    const getWeather = async (slug: string) => {
      try {
        const res = await fetch(`/api?slug=${slug}`);
        if (res.status == 200) {
          const resJson = await res.json();
          setWeatherData(resJson);
          setIsWeatherDataLoading(false);
        } else if (res.status == 400) {
          setIsDueToWrongCity(true);
          setFetchRes(false);
          setIsWeatherDataLoading(true);
        } else {
          setFetchRes(false);
          setIsWeatherDataLoading(true);
        }
      } catch (err) {
        console.error("Weather fetch error:", err);
        setFetchRes(false);
      }
    };
    getWeather(slug);
  }, [slug]);
  const router = useRouter();

  function goBack() {
    router.push(`/`);
  }
  return (
    <>
      {!fetchRes ? (
        <div className="flex items-center justify-center h-screen">
          {isDueToWrongCity ? (
            <Box>
              <Alert severity="error">
                Failed to fetch data due to wrong city.
              </Alert>
              <Button
                onClick={goBack}
                sx={{ flexDirection: "column", width: "100%" }}
              >
                Back
              </Button>
            </Box>
          ) : (
            <h1 className="text-5xl font-extrabold">
              Something went wrong try again later.
            </h1>
          )}
        </div>
      ) : isWeatherDataLoading ? (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-5xl font-extrabold">LOADING</h1>
        </div>
      ) : (
        <div className="p-8 pb-20">
          <h1 className="text-2xl font-bold text-center p-15">
            {`Current Location: ${weatherData?.resolvedAddress}`}
          </h1>

          <Grid2
            container
            direction="row"
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Card variant="outlined" sx={{ borderRadius: 5 }}>
              <h1 className="text-2xl font-semibold pt-5 pl-10">
                {`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`}
              </h1>
              <Box sx={{ padding: 5 }}>
                <h3>
                  Current temperature:
                  <span className="font-bold">
                    {` ${weatherData?.currentConditions.temp + "°F"}`}
                  </span>
                </h3>
                <h3>
                  Feels like:
                  <span className="font-bold">
                    {` ${weatherData?.currentConditions.feelslike + "°F"}`}
                  </span>
                </h3>
                <h3>
                  Current condition:
                  <span className="font-bold">
                    {` ${weatherData?.currentConditions.conditions}`}
                  </span>
                </h3>
                <p>
                  This week&apos;s outlook:
                  <span className="font-bold">{` ${weatherData?.description}`}</span>
                </p>
              </Box>
            </Card>
          </Grid2>

          <h1 className="text-2xl font-bold text-center p-15">
            Weekly Forecast
          </h1>
          <Box>
            <WeeklyForcast week={weatherData?.days || []} />
          </Box>
        </div>
      )}
      <div className="flex justify-center p-10">
        <Button className="w-[50vw]" onClick={goBack}>New city</Button>
      </div>
    </>
  );
}
