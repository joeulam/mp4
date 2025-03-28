
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")
  const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${slug}?key=${process.env.ACCOUNT_KEY}`)
  const weatherDataResponse = await weatherData.json()
  return Response.json(weatherDataResponse)
}
