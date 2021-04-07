import React from "react"
import FlipClock from "../components/flipclock"

export default function Home() {
  return <FlipClock endTime={new Date(2021, 5, 26, 11, 0, 0, 0)} />
}
