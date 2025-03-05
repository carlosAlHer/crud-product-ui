import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const ProductForm = () => {

  const param = useParams();
  const navigate = useNavigate();
  const [categories, setcategories] = useState([]);


  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('Choose...');
  const [product, setProduct] = useState([]);



  const getProduct = async () => {

    try {
      const request = await fetch(`http://localhost:3000/api/prd/${param.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await request.json();
      setProduct(data || []);
      setFormValues(product)

    } catch (error) {
      console.error('Error:', error);
    }

  }

  const setFormValues = (productData) => {
    setName(productData.name || "");
    setPrice(productData.price || "");
    setDescription(productData.description || "");
    setCategorie(productData.categorie || "");

  }

  useEffect(() => {
    if (param.id) {
      getProduct()
    }

  }, [param]);

  useEffect(() => {
    if (product) {
      setFormValues(product)
    }

  }, [product]);




  const listCategories = async () => {

    const request = await fetch(`http://localhost:3000/api/categ`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();
    setcategories(data || []);
  }

  useEffect(() => {
    listCategories();

  }, []);

//funcion para crear nuevo producto y para acturalizar en el mismo form, se crea productData y requestConfig dinamico
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const productData = {
      id: null,
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      description: formData.get('description'),
      category_id: Number(formData.get('categorie'))
    };
    

    const requestConfig = {
      method: 'POST', // Método base es POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData), // Body para POST
    };


    if (product && param && param.id) {
      requestConfig.method = 'PUT';
      productData.id = Number(param.id) ;
      requestConfig.body = JSON.stringify(productData); 
    }

    try {
      const response = await fetch('http://localhost:3000/api/prd', {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: requestConfig.body,
      });

      const result = await response.json();
      console.log(result);
      if (result.error) {
        throw new Error('Error al enviar los datos');
      }

      navigate("/list-prd");

    } catch (error) {
      console.error('Error:', error);
    }
  };




  return (

    <Form className='p-3 border border-dark' onSubmit={(e) => saveProduct(e)}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='name'
            type="text"
            placeholder="Enter Name Product" required
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group as={Col} controlId="formPrice" >
          <Form.Label>Price</Form.Label>
          <Form.Control
            name='price'
            type="number"
            required
            placeholder="Enter Price Product"
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} className="mb-3" controlId="formDescription" >
          <Form.Label>Description</Form.Label>
          <Form.Control
            name='description'
            placeholder="Enter Description Product"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formCategorie">
          <Form.Label>Cagegorie</Form.Label>
          <Form.Select
            name='categorie'
            defaultValue="Choose..."
            required>

            <option value="" >Choose Categorie</option>
            {
              categories.map((categorie) => {
                return (
                  <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
                )
              })
            }

          </Form.Select>
        </Form.Group>
      </Row>


      <Button variant="primary" type="submit" className="w-100 mt-4" >
        Submit
      </Button>
    </Form>

  )
}
