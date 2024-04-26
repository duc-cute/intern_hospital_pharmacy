import { Button } from "@material-ui/core";
import React from "react";
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChooseStoreRequestPopup from "./ChooseStoreRequestPopup";
import { useHistory, useLocation } from "react-router-dom";

export default function ChooseStoreRequestButton() {
  const history = useHistory();
  const location = useLocation();
  const [openPopup, setOpenPopup] = React.useState(false);
  const handleChoose = (rowData) => {
    setOpenPopup(false);
    const params = new URLSearchParams(window.location.search);
    const storeRequestId = params.get('storeRequestId');
    const newParams = new URLSearchParams({"storeRequestId": rowData?.id});

    if (storeRequestId === rowData?.id) {
      params.delete("storeRequestId")
      history.push({ pathname: location.pathname, search: params.toString() }); 
      setTimeout(() => history.push({ pathname: location.pathname, search: newParams.toString() }), 100)
    } else {
      history.push({ pathname: location.pathname, search: newParams.toString() })
    }
  }
  return (
    <>
      <Button
        startIcon={<AssignmentIcon />}
        className="btn btn-danger d-inline-flex"
        type="button"
        onClick={() => setOpenPopup(true)}
      >
        Chọn yêu cầu xuất kho
      </Button>
      {openPopup && 
        <ChooseStoreRequestPopup 
          open={openPopup}
          handleClose={() => setOpenPopup(false)}
          handleChoose={handleChoose}
        />
      }
    </>
  );
}
