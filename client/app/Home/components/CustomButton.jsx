import { Button } from "@mui/material";
import React from "react";
// import { fontStyle } from '../../'
import { fontStyle, fontStyle1 } from "../../utils/constants";

const CustomButton = ({ children, orange, stlyes, bold, isLarge }) => {
  return (
    <Button
      variant={"contained"}
      sx={{
        padding: isLarge ? ".9em 1.8em" : "",
        bgcolor: orange ? "#FBB12F" : "#201E1E",
        borderRadius: 10,
        fontSize: { xs: "10px", md: "13px" },
        textTransform: "none",
        fontWeight: bold ? 600 : 300,
        color: orange ? "#080F12" : "#fff",
        fontFamily: fontStyle,
        whiteSpace: "nowrap",
        gap: ".7em",
        ...stlyes,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
