import React from "react"
import FlipClock from "../components/flipclock"

export default function Home() {
  return <FlipClock endTime={new Date("2021-05-26T11:00:00+10:00")} />
}
