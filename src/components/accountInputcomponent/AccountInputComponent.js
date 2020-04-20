import React, { useEffect, useContext } from "react"
import styled from "styled-components"
import LoadingContext from "../../context/LoadingContext"

const BankWrap = styled.div`
  width: 100%;
  position: relative;
`

const BankWrapBody = styled.div`
  padding: 20px;
  width: 100%;
`

const Title = styled.p`
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
  right: 25px;
  top: 128px;
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
      cursor: pointer;
    }
  }
`
const Header = styled.div`
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #666;
  border-bottom: 1px solid #999;
  padding: 15px 0;
`

function AccountInputComponent({
  bankNum,
  banks,
  handleChange,
  handleReset,
  goPhonePage,
}) {
  const loading = useContext(LoadingContext)

  const LoadingWrap = () => {
    if (banks && banks.length <= 0) {
      loading.status = true
    } else {
      loading.status = false
    }
  }

  useEffect(() => {})

  return banks && banks.length <= 0 ? (
    <div>Loading...</div>
  ) : (
    <BankWrap>
      <Header>계좌입력</Header>
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
                return (
                  <li key={i} onClick={() => goPhonePage(data.name, data.code)}>
                    {data.name}
                  </li>
                )
              })}
          </ul>
        </BankList>
      </BankWrapBody>
    </BankWrap>
  )
}

export default AccountInputComponent
