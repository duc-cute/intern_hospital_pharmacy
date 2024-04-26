import React from "react";
import {
  Grid,
  Button,
  IconButton,
  Icon,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  AccordionSummary,
  Accordion,
  AccordionDetails,
} from "@material-ui/core";
import { useFormikContext, FieldArray } from "formik";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import { pagingStockKeepingUnits } from "../../StockKeepingUnit/StockKeepingUnitService";
import GlobitsCheckBox from "app/common/form/GlobitsCheckBox";
import GlobitsVNDCurrencyInput from "../../../common/form/GlobitsVNDCurrencyInput";
import { useStore } from "app/stores";
import StockKeepingUnitForm from "app/views/StockKeepingUnit/StockKeepingUnitForm";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { memo } from "react";

const checkDuplicate = (skus = [], value, index) => {
  const filtered = skus.filter((_, fIndex) => fIndex !== index);
  if (filtered.find(f => f?.sku?.id === value?.id)) {
    return true;
  }
  return false;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px 0",
    background: "#E4f5fc",
    padding: "10px 15px",
    borderRadius: "5px",
  },
  groupContainer: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "0!important",
    },
  },
  tableContainer: {
    background: "#fafafa",
    padding: "8px",
    // marginTop: "16px",
    borderRadius: "12px",
    // minHeight: "30vh",
    overflowY: "auto",
    "& tr, th, td": {
      border: 'none !important'
    }
  },
  tableHeader: {
    width: "100%",
    borderBottom: "1px solid #E3F2FD",
    marginBottom: "8px",
    "& th": {
      width: "calc(100vw / 4)",
    },
  },
  container: {
    background: 'unset',
    boxShadow: 'unset',
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: 'unset',
      "& .MuiAccordionSummary-content.Mui-expanded": {
        margin: 0,
      }
    }
  },
  details: {
    padding: 0,
  }
}));

function ProductSku() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext();

  const [expanded, setExpanded] = React.useState(values?.skus?.length > 0 ? true : false);

  return (
    <Grid className={`${classes.root}`} container>
      <FieldArray
        name="skus"
        render={({ remove, push }) => (
          <div className={classes.groupContainer}>
            <Accordion
              className={classes.container}
              expanded={expanded}
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="productAtt-content"
                id="productAtt-header"
              >
                <h4 className="m-0">Đơn vị tính</h4>
              </AccordionSummary>

              <AccordionDetails className={classes.details}>
                <div className={classes.tableContainer}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{t("product.isDefault")}</TableCell>
                        <TableCell colSpan={2}>{t("product.sku")}</TableCell>
                        <TableCell colSpan={2}>{t("product.coefficient")}</TableCell>
                        <TableCell colSpan={2}>Đơn giá</TableCell>
                        <TableCell style={{ width: "10%", textAlign: "center" }}>
                          {t("general.action")}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values?.skus?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <GlobitsCheckBox
                              name={`skus[${index}].isDefault`}
                              onChange={(e) => {
                                values.skus.forEach((_, fIndex) => {
                                  setFieldValue(`skus[${fIndex}].isDefault`, false)
                                })
                                setFieldValue(`skus[${index}].isDefault`, true)
                              }}
                            />
                          </TableCell>

                          <TableCell colSpan={2}>
                            <GlobitsPagingAutocomplete
                              variant="standard"
                              name={`skus[${index}].sku`}
                              api={pagingStockKeepingUnits}
                              endAdornment={<AddCategoryButton />}
                              onChange={(_, value) => {
                                if (checkDuplicate(values?.skus, value, index)) {
                                  toast.warning("Đơn vị này đã có trong thuốc - vật tư y tế, xin vui lòng chọn đơn vị khác")
                                  setFieldValue(`skus[${index}].sku`, null);
                                } else {
                                  setFieldValue(`skus[${index}].sku`, value ? value : null);
                                }
                              }}
                            />
                          </TableCell>

                          <TableCell colSpan={2}>
                            <GlobitsTextField
                              variant="standard"
                              type="number"
                              name={`skus[${index}].coefficient`}
                            />
                          </TableCell>

                          <TableCell colSpan={2}>
                            <GlobitsVNDCurrencyInput notDefault fullWidth={false} name={`skus[${index}].price`} />
                          </TableCell>
                          <TableCell style={{ textAlign: "center" }}>
                            <IconButton size="small" onClick={() => remove(index)}>
                              <Icon fontSize="small" color="error">
                                delete
                              </Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell colSpan={7}>
                          <Button
                            className="btn btn-primary d-inline-flex"
                            startIcon={<AddIcon />}
                            variant="contained"
                            onClick={() =>
                              push({
                                sku: null,
                                isDefault: null,
                                coefficient: "",
                              })
                            }
                          >
                            Thêm đơn vị
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      />

      <StockKeepingUnitForm />
    </Grid>
  );
}

export default memo(ProductSku);

const AddCategoryButton = () => {
  const { handleOpenForm } = useStore().stockKeepingUnitStore;

  return (
    <div onClick={e => e.stopPropagation()}>
      <Tooltip title="Thêm đơn vị tính">
        <IconButton size="small" onClick={() => handleOpenForm()}>
          <AddIcon color="primary" fontSize="medium" />
        </IconButton>
      </Tooltip>
    </div>
  )
}