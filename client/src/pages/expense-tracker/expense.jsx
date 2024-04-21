import React, { useState } from "react";
import "./expense.css"; // Import your CSS file

function ExpenseTracker() {
  // State for input values and product list
  const [totalBudget, setTotalBudget] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [numberOfProduct, setNumberOfProduct] = useState(1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);

  // Function to handle adding a new product
  const addProduct = () => {
    const newProduct = {
      name: productName.trim(),
      TotalProductNum: parseInt(numberOfProduct),
      price: parseFloat(productPrice),
    };

    // Validate input
    if (newProduct.name === "" || isNaN(newProduct.price)) {
      alert("Please enter a valid product name and price.");
      return;
    }

    // Update products list
    setProducts([...products, newProduct]);

    // Calculate total and remaining
    const newTotal = total + newProduct.price * newProduct.TotalProductNum;
    const newRemaining = totalBudget - newTotal;
    setTotal(newTotal);
    setRemaining(newRemaining);

    // Clear input fields
    setProductName("");
    setProductPrice("");
    setNumberOfProduct(1);
  };

  // Function to handle editing a product
  const editProduct = (index) => {
    const productToEdit = products[index];
    setProductName(productToEdit.name);
    setProductPrice(productToEdit.price.toFixed(2));
    setNumberOfProduct(productToEdit.TotalProductNum);
    setSelectedProductIndex(index);
  };

  // Function to handle deleting a product
  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);

    // Recalculate total and remaining
    const newTotal = updatedProducts.reduce(
      (acc, curr) => acc + curr.price * curr.TotalProductNum,
      0
    );
    const newRemaining = totalBudget - newTotal;
    setTotal(newTotal);
    setRemaining(newRemaining);
  };

  return (
    <div>
      <h1 className="heading">Product Expenses Tracker</h1>
      <div className="wrapper">
        <div className="container">
          <div className="form_wrapper">
            <form>
              <label htmlFor="total-money">Total Budget:</label>
              <input
                type="number"
                id="total_budget"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
              />
            </form>
            <form>
              <div>
                <label htmlFor="product-name">Product Name:</label>
                <input
                  type="text"
                  id="product_name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="product-price">Price:</label>
                <input
                  type="number"
                  id="product_price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="numberofproduct">Number of Product:</label>
                <input
                  type="number"
                  id="numberofproduct"
                  min="1"
                  max="100000"
                  value={numberOfProduct}
                  onChange={(e) => setNumberOfProduct(e.target.value)}
                />
              </div>
              <button type="button" onClick={addProduct}>
                Add Product
              </button>
            </form>
          </div>
          <div className="product_table_and_result">
            <table id="product_table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      {product.name} ({product.TotalProductNum}x
                      {product.price.toFixed(2)})
                    </td>
                    <td>
                      {(product.price * product.TotalProductNum).toFixed(2)}
                    </td>
                    <td>
                      <button onClick={() => editProduct(index)}>
                        <i className="uil uil-pen"></i>
                      </button>
                      <button onClick={() => deleteProduct(index)}>
                        <i className="uil uil-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="budget_tacker_info">
              <div>
                <span>Expenses</span>
                <h1 id="total_expenses">{total.toFixed(2)}</h1>
              </div>
              <div>
                <span>Remaining</span>
                <h1 id="remaining_value">{remaining.toFixed(2)}</h1>
              </div>
              <div>
                <span>Total Money</span>
                <h1 id="total">{totalBudget}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
