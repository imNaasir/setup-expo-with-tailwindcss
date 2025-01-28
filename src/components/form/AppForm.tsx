import React from "react";
import { Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import * as Yup from "yup";

interface AppFormProps<T extends FormikValues> {
    initialValues: T;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
    validationSchema: Yup.ObjectSchema<T>;
    children: (formikHelpers: FormikProps<T>) => React.ReactNode; // Require formikHelpers as FormikProps
}

/**
 * A wrapper component for Formik that handles form state and validation.
 */
const AppForm = <T extends FormikValues>({ initialValues, onSubmit, validationSchema, children }: AppFormProps<T>) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(formikHelpers) => <>{children(formikHelpers)}</>}
        </Formik>
    );
};

export default AppForm;

