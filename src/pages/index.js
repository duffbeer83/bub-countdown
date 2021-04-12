import React from "react"
import FlipClock from "../components/flipclock"

export default function Home() {
  return (
    <div>
      <header>
        <h1>Bub #2 Countdown</h1>
      </header>
      <FlipClock endTime={new Date("2021-05-26T11:00:00+10:00")} />
    </div>
  )
}
