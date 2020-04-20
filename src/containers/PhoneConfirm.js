import React, { useState, useContext } from "react"
import ApiCall from "../api/ApiCall"
import PhoneComponent from "../components/PhoneConfirmComponent"
import LoadingContext from "../context/LoadingContext"

function PhoneConfirm({ history, match }) {
  const [tel, setTel] = useState("")
  const [error, setError] = useState("")
  const [code, setCode] = useState(null)
  const [cnt, setCnt] = useState(1)

  const { getApi, postApi } = ApiCall()

  const loadingCtx = useContext(LoadingContext)

  const handleChange = (e) => {
    let val = e.target.value
    let name = e.target.name
    if (name === "phone") {
      setTel(val)
    } else if (name === "code") {
      setCode(val)
    }
    if (val.length === "") {
      setError("전화번호를 입력해주세요")
    }
  }

  const handleBack = () => {
    return history.push("/")
  }

  const handleSubmit = async () => {
    const { params } = match
    let verificationData = {}

    if (tel && tel.length >= 10) {
      verificationData = await postApi(
        `https://fe-account-api.herokuapp.com/api/v1/account`,
        params
      )
    } else {
      setError("전화번호를 제대로 입력해주세요.")
    }

    console.log({ verificationData })
    if (verificationData.success) {
      setCode(verificationData.verification)
    } else {
      alert("인증을 다시 해주세요.")
    }
  }

  const confirmNumber = async () => {
    loadingCtx.status = true
    console.log("code!!!", { code })
    const cData = await getApi(
      `https://fe-account-api.herokuapp.com/api/v1/verification?code=${code}`
    )
    console.log("cData!!", { cData })
    let pp = 1
    if (cData.success) {
      return history.push("/success")
    } else if (!cData.success) {
      setCnt((pp += cnt))
      setError(cData.message)
      console.log({ cnt, pp })
      if (cnt === 3) {
        return history.push("/")
      }
    }
    loadingCtx.status = false
  }

  return (
    <PhoneComponent
      handleChange={handleChange}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      confirmNumber={confirmNumber}
      code={code}
      tel={tel}
      error={error}
      // loading={loading}
      loadingCtx={loadingCtx}
    />
  )
}

export default PhoneConfirm
