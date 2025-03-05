import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ProductList } from "../components/ProductList";
import { ProductForm } from "../components/ProductForm";
import { CategoryList } from "../components/CategoryList";
import { CategoryForm } from "../components/CategoryForm";
import { ProductDetail } from "../components/ProductDetail";
import { Error } from "../components/Error";
import { NavBar } from "../components/layout/NavBar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export const Routing = () => {

    return (
        <BrowserRouter>
            <Row>
                <Col xs={12}>
                    <NavBar />
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xs={12}>
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/list-prd" element={<ProductList />} />
                        <Route path="/form-prd" element={<ProductForm />} />
                        <Route path="/list-categ" element={<CategoryList />} />
                        <Route path="/form-categ" element={<CategoryForm />} />
                        <Route path="/detail-prd/:id" element={<ProductDetail />} />
                        <Route path="/edit-prd/:id" element={<ProductForm />} />
                        <Route path="/edit-categ/:id" element={<CategoryForm />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                </Col>
            </Row>

        </BrowserRouter >
    )
}