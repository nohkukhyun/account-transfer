import React, { useState, useEffect, useCallback } from "react";
import ApiCall from "../api/ApiCall";
import AccountInputComponent from "../components/accountInputcomponent/AccountInputComponent";

function AccountInput({ history }) {
  const [bankNum, setBankNum] = useState("");
  const [bankList, setBankList] = useState([]);
  const [keyCode, setKeyCode] = useState(0);
  const { getApi } = ApiCall();

  const handleChange = (e) => {
    let val = e.target.value;

    console.log(val);
    if (val.length < 13) {
      setBankNum(val);
    } else {
      return false;
    }
  };

  const handleNumChk = (e) => {
    let keyVal = e.keyCode;
    setKeyCode(keyVal);

    if (keyVal >= 48 && keyVal <= 57) {
      return true;
    } else {
      return false;
    }
  };

  const handleReset = () => {
    setBankNum("");
  };

  //get은행 리스트
  const getBankList = useCallback(async () => {
    const { location } = history;
    const data = await getApi(
      "https://fe-account-api.herokuapp.com/api/v1/account?no=102947384726"
    );
    setBankList(data);
    location.state = data;
    console.log("getBankList", { location });
  }, [getApi, history]);

  const goPhonePage = (name, code) => {
    console.log("gopage!!");
    if (bankNum && bankNum.length >= 12) {
      return history.push(`/phone/${name}/${code}/${bankNum}`);
    } else {
      return false;
    }
  };

  const { banks } = bankList;

  useEffect(() => {
    if (bankNum && bankNum.length >= 9) {
      getBankList();
    }
  }, [bankNum, getBankList, history]);

  useEffect(() => {
    const { location } = history;
    if (location.name === "/") {
      console.log({ history });
      getBankList();
    }
  }, [getBankList, history]);

  return (
    <AccountInputComponent
      banks={banks}
      bankNum={bankNum}
      goPhonePage={goPhonePage}
      handleNumChk={handleNumChk}
      handleReset={handleReset}
      handleChange={handleChange}
    />
  );
}

export default AccountInput;
