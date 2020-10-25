import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { EntryType, Diagnosis } from "../types";
import { assertNever } from "../utils";

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />

    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField: React.FC<NumberProps> = ({
  field,
  label,
  min,
  max,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type="number" min={min} max={max} />

    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

export const EntryTypeSelection = ({
  entryTypes,
  setFieldValue,
  setFieldTouched,
}: {
  entryTypes: EntryType[];
  setFieldValue: FormikProps<{ type: EntryType }>["setFieldValue"];
  setFieldTouched: FormikProps<{ type: EntryType }>["setFieldTouched"];
}) => {
  const field = "type";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = entryTypes.map((entryType) => ({
    key: entryType,
    text:
      entryType === EntryType.HealthCheck
        ? "Health Check"
        : entryType === EntryType.OccupationalHealthcare
        ? "Occupational Healthcare"
        : "Hospital",
    value: entryType,
  }));

  return (
    <Form.Field>
      <label>Entry Type</label>
      <Dropdown
        fluid
        selection
        options={stateOptions}
        onChange={onChange}
        defaultValue={EntryType.HealthCheck}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};

export const EntryTypeSpecificFields: React.FC<{ type: EntryType }> = ({
  type,
}) => {
  switch (type) {
    case EntryType.HealthCheck:
      return (
        <Field
          label="Health Check Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );

    case EntryType.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Employer's Name"
            placeholder="Employer's Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick leave start date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveStartDate"
            component={TextField}
          />
          <Field
            label="Sick leave end date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveEndDate"
            component={TextField}
          />
        </>
      );

    case EntryType.Hospital:
      return (
        <>
          <Field
            label="Discharge date"
            placeholder="YYYY-MM-DD"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Criteria for discharge"
            placeholder="Criteria"
            name="dischargeCriteria"
            component={TextField}
          />
        </>
      );

    default:
      return assertNever(type);
  }
};
