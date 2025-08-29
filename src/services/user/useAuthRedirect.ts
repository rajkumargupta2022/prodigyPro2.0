// hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();
   const location = useLocation();
 const url:string[] = ["/otp","/terms-and-conditions"]
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token &&  (!url.includes(location.pathname))) {
       
      navigate('/');
    }
     window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    });
  }, [navigate]);
};

export default useAuthRedirect;
