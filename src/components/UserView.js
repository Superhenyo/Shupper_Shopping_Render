import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import { Row, Col, Container } from 'react-bootstrap';

export default function UserView({ productData, fetchData}) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsArr = productData.map(product => {
            if (product.isActive === true) {
                return <ProductCard productProps={product} key={product._id} fetchData={fetchData} />;
            } else {
                return null;
            }
        });
        setProducts(productsArr);
    }, [productData, fetchData]);

    const handleSearch = (query) => {
        if (!query.trim()) {
            setProducts(productData.map((product) => (
                <ProductCard productProps={product} key={product._id} />
            )));
            return;
        }
        const filteredProducts = productData
            .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
            .map((product) => (
                <ProductCard productProps={product} key={product._id} />
            ));

        setProducts(filteredProducts);
    };



    return (
        <>

            <Container>
                <SearchBar onSearch={handleSearch} />
                <Row>
                    {products.map((product, index) => (
                        <Col key={index} xs={12} sm={6} md={6} lg={3} className='mb-2 pt-3'>
                            {product}
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
