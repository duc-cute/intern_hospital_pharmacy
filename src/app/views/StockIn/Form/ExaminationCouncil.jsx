import React, { memo } from 'react'
import {
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import GlobitsTextField from 'app/common/form/GlobitsTextField';
import GlobitsDateTimePicker from 'app/common/form/GlobitsDateTimePicker';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    background: "#E4f5fc",
    padding: "10px 15px",
    borderRadius: "5px",
  },
  tableContainer: {
    background: "#fafafa",
    padding: "8px",
    borderRadius: "12px",
    maxHeight: "50vh",
    minHeight: "20vh",
    overflowY: "auto",
  },
}));

const ExaminationCouncil = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className='mb-16'>
        <Grid item xs={3}>
          <GlobitsTextField name="name" label="Chọn HĐKN" />
        </Grid>

        <Grid item xs={3}>
          <GlobitsDateTimePicker name="name" label="Ngày lập" />
        </Grid>
      </Grid>


      <h4 className='m-0 py-4'>Danh sách hội đồng kiểm nhập</h4>
      <div className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Chức danh</TableCell>
              <TableCell>Họ tên</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default memo(ExaminationCouncil)