export const validator = (name:string,value:string)=>{
  let error = '';

  switch (name) {
    case 'name':
      if (!value.trim()) {
        error = 'Name is required';
      }
      break;
    case 'email':
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = 'Email is required';
      } else if (!emailPattern.test(value)) {
        error = 'Email is invalid';
      }
      break;


    case 'pan':
      const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!value) {
        error = 'PAN is required';
      } else if (!panPattern.test(value)) {
        error = 'PAN is invalid';
      }
      break;
    case 'mobile':
      const mobilePattern = /^[0-9]{10}$/;
      if (!value) {
        error = 'Mobile number is required';
      } else if (!mobilePattern.test(value)) {
        error = 'Mobile number is invalid';
      } else if (value.length > 10) {
        error = 'Mobile number should be 10 digit';
      }
      break;
    default:
      if (!value) {
        error = `Mandatory Field`;
      }
      break;
  }

  return error;
}