// hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const useAuthRedirect = () => {
  const navigate = useNavigate();
   const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && (location.pathname!=="/otp")) {
      navigate('/');
    }
  }, [navigate]);
};

export default useAuthRedirect;
