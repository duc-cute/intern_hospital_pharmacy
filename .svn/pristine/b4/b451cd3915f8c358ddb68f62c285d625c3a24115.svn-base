import { Paper } from "@material-ui/core";
import React from "react";
import Draggable from "react-draggable";

function PaperComponent(props) {
  const { "aria-labelledby" : id } = props;
  return (
    <Draggable
      handle={`#${id}`}
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper className="paper-container fullWidth" {...props} />
    </Draggable>
  );
}

export default PaperComponent;