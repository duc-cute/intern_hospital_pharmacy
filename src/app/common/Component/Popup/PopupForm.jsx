import React, { memo } from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, IconButton, Icon } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import FormikFocusError from "app/common/form/FormikFocusError";

function PopupForm({
    title,
    open = false,
    size = 'md',
    children,
    handleClose,
    action,
    formik,
    classNameForm = "",
    hideFooter,
    scroll = "body",
    disableSubmit = false,
    id = "draggable-dialog-title",
    classNameAction = ""
}) {
    const { t } = useTranslation();

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth={size}
            className="popup-container"
            scroll={scroll}
        >
            <Formik {...formik}>
                {(form) => (
                    <Form id={id} className={classNameForm}>
                        <FormikFocusError formId={id} />

                        <DialogTitle className="dialog-header bgc-primary-d1">
                            <span className="header-title text-white">{title}</span>
                        </DialogTitle>

                        <IconButton
                            style={{ position: "absolute", right: "6px", top: !!title ? "6px" : "-2px" }}
                            onClick={handleClose}
                        >
                            <Icon title={t("general.close")} style={{ color: "#fff" }}>
                                close
                            </Icon>
                        </IconButton>

                        <DialogContent
                            dividers={scroll === "paper"}
                            className={`content ${scroll === "body" ? "" : 'popup-content'}`}
                        >
                            {typeof children === 'function' ? children(form) : children}
                        </DialogContent>

                        {
                            !hideFooter && (
                                <DialogActions className={`action-popup-form ${classNameAction}`}>
                                    {action ? (
                                        typeof action === 'function' ? action(form) : action
                                    ) : (
                                        <>
                                            <Button
                                                className="btn-orange mr-2"
                                                type="submit"
                                                disabled={Boolean(form.isSubmitting) || Boolean(disableSubmit)}
                                                startIcon={<SaveIcon />}
                                            >

                                                Lưu
                                            </Button>
                                            <Button
                                                className="btn-gray"
                                                onClick={handleClose}
                                                disabled={Boolean(form.isSubmitting)}
                                                startIcon={<BlockIcon />}
                                            >
                                                Hủy
                                            </Button>

                                        </>
                                    )}
                                </DialogActions>
                            )
                        }
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

export default memo(PopupForm);