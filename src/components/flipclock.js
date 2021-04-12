import React from "react"
import { useState, useEffect } from "react"
import Flipper from "./flipper"

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

const extractDigit = (digit, position) => {
  const digitStr = digit.toString()
  const idx = digitStr.length - position
  return idx >= 0 ? digitStr[idx] : 0
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
    <div className={"flipClock"}>
      <div className={"flipGroup"}>
        <h2>Days</h2>
        <div className={"flipUnit"}>
          <Flipper digit={extractDigit(days, 3)} />
          <Flipper digit={extractDigit(days, 2)} />
          <Flipper digit={extractDigit(days, 1)} />
        </div>
      </div>

      <div className={"flipGroup"}>
        <h2>Hours</h2>
        <div className={"flipUnit"}>
          <Flipper digit={extractDigit(hours, 2)} />
          <Flipper digit={extractDigit(hours, 1)} />
        </div>
      </div>

      <div className={"flipGroup"}>
        <h2>Minutes</h2>
        <div className={"flipUnit"}>
          <Flipper digit={extractDigit(minutes, 2)} />
          <Flipper digit={extractDigit(minutes, 1)} />
        </div>
      </div>

      <div className={"flipGroup"}>
        <h2>Seconds</h2>
        <div className={"flipUnit"}>
          <Flipper digit={extractDigit(seconds, 2)} />
          <Flipper digit={extractDigit(seconds, 1)} />
        </div>
      </div>
    </div>
  )
}
