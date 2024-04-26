import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Grid, Button, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import AddIcon from "@material-ui/icons/Add";
import CategoryItem from "../Component/CategoryItem";
import CategorySelectPopup from "../Component/CategorySelectPopup";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    background: "#E4f5fc",
    padding: "10px 15px",
    borderRadius: "5px",
  },
  groupContainer: {
    width: "100%",
    alignItems: 'center',
    "& .MuiOutlinedInput-root": {
      borderRadius: "0!important",
    },
  },
}));

export default observer(function CategoryTab() {
  const { t } = useTranslation();

  const classes = useStyles();

  const [openSelectCategory, setOpenSelectCategory] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { values, setFieldValue } = useFormikContext();

  return (
    <div style={{ padding: 8 }} >
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} >
          <Grid container className={classes.groupContainer}>
            <Grid item xs={6}>
              <h5 className="m-0">{t('Danh sách danh mục')}</h5>
            </Grid>
            <Grid item xs={6}>
              <Button
                className="mb-16 mr-16 btn btn-primary d-inline-flex"
                startIcon={<AddIcon />}
                variant="contained"
                style={{ float: 'right' }}
                onClick={() => {
                  setSelectedCategories(values?.categories || [])
                  setOpenSelectCategory(true);
                }}
              >
                {t("product.addCategory")}
              </Button>
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={12}>
          <CategoryItem listCategory={values?.categories || []} />
        </Grid>
        {openSelectCategory &&
          <CategorySelectPopup
            t={t}
            open={openSelectCategory}
            selectedCategories={selectedCategories}
            handleSelect={(selectedCategory) => {
              setFieldValue("categories", selectedCategory)
              setOpenSelectCategory(false);
            }}
            handleClose={() => setOpenSelectCategory(false)}
          />}
      </Grid>
    </div>
  );
});
