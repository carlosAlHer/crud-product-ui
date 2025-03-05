import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { ProductList } from "../components/ProductList";
import { ProductForm } from "../components/ProductForm";
import { CategoryList } from "../components/CategoryList";
import { CategoryForm } from "../components/CategoryForm";
import { ProductDetail } from "../components/ProductDetail";
import { Error } from "../components/Error";
import { NavBar } from "../components/layout/NavBar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion, AnimatePresence } from 'framer-motion';


export const Routing = () => {

    const location = useLocation();
    // Objeto de configuración de animación reutilizable
    const pageTransition = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.5 },
    };

    return (
        <>
            <Row>
                <Col xs={12}>
                    <NavBar />
                </Col>
            </Row>

            <Row className="mt-4">
                <Col xs={12}>
                    <AnimatePresence mode="wait" location={location} key={location.pathname}>
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<motion.div {...pageTransition}><ProductList /></motion.div>} />
                            <Route path="/list-prd" element={<motion.div {...pageTransition}><ProductList /></motion.div>} />
                            <Route path="/form-prd" element={<motion.div {...pageTransition}><ProductForm /></motion.div>} />
                            <Route path="/list-categ" element={<motion.div {...pageTransition}><CategoryList /></motion.div>} />
                            <Route path="/form-categ" element={<motion.div {...pageTransition}><CategoryForm /></motion.div>} />
                            <Route path="/detail-prd/:id" element={<motion.div {...pageTransition}><ProductDetail /></motion.div>} />
                            <Route path="/edit-prd/:id" element={<motion.div {...pageTransition}><ProductForm /></motion.div>} />
                            <Route path="/edit-categ/:id" element={<motion.div {...pageTransition}><CategoryForm /></motion.div>} />
                            <Route path="*" element={<Error />} />
                        </Routes>
                    </AnimatePresence>
                </Col>
            </Row>

        </ >
    )
}