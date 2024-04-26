import React, {memo} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    Icon,
    IconButton,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
} from "@material-ui/core";
import {FieldArray, useFormikContext} from "formik";
import GlobitsTextField from "app/common/form/GlobitsTextField";
import GlobitsPagingAutocomplete from "app/common/form/GlobitsPagingAutocomplete";
import {useTranslation} from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import {pagingStockKeepingUnits} from "../../StockKeepingUnit/StockKeepingUnitService";
import {useStore} from "app/stores";
import StockKeepingUnitForm from "app/views/StockKeepingUnit/StockKeepingUnitForm";
import {toast} from "react-toastify";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {pagingActiveIngredients} from "../../ActiveIngredient/ActiveIngredientService";

const checkDuplicate = (ingredients = [], value, index) => {
    const filtered = ingredients.filter((_, fIndex) => fIndex !== index);
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

function ProductIngredient() {
    const {t} = useTranslation();
    const classes = useStyles();
    const {values, setFieldValue} = useFormikContext();

    const [expanded, setExpanded] = React.useState(values?.ingredients?.length > 0 ? true : false);

    return (
        <Grid className={`${classes.root}`} container>
            <FieldArray
                name="ingredients"
                render={({remove, push}) => (
                    <div className={classes.groupContainer}>
                        <Accordion
                            className={classes.container}
                            expanded={expanded}
                            onChange={() => setExpanded(!expanded)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="productAtt-content"
                                id="productAtt-header"
                            >
                                <h4 className="m-0">Hoạt chất</h4>
                            </AccordionSummary>

                            <AccordionDetails className={classes.details}>
                                <div className={classes.tableContainer}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Hoạt chất</TableCell>
                                                <TableCell>Hàm lượng</TableCell>
                                                <TableCell>Đơn vị tính</TableCell>
                                                <TableCell style={{width: "10%", textAlign: "center"}}>
                                                    {t("general.action")}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {values?.ingredients?.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <GlobitsPagingAutocomplete
                                                            api={pagingActiveIngredients}
                                                            name={`ingredients[${index}].ingredient`}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <GlobitsTextField
                                                            variant="standard"
                                                            type="number"
                                                            name={`ingredients[${index}].content`}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <GlobitsPagingAutocomplete
                                                            variant="standard"
                                                            name={`ingredients[${index}].unit`}
                                                            api={pagingStockKeepingUnits}
                                                            endAdornment={<AddCategoryButton/>}
                                                            onChange={(_, value) => {
                                                                if (checkDuplicate(values?.ingredients, value, index)) {
                                                                    toast.warning("Đơn vị này đã có trong thuốc - vật tư y tế, xin vui lòng chọn đơn vị khác")
                                                                    setFieldValue(`ingredients[${index}].unit`, null);
                                                                } else {
                                                                    setFieldValue(`ingredients[${index}].unit`, value ? value : null);
                                                                }
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{textAlign: "center"}}>
                                                        <IconButton size="small" onClick={() => remove(index)}>
                                                            <Icon fontSize="small" color="error">
                                                                delete
                                                            </Icon>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}

                                            <TableRow>
                                                <TableCell colSpan={4}>
                                                    <Button
                                                        className="btn btn-primary d-inline-flex"
                                                        startIcon={<AddIcon/>}
                                                        variant="contained"
                                                        onClick={() =>
                                                            push({})
                                                        }
                                                    >
                                                        Thêm Hoạt chất
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

            <StockKeepingUnitForm/>
        </Grid>
    );
}

export default memo(ProductIngredient);

const AddCategoryButton = () => {
    const {handleOpenForm} = useStore().stockKeepingUnitStore;

    return (
        <div onClick={e => e.stopPropagation()}>
            <Tooltip title="Thêm đơn vị tính">
                <IconButton size="small" onClick={() => handleOpenForm()}>
                    <AddIcon color="primary" fontSize="medium"/>
                </IconButton>
            </Tooltip>
        </div>
    )
}