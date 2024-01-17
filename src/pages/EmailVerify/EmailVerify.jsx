import React, { useContext, useState } from "react";
import "./EmailVerify.css";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { ChatteContext } from "../../config/context";
import { Button, IconButton, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CustomTextField, buttonStyle } from "../../config/styles";
import EditIcon from "@mui/icons-material/Edit";
import CustomColors from "../../config/colors";
import { emailUrl } from "../../config/constants";

function EmailVerify(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tempUser, createUser, signinUser } = useContext(ChatteContext);
  const previousPage = location.state.from;
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [codeError, setCodeError] = useState("");

  const handleSendCode = async () => {
    if (sendCodeLoading) return;
    setSendCodeLoading(true);
    try {
      let res = await fetch(`${emailUrl}/sendmail/random_number/6`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "dennismugo2003@gmail.com",
          to: tempUser?.email,
          text: "Welcome to Zeechat.",
          subject: "Zeechat verification code",
          gpass: "djvl cnkd kcyu cmqh",
        }),
      });
      res = await res.json();
      setCode(res?.randomCode);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    setSendCodeLoading(false);
    setSent(true);
  };

  

  const handleCodeChange = (e) => {
    setCodeError("");
    let value = e.target.value;
    setUserCode(value);
  };

  const handleCodeFocus = () => {
    setCodeError("");
  };

  const handleCodeBlur = () => {
    if (!userCode.length) {
      setCodeError("Verification code is required!");
      return true;
    }
    return false;
  };

  const handleVerifyForm = async (e) => {
    e.preventDefault();
    await verifyCode();
  }

  const verifyCode = async () => {
    let error = handleCodeBlur();
    if (error || verifyLoading) return;
    if (userCode !== code) {
      setCodeError("Wrong verification code!");
      return;
    }
    setVerifyLoading(true);
    if (previousPage === "signup") {
      await createUser({
        email: tempUser?.email,
        dateCreated: Date.now().toString()
      });
    } else if (previousPage === "signin") {
      await signinUser();
    }
    navigate("/chat");
  };

  return (
    <div className="auth_container">
      <form className="auth_card" onSubmit={handleVerifyForm}>
        <Logo />
        <h3 className="auth_header">Verify your Email</h3>
        <p className="verify_text">
          To verify this email, a verification code will be sent to{" "}
        </p>
        <div className="flex_center" style={{ height: "40px" }}>
          <p className="email">{tempUser?.email}</p>
          {previousPage === "signup" ? (
            <Tooltip title="Edit email" placement="right">
              <IconButton
                sx={{ margin: "0 5px" }}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                <EditIcon sx={{ color: CustomColors.purple }} />
              </IconButton>
            </Tooltip>
          ) : (
            <></>
          )}
        </div>

        <LoadingButton
          variant="contained"
          loading={sendCodeLoading}
          onClick={handleSendCode}
          style={{
            ...buttonStyle,
            margin: "15px 0",
            width: "70%",
            height: "60px",
            borderRadius: "30px",
            backgroundColor: !sendCodeLoading
              ? CustomColors.purple
              : CustomColors.dark2,
            color: !sendCodeLoading ? CustomColors.pureWhite : CustomColors.transparent,
          }}
        >
          {sent ? "Resend Code" : "Send code"}
        </LoadingButton>
        {sent ? <>
        <p className="verify_text" style={{ margin: "15px 0" }}>
          A verification code has been sent to {tempUser?.email}. Enter the
          code below:
        </p>
        <CustomTextField
          value={userCode}
          type="number"
          onChange={handleCodeChange}
          onFocus={handleCodeFocus}
          onBlur={handleCodeBlur}
          error={!!codeError}
          helperText={codeError}
          label="Verification code"
          sx={{margin: "20px 0", width: "70%"}}
        />
        <LoadingButton
          variant="contained"
          loading={verifyLoading}
          onClick={verifyCode}
          style={{
            ...buttonStyle,
            margin: "15px 0",
            width: "70%",
            height: "60px",
            borderRadius: "30px",
            backgroundColor: !verifyLoading
              ? CustomColors.purple
              : CustomColors.dark2,
            color: !verifyLoading ? CustomColors.pureWhite : CustomColors.transparent,
          }}
        >
          Verify
        </LoadingButton>
        </> : <></>}
      </form>
    </div>
  );
}

export default EmailVerify;
