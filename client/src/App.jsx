import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus("loading");
      try {
        const response = await axios.get("http://localhost:4001/products");
        setProducts(response.data.data);
        setStatus("complete");
      } catch (error) {
        console.error("Error fetching products:", error);
        setStatus("failed");
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {status === "loading" && <h1>Loading...</h1>}
        {status === "failed" && <h1>Fetching Error...</h1>}
        {status === "complete" &&
          products.map((product) => (
            <div className="product" key={product.id}>
              <div className="product-preview">
                <img
                  src={product.image || "https://via.placeholder.com/350/350"}
                  alt={product.name}
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => handleDelete(product.id)}
              >
                x
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
