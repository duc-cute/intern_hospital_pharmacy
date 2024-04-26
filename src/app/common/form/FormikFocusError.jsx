import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import lodash from 'lodash';
import { toast } from "react-toastify"

const FormikFocusError = ({ formId, showOther, setShowOther, errorsItem }) => {
  const { errors, isSubmitting, isValidating } = useFormikContext();
  useEffect(() => {
    if (isSubmitting && !isValidating) {
        let errText;
        let errKey;
        getLeaves(errors).every(item => {
          let currentError = lodash.get(errors, item)
          if (currentError) {
            errText = currentError
            errKey = item
            return false
          }
          return true
        })
        toast.warning(errText)
        const errorElement = getErrorElementById(errKey, formId);
        if (errorElement?.scrollIntoView) {
            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            if (errorElement?.focus) {
              errorElement.focus({ preventScroll: true });
            }
        }
    }
    if (showOther && !isValidating) {
      let errText;
      let errKey;
      getLeaves(errorsItem).every(item => {
        let currentError = lodash.get(errorsItem, item)
        if (currentError) {
          errText = currentError
          errKey = item
          return false
        }
        return true
      })
      toast.warning(errText)
      const errorElement = getErrorElementById(errKey, formId);
      if (errorElement?.scrollIntoView) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (errorElement?.focus) {
            errorElement.focus({ preventScroll: true });
          }
      }
      if(setShowOther){
        setShowOther(false);
      }
  }
  }, [errors, isSubmitting, isValidating, showOther]);

  return <></>;
};

function getErrorElementById(id, formId) {
  if (formId) {
    const form = document.getElementById(formId);
    if (form) {
      return form.querySelector(`[id='${id}']`)
    }
  }
  return document.getElementById(id);
}

export default FormikFocusError;

const getLeaves = function(tree) {
  const leaves = [];
  const walk = function(obj, path){
    path = path || "";
    for(let n in obj){
      if (obj.hasOwnProperty(n)) {
        if(typeof obj[n] === "object" || obj[n] instanceof Array) {
          if (Number.isInteger(parseInt(n))) {
            if (path === "") {
              walk(obj[n], "[" + n + "]");
            } else {
              walk(obj[n], path + "[" + n + "]");
            }
          } else {
            if (path === "") {
              walk(obj[n], n);
            } else {
              walk(obj[n], path + "." + n);
            }
          }
        }
        else {
          if (path === "") {
            leaves.push(n);
          } else {
            leaves.push(path + "." + n);
          }
        }
      }
    }
  }
  walk(tree);
  return leaves;
}
