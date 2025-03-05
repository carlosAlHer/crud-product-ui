import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const CategoryList = () => {

  const navigate = useNavigate();
  const [categories, setcategories] = useState([]);

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

  const deleteCategory = async (id) =>{
    try {
      console.log(id)
      const request = await fetch(`http://localhost:3000/api/categ/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await request.json();
      console.log(data)

       if(!data.error){
        
        setcategories((prevCategory) => prevCategory.filter((category) =>category.id != id)); 
      }
      if(data.error && data.status == "error") alert("No se puede eliminar categoría. esta asociada a un producto");

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const updateCategory = (id) =>{
    navigate(`/edit-categ/${id}`)
  }

  useEffect(() => {
    listCategories();

  }, []);


  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr >
          <th>#</th>
          <th>Name Categorie</th>
          <th>Opertations</th>
        </tr>
      </thead>
      <tbody>

        {
          categories.map((category, index) => {
            return (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>
                  <div className="d-flex justify-content-center align-items-center">
                    <Button className="mx-2 " variant="danger" onClick={e => deleteCategory(category.id)}>Delete</Button>
                    <Button className="mx-2 " variant="warning" onClick={e => updateCategory(category.id)}>Update</Button>
                  </div>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  );


}
