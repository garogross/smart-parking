import React from 'react';
import LoadingPopup from "../../layout/LoadingPopup/LoadingPopup";
import DataLoader from "../../layout/DataLoader/DataLoader";

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