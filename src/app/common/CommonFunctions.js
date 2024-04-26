import localStorageService from "app/services/localStorageService";
import moment from "moment";
import React from "react";

export function getTextWidth(text, fontSize) {
  let element = document.createElement("span");
  document.body.appendChild(element);

  element.style.height = "auto";
  element.style.width = "auto";
  element.style.position = "absolute";
  element.style.zIndex = "-999";
  element.style.whiteSpace = "no-wrap";
  if (fontSize) {
    element.style.fontSize = fontSize + "px";
  }
  element.innerHTML = text + "";

  const width = Math.ceil(element.clientWidth);
  document.body.removeChild(element);
  return width;
}

export const RequiredLabel = React.memo(() => {
  return (
    <span> (<span className="text-red">*</span>)</span>
  )
})

export function transformDate(castValue, originalValue) {
  // return (castValue && this.isType(castValue)) ? castValue : new Date(originalValue);
  return originalValue && moment(originalValue).isValid()
      ? new Date(originalValue)
      : originalValue;
};

//lấy quý theo tháng trong năm (month: 1->12)
export const getQuarterFromMonth = (month) => {
  return Math.ceil(month / 3)
}

//dùng cho các trường date trong formik (transform, typeError, maxDate, minDate)
//update 7/10/22: thêm tham số fieldName(không bắt buộcc) để truyền cảnh báo tên trường nào không đúng định dạng
export function dateYupTypeValidation(schema, field, fieldName) {
  const typeErrorText = fieldName ? `${fieldName} không đúng định dạng` : "Không đúng định dạng"
  return schema
      .transform(transformDate)
      .typeError(typeErrorText)
      .test(`${field}-min-year`, typeErrorText, function (value) {
          if (value && moment(value).isValid()) {
              if (new Date(value).getFullYear() < 1900) {
                  return false;
              }
          }
          return true;
      })
      .test(`${field}-max-year`, typeErrorText, function (value) {
          if (value && moment(value).isValid()) {
              if (new Date(value).getFullYear() > 2100) {
                  return false;
              }
          }
          return true;
      });
}

export function getDefaultStore() {
  const store = localStorageService.getCurrentStore() || null;
  const listStore = localStorageService.getListStore() || null;
  return { store, listStore }
}

export function getDate(value, format = "DD/MM/YYYY") {
 return value && moment(value).isValid() ? moment(value).format(format) : ""
}