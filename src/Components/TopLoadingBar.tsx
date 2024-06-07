import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

const TopLoadingBar = () => {
  const ref = useRef<LoadingBarRef>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.complete()
        // ref.current.continuousStart(30, 2)
      }
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <LoadingBar
      color={"#7c3aed"}
      ref={ref}
      height={3}
      shadow={true}
      waitingTime={1500}
    />
  )
}

export default TopLoadingBar