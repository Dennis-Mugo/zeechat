import React, { useContext, useState } from "react";
import "./Signup.css";
import Logo from "../../components/Logo/Logo";
import { Button, TextField } from "@mui/material";
import { CustomTextField, buttonStyle, textButton } from "../../config/styles";
import CustomColors from "../../config/colors";
import { HandymanOutlined } from "@mui/icons-material";
import { ChatteContext } from "../../config/context";
import { useNavigate } from "react-router-dom";

function Signup(props) {
    const navigate = useNavigate();
    const {setTempUser, tempUser} = useContext(ChatteContext);
  const [email, setEmail] = useState(tempUser?.email || "");
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
    setTempUser({
        email
    });
    navigate("/email-verify", {state: {from: "signup"}});
  }

  return (
    <div className="auth_container">
      <form className="auth_card" onSubmit={handleFormSubmit}>
        <Logo style={{ textAlign: "center", margin: "15px 0 30px" }} />
        <h3 className="auth_header">Sign up</h3>
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
          <Button style={{ ...textButton }} variant="text">
            Sign in
          </Button>
          <Button onClick={handleEmailSubmit} style={{ ...buttonStyle }} variant="contained">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
