import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function DeleteUser({ user, fetchData }) {
    const navigate = useNavigate();

    const deleteProduct = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${user}/delete`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    fetchData();
                } else {
                    fetchData();
                }
            });
    };

    const confirmDelete = () => {
        Swal.fire({
            title: 'Delete ',
            text: 'Are you sure you want to Delete User?',
            icon: 'question',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct();
            } else {
                navigate('/products');
            }
        });
    };

    return (
        <>
            <Button variant="danger" size='sm' onClick={confirmDelete}>Delete</Button>
        </>
    );
}
