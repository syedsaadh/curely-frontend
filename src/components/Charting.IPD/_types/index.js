type VitalSignField = {
  appointment_vital_signs_id: Number,
  name: String,
  unit: String,
  value: String,
};
type VitalSignType = {
  id: Number,
  ipd_admission_visit_id: Number,
  fields: Array<VitalSignField>,
};
type ClinicalNotes = {
  id: Number,
  ipd_admission_visit_id: Number,
  complaints_list: Array<String>,
  observations_list: Array<String>,
  diagnosis_list: Array<String>,
  notes_list: Array<String>,
};
type CompletedProcedure = {
  id: String,
  ipd_admission_visit_id: Number,
  procedure_id: Number,
  procedure_name: String,
  procedure_units: Number,
  procedure_cost: Number,
  procedure_discount: Number,
  notes: String,
};
type Procedure = {
  id: String,
  ipd_admission_visit_id: Number,
  procedure_id: Number,
  procedure_name: String,
  procedure_units: Number,
  procedure_cost: Number,
  procedure_discount: Number,
  notes: String,
};
type LabTest = {
  id: String,
  ipd_admission_visit_id: Number,
  lab_test_id: Number,
  lab_test_name: String,
  instruction: String,
};
type Department = {
  id: Number,
  name: String,
  desc: String,
  bed_count: Number,
};
type Admission = {
  id: Number,
  patient_id: Number,
  admitted_on: String,
  discharged_on: String,
  in_department: Number | null,
  referred_by_doctor: Number | null,
  bed_no: Number,
  notes: String,
  department: Department,
};
type Visit = {
  id: Number,
  ipd_admission_id: Number,
  visit_type: String,
  visited_by: Number,
  visited_on: String,
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
  ipd_admission_visit_id: Number,
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
  Admission,
  Visit,
  VitalSignType,
  CompletedProcedure,
  Procedure,
  VitalSignField,
  ClinicalNotes,
  LabTest,
  Prescription,
  Drug,
};
