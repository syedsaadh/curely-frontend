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
export { Appointment, VitalSignType, CompletedProcedure, Procedure, VitalSignField, ClinicalNotes };
