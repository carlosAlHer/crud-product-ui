import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

export const CategoryList = () => {
  
    const [categories, setcategories] = useState([]);

    const listCategories = async () => {
  
      const request = await fetch(`http://localhost:3000/api/categ`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const data = await request.json();
      setcategories(data.documents || []);
  
    }
  
    useEffect(() => {
      listCategories();
  
    }, []);
  
   
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name Categorie</th>
          </tr>
        </thead>
        <tbody>
  
        {   
            categories.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>{index+1}</td>
                  <td>{product.name}</td>
                </tr>
              )
            })
          } 
  
        </tbody>
      </Table>
    );
  
  
}
