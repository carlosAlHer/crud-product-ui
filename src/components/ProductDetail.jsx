import React from 'react'
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ProductDetail = () => {

  const param = useParams();
  const [product, setProduct] = useState({});
  const [category, setcategories] = useState({});


  const getProduct = async () => {

    try {
      const request = await fetch(`http://localhost:3000/api/prd/${param.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await request.json();
      setProduct(data || {});

    } catch (error) {
      console.error('Error:', error);
    }

  }
  useEffect(() => {
    if (param.id) {
      getProduct();

    }

  }, [param.id])

  const listCategories = async () => {

    const request = await fetch(`http://localhost:3000/api/categ`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();
    const cat = data.filter((cat) => cat.id === product.category_id) || {};
    setcategories(cat[0] || {});

  }
  useEffect(() => {
    if (product) {
      listCategories();
    }

    console.log(category)
  }, [product]);

  return (
    <Card>
      <Card.Header>Product Detail</Card.Header>
      <Card.Body>
        <Row >
          <Col >
            <Card.Text><b> Name:</b> {product.name} </Card.Text>
            <Card.Text> <b> Description:</b> {product.description}</Card.Text>
          </Col>

          <Col><Card.Text> <b> Price:</b> {product.price}</Card.Text>
            <Card.Text> <b> Category:</b> {category.name}</Card.Text></Col>

        </Row>


      </Card.Body>
    </Card>

  )
}
