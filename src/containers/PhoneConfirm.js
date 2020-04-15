import React, { useState } from "react";
import ApiCall from "../api/ApiCall";
import PhoneComponent from "../components/PhoneConfirmComponent";

function PhoneConfirm({ history, match }) {
  const [tel, setTel] = useState("");
  const [msg, setMsg] = useState("");
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getApi, postApi } = ApiCall();

  const handleChange = (e) => {
    let val = e.target.value;
    setTel(val);
    if (val.length === "") {
      setMsg("전화번호를 입력해주세요");
    }
    if (val.length > 12) {
      return false;
    }
  };

  const handleBack = () => {
    return history.push("/");
  };

  const handleSubmit = async () => {
    const { params } = match;
    let verificationData = {};

    if (tel && tel.length >= 10) {
      verificationData = await postApi(
        `https://fe-account-api.herokuapp.com/api/v1/account`,
        params
      );
    } else {
      setMsg("전화번호를 제대로 입력해주세요.");
    }

    console.log({ verificationData });
    if (verificationData.success) {
      setVerification(verificationData.verification);
    } else {
      alert("인증을 다시 해주세요.");
    }
  };

  const confirmNumber = async () => {
    console.log("succes confirmNumber", verification);
    console.log("Loading...");
    setLoading(true);
    const cData = await getApi(
      `https://fe-account-api.herokuapp.com/api/v1/verification?code=${verification}`
    );
    setLoading(false);
    console.log("cData", { cData });
    return cData;
  };
  return (
    <PhoneComponent
      handleChange={handleChange}
      handleBack={handleBack}
      handleSubmit={handleSubmit}
      confirmNumber={confirmNumber}
      tel={tel}
      msg={msg}
      loading={loading}
    />
  );
}

export default PhoneConfirm;
