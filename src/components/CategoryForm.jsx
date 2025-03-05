import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const CategoryForm = () => {


  const navigate = useNavigate();
  const param = useParams();
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");

 
  const getCategory = async () => {

    try {
      const request = await fetch(`http://localhost:3000/api/categ/${param.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await request.json();
   
      setCategory(data || []);
      setFormValues(category);

    } catch (error) {
      console.error('Error:', error);
    }

  }

  const setFormValues = (categoryData ) => {
    setName(categoryData.name || "")
  }

   useEffect(() => {
      if (param.id) {
        getCategory()
      }
  
    }, [param]);
  
    useEffect(() => {
      if (category) {
        setFormValues(category)
      }
  
    }, [category]);

  const saveCategorie = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const categoryData = {
      id: null,
      name: formData.get('name'),
    };
    
    const requestConfig = {
      method: 'POST', // Método base es POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData), // Body para POST
    };

    if(category && param && param.id){
      requestConfig.method = 'PUT';
      categoryData.id = param.id;
      requestConfig.body =  JSON.stringify(categoryData)
    }

    try {
      const response = await fetch(`http://localhost:3000/api/categ`, requestConfig);
      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      if (result.error) {
        throw new Error('Error al enviar los datos');
      }
      navigate("/list-categ");


    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Form className='p-3 border border-dark' onSubmit={(e) => saveCategorie(e)}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          name='name' 
          type="text" 
          placeholder="Enter Name Categorie" 
          required
          value={name}
          onChange={e => setName(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" className="w-100 mt-4" >
        Submit
      </Button>
    </Form>
  )
}
