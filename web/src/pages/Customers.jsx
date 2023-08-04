import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Customers = () => {

  const [customers, setCustomers] = useState([]);

  const customersUrl = "http://localhost:8080/customers";

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(customersUrl);
      console.log(response);
      setCustomers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <h1>Customers page</h1>
    </>
  );
};

export default Customers;
