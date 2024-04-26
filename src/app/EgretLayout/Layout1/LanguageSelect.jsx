import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  languageLabel: {
    color: "#000",
    fontSize: "0.8rem"
  },
  languageSelect: {
    color: "#000",
    fontSize: "0.8rem",
    "&::before": {
      borderBottom: "1px solid #000",
    },
    "& > svg": {
      color: "#000",
    },
    "& > div": {
      padding: "4px 0 3px"
    }
  }
});

class LanguageSelect extends React.Component {
  state = {
    selected: "vi",
    hasError: false,
  };

  handleChange(value) {
    //alert(t('description.part1'));
    // const { i18n } = this.props;
    // i18n.changeLanguage(value);
    this.setState({ selected: value });
  }
  render() {
    const { t, classes } = this.props;
    const { selected, hasError } = this.state;
    // let language= 'vi';
    // const changeLanguage = lng => {
    //   i18n.changeLanguage(lng);
    // };
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl} error={hasError}>
          <InputLabel className={classes.languageLabel} htmlFor="name">
            {t("general.language")}
          </InputLabel>
          <Select
            name="name"
            className={classes.languageSelect}
            value={selected}
            onChange={(event) => this.handleChange(event.target.value)}
            input={<Input id="name" />}
          >
            <MenuItem value="vi">Tiếng Việt</MenuItem>
            {/* <MenuItem value="de">Deutsch</MenuItem> */}
            <MenuItem value="en">English</MenuItem>
          </Select>
          {hasError && <FormHelperText>This is required!</FormHelperText>}
        </FormControl>
      </form>
    );
  }
}

LanguageSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LanguageSelect);
