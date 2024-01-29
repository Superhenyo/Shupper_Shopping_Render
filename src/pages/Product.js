import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products() {
    const { user } = useContext(UserContext);
    const [userProduct, setUserProduct] = useState([]);
    const [adminProduct, setAdminProduct] = useState([]);


    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/active`)
            .then(res => res.json())
            .then(data => {
                setUserProduct(data);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData2 = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
               setAdminProduct(data);
            });
    };

    useEffect(() => {
        fetchData2();
    }, []);

    return (
        <>
            <div className='productView m-0'>
                {user.isAdmin ? (
                    <AdminView productData={adminProduct} fetchData={fetchData2} />
                ) : (
                    <UserView productData={userProduct} fetchData={fetchData2} />
                )}
            </div>
        </>
    );
}
