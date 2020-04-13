import React from "react"
import styled from "styled-components"

const HeaderWrap = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #dbdbdb;
`

const Title = styled.h3`
  font-size: 16px;
  color: #333;
`

function Header() {
  return (
    <HeaderWrap>
      <Title>계좌입력</Title>
    </HeaderWrap>
  )
}

export default Header
