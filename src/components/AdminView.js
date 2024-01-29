import React, { useState, useEffect } from "react";
import { Table, Dropdown, Button, Image } from "react-bootstrap";
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";
// import ProductView from "../pages/ProductView";

export default function AdminView({ productData, fetchData }) {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [availabilityFilter, setAvailabilityFilter] = useState("all");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const navigate = useNavigate();

    const handleSearch = async (query) => {
        if (!query.trim()) {
            setFilteredProducts(productData);
            return;
        }
        const filteredProducts = productData.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filteredProducts);
    };

    const requestSort = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }

        setSortConfig({ key, direction });
    };
    const getObjectPropertyValue = (obj, key) => {
        if (!key) {
            return obj;
        }
        const keys = key.split(".");
        return keys.reduce((o, k) => (o || {})[k], obj);
    };
    const sortedProducts = (products, sortConfig) => {
        const sortableProducts = [...products];
        if (sortConfig !== null) {
            sortableProducts.sort((a, b) => {
                const valueA = getObjectPropertyValue(a, sortConfig.key);
                const valueB = getObjectPropertyValue(b, sortConfig.key);

                if (valueA < valueB) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (valueA > valueB) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableProducts;
    };
    const handleAvailabilityFilterChange = (filter) => {
        setAvailabilityFilter(filter);
    };
    const applyAvailabilityFilter = (products) => {
        if (availabilityFilter === "all") {
            return products;
        } else {
            return products.filter((product) => {
                return (
                    (availabilityFilter === "available" && product.isActive) ||
                    (availabilityFilter === "unavailable" && !product.isActive)
                );
            });
        }
    };
    const sortedAndFilteredProducts = (products) => {
        const sortedData = sortedProducts(products, sortConfig);
        const filteredData = applyAvailabilityFilter(sortedData);
        setFilteredProducts(filteredData);
    };
    useEffect(() => {
        sortedAndFilteredProducts(productData);
    }, [productData, sortConfig, availabilityFilter]);

    return (
        <>
            <h1 className="text-center">Admin Dashboard</h1>
            <div className="d-flex mb-2">
                <SearchBar size='sm' onSearch={handleSearch} />
                <Button
                    size='sm'
                    variant="success"
                    onClick={() => navigate("/addProduct")}
                    className="ms-3"
                >
                    Add Product
                </Button>
            </div>
            <div className="admin-view-container">
                <Table striped bordered hover responsive className="m-0 p">
                    <thead className="productView">
                        <tr className="text-center">
                            <th style={{ width: "10%" }}>ID</th>
                            <th style={{ width: "15%" }}>Name</th>
                            <th style={{ width: "15%" }}>Description</th>
                            <th
                                style={{ width: "15%" }}
                                onClick={() => requestSort("quantity")}
                            >
                                Quantity
                            </th>
                            <th
                                style={{ width: "15%" }}
                                onClick={() => requestSort("price")}
                            >
                                Price
                            </th>
                            <th style={{ width: "15%" }}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Availability
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => handleAvailabilityFilterChange("all")}
                                        >
                                            All
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleAvailabilityFilterChange("available")
                                            }
                                        >
                                            Available
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() =>
                                                handleAvailabilityFilterChange("unavailable")
                                            }
                                        >
                                            Unavailable
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </th>
                            <th
                                style={{ width: "15%" }}
                                onClick={() => requestSort("userOrder.length")}
                            >
                                Order
                            </th>
                            <th colSpan="3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr
                                key={product._id}
                                className="text-center align-content-center"
                            >
                                <td>
                                    {product.imageLink ? (
                                        <Image src={product.imageLink} alt={product.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    ) : (
                                        <Image src="https://i.ibb.co/7Cq4wtp/noimages.jpg" alt="No Image" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                                    )}
                                </td>

                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price}</td>
                                <td
                                    className={
                                        product.isActive ? "text-success" : "text-danger"
                                    }
                                >
                                    {product.isActive ? "Available" : "Unavailable"}
                                </td>
                                <td>
                                    {product.userOrder.length > 0
                                        ? product.userOrder.length
                                        : "No order"}
                                </td>
                                <td>
                                    <EditProduct product={product._id} fetchData={fetchData} />
                                </td>
                                <td>
                                    <ArchiveProduct
                                        product={product._id}
                                        isActive={product.isActive}
                                        fetchData={fetchData}
                                    />
                                </td>
                                <td>
                                    <DeleteProduct product={product._id} fetchData={fetchData} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
