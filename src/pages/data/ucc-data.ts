export const ContactRelationsEnum=[
    { value: "SE", label: "Self" },
 { value: "SP", label: "Spouse" },
  { value: "GD", label: "Guardian" }
]

export const GuardianRelationEnum = [
  { value: 6, label: "Father" },
  { value: 13, label: "Mother" },
  { value: 23, label: "Court Appointed" },
];

export const HoldingNatureEnum = [
  { value: "SI", label: "Single" },
  { value: "AS", label: "Anyone / Survivor" },
];


export const IncomeRangeEnum = [
  { value: 31, label: "Below 1 Lakh" },
  { value: 32, label: "1-5 Lakh" },
  { value: 33, label: "5-10 Lakh" },
  { value: 34, label: "10-25 Lakh" },
  { value: 35, label: "25 Lakh - 1 Crore" },
  { value: 36, label: "Above 1 Crore" },
];

export const NomineeRelationEnum = [
  { value: 1, label: "Aunt" },
  { value: 2, label: "Brother-in-law" },
  { value: 3, label: "Brother" },
  { value: 4, label: "Daughter" },
  { value: 5, label: "Daughter-in-law" },
  { value: 6, label: "Father" },
  { value: 7, label: "Father-in-law" },
  { value: 8, label: "Grand-daughter" },
  { value: 9, label: "Grand-father" },
  { value: 10, label: "Grand-mother" },
  { value: 11, label: "Grand-son" },
  { value: 12, label: "Mother-in-law" },
  { value: 13, label: "Mother" },
  { value: 14, label: "Nephew" },
  { value: 15, label: "Niece" },
  { value: 16, label: "Sister" },
  { value: 17, label: "Sister-in-law" },
  { value: 18, label: "Son" },
  { value: 19, label: "Son-in-law" },
  { value: 20, label: "Spouse" },
  { value: 21, label: "Uncle" },
  { value: 22, label: "Others" },
];

export const OccupationEnum = [
  { value: 1, label: "Business" },
  { value: 2, label: "Service" },
  { value: 3, label: "Professional" },
  { value: 4, label: "Agriculture" },
  { value: 5, label: "Retired" },
  { value: 6, label: "Housewife" },
  { value: 7, label: "Student" },
  { value: 8, label: "Other" },
  { value: 9, label: "Doctor" },
  { value: 41, label: "Private Sector Service" },
  { value: 42, label: "Public Sector Service" },
  { value: 44, label: "Government Service" },
];

export const StatevaluesEnum = [
  { value: "AN", label: "Andaman & Nicobar" },
  { value: "AP", label: "Andhra Pradesh" },
  { value: "AR", label: "Arunachal Pradesh" },
  { value: "AS", label: "Assam" },
  { value: "BH", label: "Bihar" },
  { value: "CH", label: "Chandigarh" },
  { value: "CG", label: "Chhattisgarh" },
  { value: "DN", label: "Dadra & Nagar Haveli" },
  { value: "DD", label: "Daman & Diu" },
  { value: "GO", label: "Goa" },
  { value: "GU", label: "Gujarat" },
  { value: "HA", label: "Haryana" },
  { value: "HP", label: "Himachal Pradesh" },
  { value: "JM", label: "Jammu & Kashmir" },
  { value: "JK", label: "Jharkhand" },
  { value: "KA", label: "Karnataka" },
  { value: "KE", label: "Kerala" },
  { value: "LD", label: "Lakshadweep" },
  { value: "MA", label: "Maharashtra" },
  { value: "MP", label: "Madhya Pradesh" },
  { value: "MN", label: "Manipur" },
  { value: "ME", label: "Meghalaya" },
  { value: "MI", label: "Mizoram" },
  { value: "NA", label: "Nagaland" },
  { value: "ND", label: "New Delhi" },
  { value: "OR", label: "Odisha" },
  { value: "PO", label: "Pondicherry" },
  { value: "PU", label: "Punjab" },
  { value: "RA", label: "Rajasthan" },
  { value: "SI", label: "Sikkim" },
  { value: "TN", label: "Tamil Nadu" },
  { value: "TG", label: "Telangana" },
  { value: "TR", label: "Tripura" },
  { value: "UP", label: "Uttar Pradesh" },
  { value: "UK", label: "Uttarakhand" },
  { value: "WB", label: "West Bengal" },
  { value: "OH", label: "Others" },
];

export const TaxStatusEnum = [
  { value: 1, label: "Resident Individual" },
  { value: 2, label: "On Behalf of Minor" },
];

export const UserGenderEnum =[
   { value: "M", label: "Male" },
   { value: "F", label: "Female" },
 { value: "O", label: "Other" }
]

export const UserTypeEnum ={
  PRIMARY_HOLDER: "primaryHolder",
  SECOND_HOLDER: "secondHolder",
  THIRD_HOLDER: "thirdHolder"
};

export const WealthSourceEnum =[
   { value: 1, label: "Salary" },
   { value: 2, label: "Business Income" },
   { value: 3, label: "Gift" },
   { value: 4, label: "Ancestral Property" },
   { value: 5, label: "Rental Income" },
   { value: 6, label: "Prize Money" },
   { value: 7, label: "Royalty" },
   { value: 8, label: "Other" }
]