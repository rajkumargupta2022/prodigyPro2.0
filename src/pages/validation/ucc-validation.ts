import { addressDetailForm, fatchDeclarationsForm, personalDetailForm, personalFormErrors, nomineeDetailForm } from "../data-interfaces/ucc";

export const validatePersonalForm = (form:personalDetailForm,tax_status:string,setErrors:React.Dispatch<React.SetStateAction<personalFormErrors>>): boolean => {
    const newErrors: personalFormErrors = {};

    if (!form.full_name?.trim()) {
      newErrors.full_name = "Full name is required.";
    } else if (form.full_name.trim().length < 3) {
      newErrors.full_name = "Full name must be at least 3 characters.";
    }

    if (!form.email?.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.email_relation) {
      newErrors.email_relation = "Email relation is required.";
    }

    if (!form.mobile?.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    if (!form.mobile_relation) {
      newErrors.mobile_relation = "Mobile relation is required.";
    }

    if (!form.gender) {
      newErrors.gender = "Gender is required.";
    }

    // DOB Age Validation based on Tax Status
    if (!form.dob) {
      newErrors.dob = "Date of Birth is required.";
    }
    if (form.dob) {
      const dobDate = new Date(form.dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }

      if (String(tax_status) === "2") {
        if (age >= 18) {
          newErrors.dob = "For minor status, age must be less than 18 years.";
        }
      } else {
        if (age < 18) {
          newErrors.dob = "For this tax status, age must be 18 years or more.";
        }
      }
    }

    // Guardian Fields Validation for Minor
    if (String(tax_status) === "2") {
      if (!form.guardian_name?.trim()) {
        newErrors.guardian_name = "Guardian name is required.";
      }
      if (!form.guardian_relation) {
        newErrors.guardian_relation = "Guardian relation is required.";
      }
      if (!form.guardian_pan?.trim()) {
        newErrors.guardian_pan = "Guardian PAN is required.";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.guardian_pan.toUpperCase())) {
        newErrors.guardian_pan = "Invalid PAN format.";
      }
      if (!form.guardian_dob) {
        newErrors.guardian_dob = "Guardian DOB is required.";
      } else {
        const gDobDate = new Date(form.guardian_dob);
        const today = new Date();
        let gAge = today.getFullYear() - gDobDate.getFullYear();
        const m = today.getMonth() - gDobDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < gDobDate.getDate())) {
          gAge--;
        }
        if (gAge < 18) {
          newErrors.guardian_dob = "Guardian must be at least 18 years old.";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  export const validateDeclarationForm = (
    form: fatchDeclarationsForm,
    setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof fatchDeclarationsForm, string>>>>
  ): boolean => {
    const newErrors: Partial<Record<keyof fatchDeclarationsForm, string>> = {};
    if (!form.occupation) newErrors.occupation = "Occupation is required.";
    if (!form.place_of_birth) newErrors.place_of_birth = "Place of birth is required.";
    if (!form.wealth_source) newErrors.wealth_source = "Source of income is required.";
    if (!form.income_range) newErrors.income_range = "Please select an income range.";
    if (!form.no_politically_exposed)
      newErrors.no_politically_exposed = "You must confirm you are not a politically exposed person.";
    if (!form.confirm_resident_indian)
      newErrors.confirm_resident_indian = "You must confirm you are a resident Indian taxpayer.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  export  const validateAddressForm = (form:addressDetailForm,setErrors:React.Dispatch<React.SetStateAction<Partial<Record<keyof addressDetailForm, string>>>>): boolean => {
      const newErrors: Partial<addressDetailForm> = {};
  
      if (!form.pincode || !/^\d{6}$/.test(form.pincode)) {
        newErrors.pincode = "Valid 6 digit pincode required";
      }
  
      if (!form.address_1?.trim()) {
        newErrors.address_1 = "Address is required";
      }
  
      if (!form.city) {
        newErrors.city = "City is required";
      }
  
      if (!form.state) {
        newErrors.state = "State is required";
      }
  
      if (!form.country) {
        newErrors.country = "Country is required";
      }
  
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
    export const isMinor = (dob: string): boolean => {
       const dobDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      return age < 18;

    }

    export const validateNomineeForm = (
      form: nomineeDetailForm,
      pan: string,
      nomineeList: nomineeDetailForm[],
      edit_index: string | null,
      aadhar: any,
      passport: any,
      setErrors: React.Dispatch<React.SetStateAction<any>>
    ): boolean => {
      const newErrors: any = {};
      if (!form.nominee_name?.trim()) newErrors.nominee_name = "Nominee name is required";
      if (!form.nominee_email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.nominee_email)) {
        newErrors.nominee_email = "Valid email required";
      }
      if (!form.nominee_mobile?.trim() || !/^[6-9]\d{9}$/.test(form.nominee_mobile)) {
        newErrors.nominee_mobile = "Valid mobile required";
      }
      if (!form.nominee_dob) newErrors.nominee_dob = "Nominee date of birth is required";
      if (!form.nominee_relation) newErrors.nominee_relation = "Nominee relation is required";
      if (!form.nominee_allocation || form.nominee_allocation <= 0) newErrors.nominee_allocation = "Nominee allocation is required";

      if (form.is_nominee_minor) {
        if (!form.nominee_guardian_name?.trim()) newErrors.nominee_guardian_name = "Gaurdian name is required";
        if (!form.nominee_guardian_pan?.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.nominee_guardian_pan.toUpperCase())) {
          newErrors.nominee_guardian_pan = "Valid PAN required";
        }
        if (form.nominee_guardian_pan === pan) {
          newErrors.nominee_guardian_pan = "Primary PAN and Nominee gaurdian PAN should not be same";
        }
        if (form.nominee_id_type === aadhar || !form.nominee_id_type) {
          if (!form.nominee_id_number?.trim() || !/^\d{4}$/.test(form.nominee_id_number)) {
            newErrors.nominee_id_number = "Valid 4-digit Aadhaar required";
          }
        } else if (form.nominee_id_type === passport) {
          if (!form.nominee_id_number?.trim()) {
            newErrors.nominee_id_number = "Passport number is required";
          }
        }
      } else {
        if (!form.nominee_id_number?.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.nominee_id_number.toUpperCase())) {
          newErrors.nominee_id_number = "Valid PAN required";
        }
        if(form.nominee_id_number){
          const alreadyExist = nomineeList.some((nominee, idx) => {
            if(edit_index !== null && idx === parseInt(edit_index)) return false;
            return nominee.nominee_id_number === form.nominee_id_number;
          })
          if(alreadyExist){
            newErrors.nominee_id_number = "Nominee ID number should not be same as any other nominee";
          }
        }
        if (form.nominee_id_number === pan) {
          newErrors.nominee_id_number = "Primary PAN and Nominee PAN should not be same";
        }
      }

      if (form.nominee_id_number?.trim()) {
        const isDuplicate = nomineeList.some((nominee, idx) => {
          if (edit_index !== null && idx === parseInt(edit_index)) return false;
          return nominee.nominee_id_number?.toUpperCase() === form.nominee_id_number?.toUpperCase();
        });
        if (isDuplicate) {
          newErrors.nominee_id_number = "Nominee ID number should not be same as any other nominee";
        }
      }

      if (!form.nominee_address?.pincode?.trim()) newErrors.address_pincode = "Pincode is required";
      if (form.nominee_address?.pincode?.trim().length !== 6) newErrors.address_pincode = "Please enter valid pincode";
      if (!form.nominee_address?.address_1?.trim()) newErrors.address_address_1 = "Address is required";
      if (!form.nominee_address?.city?.trim()) newErrors.address_city = "City is required";
      if (!form.nominee_address?.state?.trim()) newErrors.address_state = "State is required";
      if (!form.nominee_address?.country?.trim()) newErrors.address_country = "Country is required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };