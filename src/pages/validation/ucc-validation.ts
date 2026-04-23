import { addressDetailForm, fatchDeclarationsForm, personalDetailForm, personalFormErrors } from "../data-interfaces/ucc";

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