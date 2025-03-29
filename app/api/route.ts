
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")
  const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${slug}?key=${process.env.ACCOUNT_KEY}`)
  if (weatherData.status == 200){
    const weatherDataResponse = await weatherData.json()
    return Response.json(weatherDataResponse)
  }
  else if (weatherData.status == 400){
    return Response.json({message: "No such city"}, {status: 400})
  }
  else{
    return Response.json({message: "Internal server error"}, {status: 500})

  }

}
