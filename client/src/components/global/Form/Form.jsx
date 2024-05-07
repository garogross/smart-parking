import React, {useEffect} from 'react';
import {useFormValue} from "../../../hooks/useFormValue";

import MainBtn from "../../layout/MainBtn/MainBtn";
import MainInput from "../../layout/MainInput/MainInput";
import LoadingPopup from "../../layout/LoadingPopup/LoadingPopup";
import DataLoader from "../../layout/DataLoader/DataLoader";

import styles from "./Form.module.scss"
import Select from "../../layout/Select/Select";
import Svg from "../../layout/Svg/Svg";
import {crossIcon} from "../../../assets/svg";
import SecondaryBtn from "../../layout/SecondaryBtn/SecondaryBtn";
import FormFields from "./FormFields/FormFields";


function Form({
                  error,
                  loading,
                  onSubmit,
                  sections,
                  setError,
                  curItem,
                  getLoading,
              }) {

    return (
        <DataLoader loading={getLoading} isEmpty={!curItem}>
            <FormFields
                setError={setError}
                error={error}
                sections={sections}
                onSubmit={onSubmit}
            />
            <LoadingPopup show={loading}/>
        </DataLoader>
    );
}

export default Form;