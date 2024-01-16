import React, { useContext, useState } from "react";
import "./EmailVerify.css";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { ChatteContext } from "../../config/context";
import { Button, IconButton, Tooltip } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { buttonStyle } from "../../config/styles";
import EditIcon from "@mui/icons-material/Edit";
import CustomColors from "../../config/colors";

function EmailVerify(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tempUser } = useContext(ChatteContext);
  const previousPage = location.state.from;
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendCode = async () => {
    if (sendCodeLoading) return;
    setSendCodeLoading(true);
    let res = await fetch();
  }

  return (
    <div className="auth_container">
      <div className="auth_card">
        <Logo />
        <h3 className="auth_header">Verify your Email</h3>
        <p className="verify_text">
          To verify this email, a code will be sent to{" "}
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
          }}
        >
          {sent ? "Resend Code" : "Send code"}
        </LoadingButton>
      </div>
    </div>
  );
}

export default EmailVerify;
