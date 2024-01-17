import React, { useContext, useState } from "react";
import "./Signin.css";
import Logo from "../../components/Logo/Logo";
import { Button, TextField } from "@mui/material";
import { CustomTextField, buttonStyle, textButton } from "../../config/styles";
import CustomColors from "../../config/colors";
import { ChatteContext } from "../../config/context";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

function Signin(props) {
    const navigate = useNavigate();
    const {setTempUser, tempUser, checkEmailExists} = useContext(ChatteContext);
  const [email, setEmail] = useState(tempUser?.email || "");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmailError("");
    let value = e.target.value;
    setEmail(value);
  };

  const handleEmailBlur = () => {
    if (!email.length) {
      setEmailError("Email is required!");
      return true;
    }
    return false;
  };

  const handleEmailFocus = () => {
    setEmailError("");
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    await handleEmailSubmit();
  }

  const handleEmailSubmit = async () => {
    let errors = handleEmailBlur();
    if (errors) return;
    setSubmitLoading(true);
    let emailExists = await checkEmailExists(email.trim());
      if (!emailExists) {
        setEmailError("The account does not exist!");
        setSubmitLoading(false);
        return;
      }
    setTempUser(emailExists);
    navigate("/email-verify", {state: {from: "signin"}});
  }

  return (
    <div className="auth_container">
      <form className="auth_card" onSubmit={handleFormSubmit}>
        <Logo style={{ textAlign: "center", margin: "15px 0 30px" }} />
        <h3 className="auth_header">Sign in</h3>
        <p className="auth_subheader">Use your email</p>
        <CustomTextField
          value={email}
          type="email"
          onBlur={handleEmailBlur}
          onFocus={handleEmailFocus}
          onChange={handleEmailChange}
          autoComplete="false"
          label="Email"
          error={!!emailError}
            helperText={emailError}        
          inputProps={{style: {
            fontFamily: "Nunito",
            color: CustomColors.dark1
          }}}
        />
        <p className="powered_by">ZeeChat is powered by GPT</p>
        <div className="auth_footer">
          <Button style={{ ...textButton }} onClick={() => {navigate("/signup")}} variant="text">
            Create account
          </Button>
          <LoadingButton
          variant="contained"
          loading={submitLoading}
          onClick={handleEmailSubmit}
          style={{
            ...buttonStyle,
            
            backgroundColor: !submitLoading
              ? CustomColors.purple
              : CustomColors.dark2,
            color: !submitLoading ? CustomColors.pureWhite : CustomColors.transparent,
          }}
        >
          Next
        </LoadingButton>
        </div>
      </form>
    </div>
  );
}

export default Signin;
