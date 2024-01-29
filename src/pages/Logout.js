import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { unsetUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    unsetUser();
    setUser({
      id: null,
      isAdmin: null,
    });
    navigate('/login');
  };

  useEffect(() => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      } else {
        navigate('/');
      }
    });
  }, [navigate]);

  return null;
}
