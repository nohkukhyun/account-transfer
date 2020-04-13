import React, { useState, useEffect, useCallback } from "react"
import ApiCall from "../../api/ApiCall"
import styled from "styled-components"

const BankWrapBody = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;
`

const Title = styled.h5`
  font-size: 13px;
  color: #333;
`

const ControlInput = styled.input`
  border: 1px solid #efefef;
  background-color: #fff;
  border-radius: 5px;
  width: 90%;
  padding: 10px 0;
  position: relative;
`

const Svg = styled.svg`
  position: absolute;
  right: 70px;
  top: 90px;
`

const BankList = styled.div`
  width: 100%;
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    li {
      list-style: none;
      width: auto;
      border: 1px solid #333;
      border-radius: 10px;
      padding: 10px;
      margin: 10px;
    }
  }
`

function BankNumberInput() {
  const [bankNum, setBankNum] = useState(null)
  const [bankList, setBankList] = useState([])
  const [keyCode, setKeyCode] = useState(0)
  const { getApi } = ApiCall()

  const handleChange = (e) => {
    let val = e.target.value

    // console.log(keyCode, e)
    if (val.length < 13) {
      setBankNum(val)
    } else {
      return false
    }
  }

  const handleNumChk = (e) => {
    let keyVal = e.keyCode
    setKeyCode(keyVal)

    if (keyVal >= 48 && keyVal <= 57) {
      return true
    } else {
      return false
    }
  }

  const handleReset = () => {
    setBankNum("")
  }

  const getBankList = useCallback(async () => {
    const data = await getApi(
      "https://fe-account-api.herokuapp.com/api/v1/account?no=102947384726"
    )
    setBankList(data)
  }, [getApi])

  useEffect(() => {
    if (bankNum && bankNum.length >= 9) {
      getBankList()
    }
  }, [bankNum, getBankList])

  console.log({ bankList })

  const { banks } = bankList
  return (
    <BankWrapBody>
      <Title>계좌번호 입력</Title>
      <ControlInput
        value={bankNum}
        autoFocus
        onChange={(e) => handleChange(e)}
      />
      {bankNum && bankNum.length >= 2 && (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          onClick={() => handleReset()}
        >
          <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
        </Svg>
      )}
      <BankList>
        <Title>은행선택</Title>
        <ul>
          {banks &&
            banks.map((data, i) => {
              return <li key={i}>{data.name}</li>
            })}
        </ul>
      </BankList>
    </BankWrapBody>
  )
}

export default BankNumberInput
