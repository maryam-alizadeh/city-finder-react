import { useState, useEffect } from 'react'

export function useWeather() {
  const [city, setCity] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const API_KEY = 'da4ac487bdb3c3714b74b415aaef879b'

  useEffect(() => {
    if (!city) return
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&appid=${API_KEY}&units=metric`
        )
        const json = await res.json()
        json.cod === 200 ? setData(json) : setError('City not found')
      } catch {
        setError('Error fetching data')
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
  }, [city])

  return { city, setCity, data, loading, error }
}
