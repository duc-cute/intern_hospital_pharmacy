import { ListGender } from "app/LocalConstants";
import localStorageService from "app/services/localStorageService";
import moment from "moment";

export const getGender = (value) => value ? ListGender.find(item => item.id === value)?.name : ""

export function getDate(value, format = "DD/MM/YYYY", formatCheck = "") {
    let date = null;
    if (Boolean(value)) {
        if (moment(value).isValid()) {
            date = new Date(value)
        } else if (formatCheck && moment(value, formatCheck).isValid()) {
            date = moment(value, formatCheck).toDate();
        }
    }

    return date ? moment(date).format(format) : ""
}

export function getDateTime(value, format = "DD/MM/YYYY HH:mm") {
    return value && moment(value).isValid() ? moment(value).format(format) : ""
}

export function getDefaultStore() {
    const store = localStorageService.getCurrentStore() || null;
    const listStore = localStorageService.getListStore() || null;
    return { store, listStore }
}

export function checkIsSameOrBefore(dateBefore, dateAfter, stringDate = "date") {
    if (dateBefore && dateAfter && moment(dateBefore).isValid() && moment(dateAfter).isValid()) {
        return moment(dateBefore).isSameOrBefore(moment(dateAfter), stringDate)
    }
    return true
}

export function checkIsBefore(dateBefore, dateAfter, stringDate = "D") {
    if (dateBefore && dateAfter && moment(dateBefore).isValid() && moment(dateAfter).isValid()) {
        return moment(dateBefore).isBefore(moment(dateAfter), stringDate)
    }
    return true
};

export function handleDownloadReportFile(file, fileName) {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
}

export function formatMoney(number, unit = "VND") {
    if (number !== 0 && !number) return '';

    if (isNaN(Number(number))) {
        return 'Invalid input';
    }

    return (Number(number).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ' + unit);
}

export const withNameSpace = (field, nameSpace) => nameSpace ? `${nameSpace}.${field}` : field;

export function startOfDay(date) {
    if (date?.setHours) {
        return date.setHours(0, 0, 0, 0)
    }
    return null;
}

export function endOfDay(date) {
    if (date?.setHours) {
        return date.setHours(23, 59, 59, 999)
    }
    return null
}

export function startOfWeek(date) {
    const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return startOfDay(new Date(date.setDate(diff)));
}

export function endOfWeek(date) {
    const last = (date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)) + 6; // last day is the first day + 6

    return endOfDay(new Date(date.setDate(last)));
}

/**
 * The function `startOfLastWeek` takes a date as input and returns the start of the last week relative
 * to that date.
 * @param date - The `date` parameter is a JavaScript `Date` object representing a specific date.
 * @returns the start of the last week relative to the given date.
 */
export function startOfLastWeek(date) {
    const dateOfLastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
    return startOfWeek(dateOfLastWeek);
}

/**
 * The function `endOfLastWeek` returns the end date of the last week relative to the given date.
 * @param date - The `date` parameter is a JavaScript `Date` object representing a specific date.
 * @returns the end of the last week based on the given date.
 */
export function endOfLastWeek(date) {
    const dateOfLastWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
    return endOfWeek(dateOfLastWeek);
}

export function formatPriceVND(price) {
    const formattedPrice = price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    return formattedPrice ?? "";
}

export const getDatesOfMonthTo = (date) => {
    const y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let arr = []
    while (moment(firstDay).isSameOrBefore(moment(date))) {
      arr.push(firstDay.getDate())
      firstDay = new Date(y, m, firstDay.getDate() + 1)
    }
    return arr;
  }
  