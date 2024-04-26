import React from "react";
import {
  FormControl,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useTranslation } from "react-i18next";
import "./SearchBox.scss";

export default function GlobitsSearchInput(props) {
  const { t } = useTranslation();

  const [keyword, setKeyword] = React.useState("");

  const { search, setSearchObject, handleChange, className, ...otherProps } = props;

  const handleKeyDownEnterSearch = (event) => {
    if (event.key === "Enter") {
      if (setSearchObject) {
        setSearchObject({ keyword })
      }
      props.search({ keyword });
    }
  };

  return (
    <FormControl fullWidth>
      <div className={`search-box ${className}`}>
        <input
          {...otherProps}
          onChange={handleChange ? handleChange : (event) => setKeyword(event.target.value)}
          onKeyPress={handleKeyDownEnterSearch}
          placeholder={t("general.enter_search")}
        />
        <button
          className="btn btn-search"
          onClick={() => {
            if (setSearchObject) {
              setSearchObject({ keyword })
            }
            search({ keyword });
          }}
        >
          <SearchIcon
            style={{
              position: "absolute",
              top: "4px",
              right: "3px",
            }}
          />
        </button>
      </div>
    </FormControl>
  );
}
