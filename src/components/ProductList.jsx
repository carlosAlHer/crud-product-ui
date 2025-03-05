import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const listProducts = async () => {

    try {
      const request = await fetch(`http://localhost:3000/api/prd`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await request.json();
      setProducts(data || []);


    } catch (error) {
      console.error('Error:', error);
    }

  }

  useEffect(() => {
    listProducts();

  }, []);


  const handleDetail = (id) => {
    navigate(`/detail-prd/${id}`);
  };

  const deleteProduct = async (id) => {
    try {
      const request = await fetch(`http://localhost:3000/api/prd/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await request.json();
      console.log(data)
      
      if(!data.error){
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }


  const updateProduct = (id) => {

    navigate(`/edit-prd/${id}`)

  }
  return (
    <Table striped bordered hover variant="" size="sm" >
      <thead>
        <tr>
          <th>#</th>
          <th>Name Product</th>
          <th>Description Product</th>
          <th>Price Product</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>

        {
          products.map((product, index) => {
            return (
              <tr key={product.id}>
                
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                
                <td>

                  <div  className="d-flex  justify-content-center align-items-center">
                    <Button className="mx-2" variant="success" onClick={e => handleDetail(product.id)}>Detail</Button>
                    <Button className="mx-2" variant="danger" onClick={e => deleteProduct(product.id)}>Delete</Button>
                    <Button className="mx-2" variant="warning" onClick={e => updateProduct(product.id)}>Update</Button>
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



