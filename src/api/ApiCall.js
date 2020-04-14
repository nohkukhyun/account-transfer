import { useCallback } from "react"
import axios from "axios"

const config = { headers: { "Access-Control-Allow-Origin": "*" } }

const ApiCall = () => {
  const getApi = useCallback(async (url) => {
    try {
      const res = await axios.get(url, config)
      console.log("res!!!!", res.data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }, [])

  const postApi = useCallback(async (url, data) => {
    try {
      const header = { headers: { "Content-Type": "application/json" } }
      const res = await axios.post(url, data, header)
      console.log("postApi", { res, data })
      return res.data
    } catch (error) {
      console.log(error)
    }
  }, [])

  return { getApi, postApi }
}

export default ApiCall
