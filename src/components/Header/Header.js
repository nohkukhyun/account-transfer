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

function Header({ history }) {
  const currentPage = () => {
    let page = window.location.pathname
    console.log(page)
    let names = ""
    if (page === "/") {
      names = "계좌입력"
    } else if (page === "/phone") {
      names = "전화인증"
    }
    return names
  }

  console.log("header", history)

  return (
    <HeaderWrap>
      <Title>{currentPage()}</Title>
    </HeaderWrap>
  )
}

export default Header
