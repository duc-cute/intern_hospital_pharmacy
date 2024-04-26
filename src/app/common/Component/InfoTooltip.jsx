import React from "react";
import { ClickAwayListener, Tooltip } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/InfoOutlined';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid green',
        boxShadow: theme.shadows[7]
    },
}))(Tooltip);

 const InfoTooltip = ({ title }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <HtmlTooltip
                title={title}
                placement="right"
                style={{ cursor: "pointer" }}
                onClose={() => setOpen(false)}
                open={open}
            >
                <InfoIcon
                    className="pl-8"
                    color="primary"
                    onClick={() => setOpen(true)}
                    onMouseEnter={() => setOpen(true)}
                />
            </HtmlTooltip>
        </ClickAwayListener>
    )
}

export default InfoTooltip;