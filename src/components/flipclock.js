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

/* 
  updateTime() {
  // get new date
  const time = new Date()
  // set time units
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  // on hour chanage, update hours and shuffle state
  if (hours !== this.state.hours) {
    const hoursShuffle = !this.state.hoursShuffle
    this.setState({
      hours,
      hoursShuffle,
    })
  }
  // on minute chanage, update minutes and shuffle state
  if (minutes !== this.state.minutes) {
    const minutesShuffle = !this.state.minutesShuffle
    this.setState({
      minutes,
      minutesShuffle,
    })
  }
  // on second chanage, update seconds and shuffle state
  if (seconds !== this.state.seconds) {
    const secondsShuffle = !this.state.secondsShuffle
    this.setState({
      seconds,
      secondsShuffle,
    })
  }
}
*/

// todo: need to keep 'shuffle' state as well
// function component
const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  )
}

// function component
const StaticCard = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  )
}

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }) => {
  // assign digit values
  let currentDigit = digit
  //  let previousDigit = digit - 1 // todo: this is assuming count up... need to store as state...
  let previousDigit = digit + 1 // todo: this is assuming count up... need to store as state...

  // to prevent a negative value
  if (unit !== "hours") {
    previousDigit = previousDigit === -1 ? 59 : previousDigit
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit
  }

  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`
  }

  // shuffle digits
  const digit1 = shuffle ? previousDigit : currentDigit
  const digit2 = !shuffle ? previousDigit : currentDigit

  // shuffle animations
  const animation1 = shuffle ? "fold" : "unfold"
  const animation2 = !shuffle ? "fold" : "unfold"

  return (
    <div className={"flipUnitContainer"}>
      <StaticCard position={"upperCard"} digit={currentDigit} />
      <StaticCard position={"lowerCard"} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  )
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
  const secondsShuffle = seconds % 2 == 0 ? true : false
  const minutesShuffle = secondsShuffle
  const hoursShuffle = secondsShuffle
  const daysShuffle = secondsShuffle

  /*  return (
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
*/

  // todo: make flipunit a component
  // todo: have it remember its previous state and animate approriately
  // todo: breakdown values so 1 flip per digit...

  return (
    <div className={"flipClock"}>
      <FlipUnitContainer unit={"days"} digit={days} shuffle={daysShuffle} />
      <FlipUnitContainer unit={"hours"} digit={hours} shuffle={hoursShuffle} />
      <FlipUnitContainer
        unit={"minutes"}
        digit={minutes}
        shuffle={minutesShuffle}
      />
      <FlipUnitContainer
        unit={"seconds"}
        digit={seconds}
        shuffle={secondsShuffle}
      />
    </div>
  )
}
/*
// class component
class FlipClock extends React.Component {
  updateTime() {
    // get new date
    const time = new Date()
    // set time units
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    // on hour chanage, update hours and shuffle state
    if (hours !== this.state.hours) {
      const hoursShuffle = !this.state.hoursShuffle
      this.setState({
        hours,
        hoursShuffle,
      })
    }
    // on minute chanage, update minutes and shuffle state
    if (minutes !== this.state.minutes) {
      const minutesShuffle = !this.state.minutesShuffle
      this.setState({
        minutes,
        minutesShuffle,
      })
    }
    // on second chanage, update seconds and shuffle state
    if (seconds !== this.state.seconds) {
      const secondsShuffle = !this.state.secondsShuffle
      this.setState({
        seconds,
        secondsShuffle,
      })
    }
  }

  render() {
    // state object destructuring
    const {
      hours,
      minutes,
      seconds,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle,
    } = this.state

    return (

    )
  }
}

// function component
const Header = () => {
  return (
    <header>
      <h1>React Flip Clock</h1>
    </header>
  )
}

// function component
const App = () => {
  return (
    <div>
      <Header />
      <FlipClock />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))
*/
