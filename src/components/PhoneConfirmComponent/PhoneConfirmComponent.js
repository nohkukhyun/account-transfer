import React from "react";
import styled from "styled-components";

const PhoneWrap = styled.div`
  width: 100%;
  position: relative;
  height: calc(100% - 50px);
`;

const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid #999;
  /* padding: 15px 0; */
  text-align: center;
  color: #333;
  position: relative;
  height: 50px;
  line-height: 50px;
`;

const Back = styled.div`
  position: absolute;
  left: 15px;
  color: #333;
  cursor: pointer;
`;

const PhoneWrapBody = styled.div`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const Title = styled.p`
  font-size: 13px;
  color: #666;
`;

const FormInput = styled.input`
  border-radius: 5px;
  border: none;
  background-color: #fff;
  display: block;
  width: 100%;
  padding: 10px 0;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
  border: 1px solid #666;
  margin-top: 40px;
  &.loading {
    border: 1px solid red;
  }
`;

function PhoneConfirmComponent({
  handleBack,
  handleChange,
  tel,
  msg,
  verification,
  handleSubmit,
  confirmNumber,
  loading,
}) {
  console.log({ verification });
  return (
    <PhoneWrap>
      <Header>
        <Back onClick={() => handleBack()}>{"<"}</Back>
        전화번호 인증
      </Header>
      <PhoneWrapBody>
        <div style={{ padding: "20px" }}>
          <Title>전화번호 입력</Title>
          <FormInput value={tel} onChange={handleChange} name="phone" />
          <span
            style={{ color: "#c70039", textAlign: "center:", fontSize: "10px" }}
          >
            {msg}
          </span>
          {verification && (
            <div style={{ marginTop: "20px" }}>
              {verification && (
                <FormInput
                  value={verification}
                  onChange={handleChange}
                  name="code"
                />
              )}
            </div>
          )}
          <Button
            type="submit"
            onClick={() => (!verification ? handleSubmit() : confirmNumber())}
            className={loading && "loading"}
          >
            {!verification ? "전화번호인증" : "인증하기"}
          </Button>
        </div>
      </PhoneWrapBody>
    </PhoneWrap>
  );
}

export default PhoneConfirmComponent;
