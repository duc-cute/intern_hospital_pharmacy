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

const Surcharge = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={3} className='mb-16'>
        <GlobitsTextField name="surcharge" label="Phụ phí" />
      </Grid>

      <h4 className='m-0 py-4'>Danh sách phụ phí</h4>

      <div className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã phụ phí</TableCell>
              <TableCell>Mã BYT</TableCell>
              <TableCell>Tên BYT</TableCell>
              <TableCell>Mã hoạt chất</TableCell>
              <TableCell>Hoạt chất</TableCell>
              <TableCell>Giá nhập</TableCell>
              <TableCell>Giá bán</TableCell>
              <TableCell>Giá nhân dân</TableCell>
              <TableCell>Giá dịch vụ</TableCell>
              <TableCell>Giá BHYT</TableCell>
              <TableCell>Giá trần BHYT</TableCell>
              <TableCell>ACT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default memo(Surcharge)