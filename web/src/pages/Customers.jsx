import axios from "axios";
import { useEffect, useState } from "react";
import CustomerRow from "../components/customer-row/CustomerRow";
import UpdateModal from "../components/update-modal/Update-Modal";


const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [ isDialogOpen, setDialogOpen ] = useState(false);
  const [ customerData, setCustomerData ] = useState({});

  const setDialogueOpen = () => {
    setDialogOpen(true);
  }

  const setDialogueClosed = () => {
    setDialogOpen(false);
  }

  const customersUrl = "http://localhost:8080/customers";

  const deleteCustomer = async (id) => {
    try {
        const request = await axios.delete("http://localhost:8080/customers/" + id);
        setCustomers((oldCustomers) => {
           return oldCustomers.filter((customer) => {
                return id != customer.id
            })
        });
    } catch (error) {
        console.log(error);
    }
    
  }

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(customersUrl);
      console.log(response);
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className='container'>
    {customers.map((customer) => {
        return (
            <CustomerRow key={customer.id} name={customer.full_name} dob={customer.dob} email={customer.email} id={customer.id} deleteFc={deleteCustomer} setDialogueOpen={setDialogueOpen} setCustomerData={setCustomerData}/>
        )
    })}
    <UpdateModal setDialogueClosed={setDialogueClosed} isDialogOpen={isDialogOpen} customerData={customerData} setCustomerData={setCustomerData}/>
  </div>
  );
};

export default Customers;
