import React from "react"
import { useEffect, useRef } from "react"

const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  )
}

const StaticCard = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  )
}

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

// function component
export default function Flipper({ digit }) {
  const previousDigit = usePrevious(digit)

  // determine if we have a new digit
  // todo:
  //  i don't really get the concept of the 2 animations,
  //  but this seems to trigger them correctly... guess it
  //  would be nice if it were just one that we could repeatedly
  //  execute whenever previous != current?
  const shuffle = digit % 2 === 0

  // shuffle digits
  const digit1 = shuffle ? previousDigit : digit
  const digit2 = !shuffle ? previousDigit : digit

  // shuffle animations
  const animation1 = shuffle ? "fold" : "unfold"
  const animation2 = !shuffle ? "fold" : "unfold"

  console.log({ digit, previousDigit, digit1, animation1, digit2, animation2 })

  return (
    <div className={"flipDigit"}>
      <StaticCard position={"upperCard"} digit={digit} />
      <StaticCard position={"lowerCard"} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  )
}
