import React, { useState } from "react";
import { useFormikContext } from "formik";
import {
  Grid,
  IconButton,
  Tooltip,
  makeStyles
} from "@material-ui/core";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import { downloadFile, uploadFile } from "../ProductService";
import { useEffect } from "react";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import defaultImg from "../img/default.jpg";

const useStyles = makeStyles((theme) => ({
  img: {
    border: "1px dashed #ccc",
    marginRight: 16,
    objectFit: "contain",
    "&:hover": {
      borderColor: "#999",
      cursor: "pointer"
    }
  },
  imgWrapper: {
    position: 'relative'
  },
  delete: {
    position: 'absolute',
    top: "-14px",
    right: 2,
    zIndex: 1400,
    background: "#fff !important"
  },
  pin: {
    position: 'absolute',
    bottom: "14px",
    left: 14,
    zIndex: 1400,
    "&:hover": {
      background: "#cccccccc"
    }
  }
}));

const ImageActions = ({ setDefault, deleteImage }) => {
  const classes = useStyles();
  const [confirmDelete, setConfirmDelete] = React.useState(false);


  return (
    <>
      {confirmDelete &&
        <GlobitsConfirmationDialog
          open={confirmDelete}
          title="Xóa ảnh"
          text="Bạn có muốn xóa ảnh này không?"
          agree="Đồng ý"
          cancel="Bỏ qua"
          onYesClick={() => {
            deleteImage()
            setConfirmDelete(false)
          }}
          onConfirmDialogClose={() => setConfirmDelete(false)}
        />
      }
      <Tooltip title="Xóa ảnh">
        <IconButton size="small" className={classes.delete} onClick={() => setConfirmDelete(true)}>
          <IndeterminateCheckBoxIcon color="error" size="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Ghim ảnh đại diện thuốc - vật tư y tế">
        <IconButton size="small" className={classes.pin} onClick={setDefault}>
          <ShoppingCartRoundedIcon color={"inherit"} size="small" style={{ color: "#000" }} />
        </IconButton>
      </Tooltip>
    </>
  )
}

const checkIsAnyDefault = (images = []) => {
  return images?.some(f => f?.default)
}

const ImagePreview = ({
  name,
  setImageValue,
  imgDescriptionId,
  isDefault,
  setDefault,
  deleteImage
}) => {
  const classes = useStyles();
  const { values } = useFormikContext();

  const [imgSrc, setImgSrc] = useState(defaultImg)

  const handleImgFromFileId = (fileId) => {
    if (fileId) {
      downloadFile(fileId).then(({ data }) => {
        setImgSrc(URL.createObjectURL(data))
      }).catch((err) => {
        console.error(err);

      })
    } else {
      setImgSrc(defaultImg)
    }
  }

  useEffect(() => {
    handleImgFromFileId(imgDescriptionId)
  }, [imgDescriptionId])

  function upload(e) {
    if (e.target.files[0].size > 1048576) {
      toast.error("Kích thước ảnh không được quá 1MB");
    } else {
      setImgSrc(URL.createObjectURL(e.target.files[0]));
      if (e && e?.target && e?.target?.files && e?.target?.files?.length) {
        uploadFile(e.target.files[0])
          .then(({ data }) => {
            if (data) {
              setImageValue(data);
              if (!checkIsAnyDefault(values?.images)) {
                setDefault(true)
              }
            }
          });
      }
      else {
        toast.error("Có lỗi xảy ra trong quá trình tải ảnh, vui lòng thử lại");
      }
    }
    e.target.value = ""
  }

  const [visible, setVisible] = React.useState(false);

  return (
    <div>
      <label htmlFor={name}>
        <div
          className={classes.imgWrapper}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <img
            src={imgSrc}
            alt="Chọn hình ảnh"
            width={100}
            height={78}
            className={classes.img}
          />
          {(visible && !(imgSrc === defaultImg)) && <ImageActions setDefault={setDefault} deleteImage={deleteImage} />}
          {!(imgSrc === defaultImg) && isDefault &&
            <Tooltip title="Ghim ảnh đại diện thuốc - vật tư y tế">
              <IconButton size="small" className={classes.pin} style={{ zIndex: 1401 }} onClick={setDefault}>
                <ShoppingCartRoundedIcon color={"inherit"} size="small" style={{ color: "#0271F4" }} />
              </IconButton>
            </Tooltip>
          }
        </div>
      </label>
      {imgSrc === defaultImg &&
        <input
          type="file"
          id={name}
          name={name}
          className="display-none"
          accept="image/*"
          onChange={upload}
        />
      }
    </div>
  )
}

export default observer(function ProductImage() {

  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="">
      <div className="pt-16">
        <Grid container spacing={2}>
          <Grid item xs={12} className="flex">
            {[...Array(5)].map((_, index) => {
              return (
                <ImagePreview
                  key={values?.images?.[index]?.image?.id || index}
                  name={`images[${index}].image`}
                  setImageValue={(value) => setFieldValue(`images[${index}].image`, value)}
                  imgDescriptionId={values?.images?.[index]?.image?.id}
                  isDefault={values?.images?.[index]?.default}
                  setDefault={() => {
                    for (const iIndex in values?.images) {
                      setFieldValue(`images[${iIndex}].default`, false)
                    }
                    setFieldValue(`images[${index}].default`, true)
                  }}
                  deleteImage={() => setFieldValue(`images[${index}]`, null)}
                />
              )
            })}
          </Grid>
        </Grid>
      </div>
    </div>
  );
});
