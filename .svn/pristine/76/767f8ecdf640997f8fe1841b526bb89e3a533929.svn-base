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
} from "@material-ui/core";
import { useFormikContext, FieldArray } from "formik";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import { RequiredLabel } from "app/common/CommonFunctions";
import { pagingActiveIngredients } from "app/views/ActiveIngredient/ActiveIngredientService";

export default function ProductActiveIngredient() {
  const { values } = useFormikContext();
  const { t } = useTranslation();

  return (
    <FieldArray
      name="productActiveIngredientList"
      render={(arrayHelpers) => {
        return (
          <div>
            {/* <Grid container spacing={2}> */}
            {/* <Grid item xs={6}>
                <Button
                  className="ml-16 btn btn-primary d-inline-flex"
                  startIcon={<AddIcon />}
                  variant="contained"
                  style={{ float: "right" }}
                  onClick={() =>
                    arrayHelpers.push({
                      activeIngredient: null,
                      content: "",
                    })
                  }
                >
                  Thêm
                </Button>
              </Grid> */}
            {/* </Grid> */}

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <table className="w-100">
                  <thead>
                    <tr>
                      <th className="text-center" style={{ width: "40%" }}>{t("product.activeIngredient")}</th>
                      <th className="text-center" style={{ width: "40%" }}>{t("product.content")}</th>
                      <th style={{ width: "10%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {values?.productActiveIngredientList?.map((item, index) => (
                      <Row
                        key={index}
                        item={item}
                        index={index}
                        remove={arrayHelpers.remove}
                      />
                    ))}
                  </tbody>
                </table>
              </Grid>

              <Grid item xs={12}>
                <Button
                  className="text-primary d-inline-flex"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    arrayHelpers.push({
                      activeIngredient: null,
                      content: "",
                    })
                  }
                >
                  Thêm hoạt chất
                </Button>
              </Grid>
            </Grid>
            {/* <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2}>{t("product.activeIngredient")}</TableCell>
                    <TableCell colSpan={2}>{t("product.content")}</TableCell>
                    <TableCell style={{ width: "10%", textAlign: "center" }}>
                      {t("general.action")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                </TableBody>
              </Table> */}
          </div>
        )
      }}
    />
  );
}

const Row = ({ item, index, push, remove }) => {
  const { t } = useTranslation();
  return (
    <tr>
      <td className="p-4">
        <GlobitsPagingAutocomplete
          variant="standard"
          name={`productActiveIngredientList[${index}].activeIngredient`}
          api={pagingActiveIngredients}
          // label={t("product.activeIngredient")}
          // willShrink
        />
      </td>

      <td className="p-4">
        <GlobitsTextField
          variant="standard"
          name={`productActiveIngredientList[${index}].content`}
          // label={t("product.content")}
          // willShrink
        />
      </td>
      <td className="p-4">
        <div className="flex flex-center flex-middle">
          <IconButton
            size="small"
            onClick={() => remove(index)}
          >
            <Icon fontSize="small" color="error">
              delete
            </Icon>
          </IconButton>
        </div>
      </td>
    </tr>
  )
}
