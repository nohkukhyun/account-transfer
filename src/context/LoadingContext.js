import { createContext } from "react"

const LoadingContext = createContext({
  status: false,
})

export default LoadingContext
