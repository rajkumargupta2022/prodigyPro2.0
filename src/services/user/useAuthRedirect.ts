// hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { fetchAdminUser } from './adminUser';

const useAuthRedirect = () => {
  const navigate = useNavigate();
   const location = useLocation();
 const url:string[] = ["/otp","/terms-and-conditions","sign-up"]
  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminUser = fetchAdminUser()

    if (!token&&(!url.includes(location.pathname))) {
      if(!adminUser?.ucc){
        navigate('/');
      }
    }
     window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scrolling
    });
  }, [navigate]);
};

export default useAuthRedirect;
