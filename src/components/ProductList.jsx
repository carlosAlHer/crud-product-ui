import React, { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { useState } from 'react';

export const ProductList = () => {

  const [products, setProducts] = useState([]);

  const listProducts = async () => {

    const request = await fetch(`http://localhost:3000/api/prd`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();
    setProducts(data.documents || []);

  }

  useEffect(() => {
    listProducts();

  }, []);

  console.log(products);
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>

      {   
          products.map((product, index) => {
            return (
              <tr key={product.id}>
                <td>{index+1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td><i class="bi bi-pencil-square"></i></td>
              </tr>
            )
          })
        } 

      </tbody>
    </Table>
  );
}



