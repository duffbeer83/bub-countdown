import React from "react"
import { useState, useEffect } from "react"

const zeroPad = unit => (unit <= 9 ? `0${unit}` : unit)

const breakdownDuration = diff => {
  const units = {
    // structure
    // year: 31536000,
    // month: 2592000,
    // week: 604800,
    days: 86400,
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

export default function FlipClock({ endTime }) {
  const [countdown, setCountdown] = useState(endTime - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(endTime - Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [endTime])

  const { days, hours, minutes, seconds } = breakdownDuration(countdown)
  return (
    <div>
      {[
        [days, `days`],
        [hours, `hours`],
        [minutes, `minutes`],
        [seconds, `seconds`],
      ].map(([value, label]) => (
        <div key={label}>
          <h3>{label}</h3>
          <h2>{zeroPad(value)}</h2>
        </div>
      ))}
    </div>
  )
}
