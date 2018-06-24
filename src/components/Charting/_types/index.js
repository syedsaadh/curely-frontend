type VitalSignField = {
  appointment_vital_signs_id: Number,
  name: String,
  unit: String,
  value: String,
};
type VitalSignType = {
  id: Number,
  appointment_id: Number,
  fields: Array<VitalSignField>,
};
type ClinicalNotes = {
  id: Number,
  appointment_id: Number,
  complaints_list: Array<String>,
  observations_list: Array<String>,
  diagnosis_list: Array<String>,
  notes_list: Array<String>,
};
type CompletedProcedure = {
  id: String,
  appointment_id: Number,
  procedure_id: Number,
  procedure_name: String,
  procedure_units: Number,
  procedure_cost: Number,
  procedure_discount: Number,
  notes: String,
};
type Procedure = {
  id: String,
  appointment_id: Number,
  procedure_id: Number,
  procedure_name: String,
  procedure_units: Number,
  procedure_cost: Number,
  procedure_discount: Number,
  notes: String,
};
type LabTest = {
  id: String,
  appointment_id: Number,
  lab_test_id: Number,
  lab_test_name: String,
  instruction: String,
};
type Appointment = {
  id: Number,
  patient_id: Number,
  scheduled_from: String,
  scheduled_to: String,
  for_department: Number | null,
  notes: String | null,
  cancelled: 0 | 1,
  cancel_reason: String | null,
  vital_signs: VitalSignType,
  clinical_notes: ClinicalNotes,
  lab_orders: any,
  prescriptions: any,
  completed_procedures: Array<CompletedProcedure>,
  treatment_plans: Array<Procedure>,
};
type Drug = {
  id: Number,
  name: String,
  drug_type: String,
  default_dosage: String | null,
  default_dosage_unit: String | null,
  instruction: String | null,
};
type Prescription = {
  id: Number,
  appointment_id: Number,
  drug_id: Number,
  intake: String,
  frequency: String,
  display_frequency: String,
  food_precedence: String,
  duration: Number,
  duration_unit: String,
  instruction: String | null,
  drug: Drug,
};
export {
  Appointment,
  VitalSignType,
  CompletedProcedure,
  Procedure,
  VitalSignField,
  ClinicalNotes,
  LabTest,
  Prescription,
  Drug,
};
