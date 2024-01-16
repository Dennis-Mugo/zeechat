import { TextField, styled } from "@mui/material";
import CustomColors from "./colors";

export const buttonStyle = {
  textTransform: "none",
  fontFamily: "Nunito Sans",
  fontSize: "16px",
  backgroundColor: CustomColors.purple,
  color: CustomColors.pureWhite,
};

export const textButton = {
  textTransform: "none",
  fontFamily: "Nunito Sans",
  fontSize: "16px",
  color: CustomColors.purple,
};

export const CustomTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${CustomColors.purple};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${CustomColors.purple};
    }
  }
`;
