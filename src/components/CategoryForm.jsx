import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

export const CategoryForm = () => {
  const navigate = useNavigate();
  
  const saveCategorie = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    
     const productData = {
      name: formData.get('name'), 
    }; 
    console.log(productData);

    try {
      const response = await fetch(`http://localhost:3000/api/categ`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
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
    <Form className='p-3 border border-dark' onSubmit={(e)=>saveCategorie(e)}>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridName">
        <Form.Label>Name</Form.Label>
        <Form.Control name='name' type="text" placeholder="Enter Name Categorie" required/>
      </Form.Group>
    </Row>
    


    <Button variant="primary" type="submit" className="w-100 mt-4" >
      Submit
    </Button>
  </Form>
  )
}
