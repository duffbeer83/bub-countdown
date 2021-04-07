import React from "react"
import { useState, useEffect } from "react"

const zeroPad = unit => (unit <= 9 ? `0${unit}` : unit)

const getUnits = diff => {
  const units = {
    // structure
    // year: 31536000,
    // month: 2592000,
    // week: 604800, // uncomment row to ignore
    days: 86400, // feel free to add your own row
    hours: 3600,
    minutes: 60,
    seconds: 1,
  }

  let seconds = diff / 1000

  return Object.keys(units).reduce((collection, key) => {
    collection[key] = Math.floor(seconds / units[key])
    seconds -= collection[key] * units[key]
    return collection
  }, {})
}

export const useCountdown = (endTime, startTime) => {
  const [diff, setDiff] = useState(endTime - startTime)
  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(endTime - Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  return getUnits(diff <= 0 ? 0 : diff)
}

export default function FlipClock({
  endTime,
  startTime = Date.now(),
  ...rest
}) {
  const { days, hours, minutes, seconds } = useCountdown(endTime, startTime)
  return (
    <div>
      {[
        [days, `days`],
        [hours, `hours`],
        [minutes, `minutes`],
        [seconds, `seconds`],
      ].map(([value, label]) => (
        <div>
          <h2>{zeroPad(value)}</h2>
          <h3>{label}</h3>
        </div>
      ))}
    </div>
  )
}
