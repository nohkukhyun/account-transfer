import React, { useState } from "react"
import styled from "styled-components"
import ApiCall from "../../api/ApiCall"

const PhoneWrap = styled.div`
  width: 100%;
  position: relative;
  height: calc(100% - 50px);
`

const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid #999;
  /* padding: 15px 0; */
  text-align: center;
  color: #333;
  position: relative;
  height: 50px;
  line-height: 50px;
`

const Back = styled.div`
  position: absolute;
  left: 15px;
  color: #333;
  cursor: pointer;
`

const PhoneWrapBody = styled.div`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`

const Title = styled.p`
  font-size: 13px;
  color: #666;
`

const FormInput = styled.input`
  border-radius: 5px;
  border: none;
  background-color: #fff;
  display: block;
  width: 100%;
  padding: 10px 0;
`

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
  border: 1px solid #666;
  margin-top: 40px;
`

function PhoneNumberInput({ history, match }) {
  const [tel, setTel] = useState(null)
  const [msg, setMsg] = useState("")
  const [verification, setVerification] = useState(null)
  const { getApi, postApi } = ApiCall()

  const handleChange = (e) => {
    let val = e.target.value
    setTel(val)
    if (val.length === "") {
      setMsg("전화번호를 입력해주세요")
    }
    if (val.length > 12) {
      return false
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
      setMsg("전화번호를 제대로 입력해주세요.")
    }

    console.log({ verificationData })
    if (verificationData.success) {
      setVerification(verificationData.verification)
    } else {
      alert("인증을 다시 해주세요.")
    }

    const getVeri = async () => {
      console.log("getVeri!!!")
      return await getApi(
        `https://fe-account-api.herokuapp.com/api/v1/verification?code=${verification}`
      )
    }

    return { getVeri }
  }

  // console.log("!!his", handleSubmit.getVeri)
  return (
    <PhoneWrap>
      <Header>
        <Back onClick={() => handleBack()}>{"<"}</Back>
        전화번호 인증
      </Header>
      <PhoneWrapBody>
        <div style={{ padding: "20px" }}>
          <Title>전화번호 입력</Title>
          <FormInput value={tel} onChange={handleChange} />
          <span
            style={{ color: "#c70039", textAlign: "center:", fontSize: "10px" }}
          >
            {msg}
          </span>
          {verification && (
            <div style={{ marginTop: "20px" }}>
              {verification && <FormInput value={verification} />}
            </div>
          )}
          <Button
            type="submit"
            onClick={() =>
              !verification ? handleSubmit() : handleSubmit.getVeri()
            }
          >
            {!verification ? "전화번호인증" : "인증하기"}
          </Button>
        </div>
      </PhoneWrapBody>
    </PhoneWrap>
  )
}

export default PhoneNumberInput
