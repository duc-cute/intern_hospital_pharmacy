import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GlobitsAutocomplete from "../GlobitsAutocomplete";
import GlobitsTextField from "../GlobitsTextField";
import AdministrativeUnitService from "./AdministrativeUnitService";
import { useFormikContext } from "formik";

export default function SelectAdministrativeUnit(props) {

  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [region, setRegion] = useState(null);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    getRootUnit();
  }, []);

  useEffect(() => {
    getAllChildByValue();
  }, [props.region, props.province, props.district, props.ward]);

  useEffect(() => {
    setRegion(props.region)
    setProvince(props.province)
    setDistrict(props.district)
    setWard(props.ward)
  }, [props]);

  const getAllChildByValue = async () => {
    if (props.ward) {
      // setRegion(props.region)
      
      await AdministrativeUnitService.getAllChildByParentId(
        props.region.id
      ).then(({ data }) => {
        setProvinces(data);
        // setProvince(props.province);
      });

      await AdministrativeUnitService.getAllChildByParentId(
        props.province.id
      ).then(({ data }) => {
        setDistricts(data);
        // setDistrict(props.district);
      });

      await AdministrativeUnitService.getAllChildByParentId(
        props.district.id
      ).then(({ data }) => {
        setWards(data);
        // setWard(props.ward);
      });
    }
    else if (props.district) {
      // setRegion(props.region)
      await AdministrativeUnitService.getAllChildByParentId(
        props.region.id
      ).then(({ data }) => {
        setProvinces(data);
        // setProvince(props.province);
      });

      await AdministrativeUnitService.getAllChildByParentId(
        props.province.id
      ).then(({ data }) => {
        setDistricts(data);
        // setDistrict(props.district);
      });
      await AdministrativeUnitService.getAllChildByParentId(
        props.district.id
      ).then(({ data }) => {
        setWards(data);
      });
    } else if (props.province) {
      // setRegion(props.region)
      await AdministrativeUnitService.getAllChildByParentId(
        props.region.id
      ).then(({ data }) => {
        setProvinces(data);
        // setProvince(props.province);
      });
      await AdministrativeUnitService.getAllChildByParentId(
        props.province.id
      ).then(({ data }) => {
        setDistricts(data);
      });
    } else if (props.region) {
      // setRegion(props.region)
      await AdministrativeUnitService.getAllChildByParentId(
        props.region.id
      ).then(({ data }) => {
        setProvinces(data);
      });
    }
  };

  const getRootUnit = async () => {
    await AdministrativeUnitService.getAllByLevel(2).then(({ data }) => {
      setRegions(data);
    });
  };

  const updateRegion = async (value) => {
    setRegion(value);
    setFieldValue(`${props.prefix}Province`, null);
    setFieldValue(`${props.prefix}District`, null);
    setFieldValue(`${props.prefix}Ward`, null);
    setProvince(null);
    setDistrict(null);
    setWard(null);

    if (value) {
      await AdministrativeUnitService.getAllChildByParentId(value.id).then(
        ({ data }) => {
          setProvinces(data);
        }
      );
    } else {
      setProvinces([]);
    }
  };

  const updateProvince = async (value) => {
    setProvince(value);
    setFieldValue(`${props.prefix}District`, null);
    setFieldValue(`${props.prefix}Ward`, null);
    setDistrict(null);
    setWard(null);

    if (value) {
      await AdministrativeUnitService.getAllChildByParentId(value.id).then(
        ({ data }) => {
          setDistricts(data);
        }
      );
    } else {
      setDistricts([]);
    }
  };

  const updateDistrict = async (value) => {
    setDistrict(value);
    setFieldValue(`${props.prefix}Ward`, null);
    setWard(null);

    if (value) {
      await AdministrativeUnitService.getAllChildByParentId(value.id).then(
        ({ data }) => {
          setWards(data);
        }
      );
    } else {
      setWards([]);
    }
  };

  const updateWard = (value) => {
    setWard(value);
  };
  return (
    <>
      <Grid item md={6} xs={6}>
        <GlobitsAutocomplete
          name={`${props.prefix ? `${props.prefix}Region` : "currentRegion"
            }`}
          label="Miền"
          value={region}
          options={regions}
          updateParent={updateRegion}
          disabled={props.disabled}
        />
      </Grid>
      <Grid item md={6} xs={6}>
        <GlobitsAutocomplete
          name={`${props.prefix ? `${props.prefix}Province` : "currentProvince"
            }`}
          label="Tỉnh/Thành phố"
          value={province}
          options={provinces}
          updateParent={updateProvince}
          disabled={props.disabled}
        />
      </Grid>
      <Grid item md={6} xs={6}>
        <GlobitsAutocomplete
          name={`${props.prefix ? `${props.prefix}District` : "currentDistrict"
            }`}
          label="Quận/Huyện"
          options={districts}
          value={district}
          updateParent={updateDistrict}
          disabled={props.disabled}
        />
      </Grid>
      <Grid item md={6} xs={6}>
        <GlobitsAutocomplete
          name={`${props.prefix ? `${props.prefix}Ward` : "currentWard"}`}
          label="Phường/Xã"
          options={wards}
          value={ward}
          updateParent={updateWard}
          disabled={props.disabled}
        />
      </Grid>
      {!props.disableDetail&&
      <Grid item md={12} xs={12}>
      <GlobitsTextField
        name={`${props.prefix
          ? `${props.prefix}DetailResidence`
          : "currentDetailResidence"
          }`}
        label={<span>Địa chỉ chi tiết ( <span style={{ color: "red" }}>*</span> )</span>}
        value={props.detailResidence}
        disabled={props.disabled}
      />
    </Grid>
      }
      
    </>
  );
}
