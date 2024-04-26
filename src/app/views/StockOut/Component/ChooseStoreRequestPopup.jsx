import { Grid } from '@material-ui/core'
import GlobitsPopup from 'app/common/GlobitsPopup'
import StoreRequestIndex from 'app/views/StoreRequestStore/StoreRequestIndex'
import React from 'react'

export default function ChooseStoreRequestPopup({ open, handleClose, handleChoose }) {

  return (
    <GlobitsPopup
      open={open}
      handleClose={handleClose}
      maxWidth='lg'
      titleHeader='Danh sách phiếu yêu cầu xuất kho'
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StoreRequestIndex isPopup handleChoose={handleChoose} />
        </Grid>
      </Grid>
    </GlobitsPopup>
  )
}
