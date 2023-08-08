import axios from "axios";
import { useEffect, useState } from "react";
import CustomerRow from "../components/customer-row/CustomerRow";
import UpdateModal from "../components/update-modal/Update-Modal";
import DeleteModal from "../components/delete-modal/DeleteModal";
import { Typography } from "@mui/material";


const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [ isDialogOpen, setDialogOpen ] = useState(false);
  const [ isDeleteDialogOpen, setDeleteDialogOpen ] = useState(false);
  const [ customerData, setCustomerData ] = useState({});
  const [ toDelete, setToDelete ] = useState("");

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
        console.log(request);
        setCustomers((oldCustomers) => {
           return oldCustomers.filter((customer) => {
                return id != customer.id
            })
        });
        setDeleteDialogOpen(false);
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
    <>
    <Typography variant="h4" sx={{ paddingTop: '2rem', textAlign: 'center' }}>Registered customers</Typography>
    <table className='container'>
        <thead>
            <tr>
                <th>Full Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {customers.map((customer) => {
        return (
            <CustomerRow key={customer.id} name={customer.full_name} dob={customer.dob} email={customer.email} id={customer.id} setDialogueOpen={setDialogueOpen} setCustomerData={setCustomerData} setDeleteDialogOpen={setDeleteDialogOpen} setToDelete={setToDelete}/>
        )
    })}
        </tbody>
  

  </table>
    
    <UpdateModal setDialogueClosed={setDialogueClosed} isDialogOpen={isDialogOpen} customerData={customerData} setCustomerData={setCustomerData} setCustomers={setCustomers} customers={customers} />
<DeleteModal isDeleteDialogOpen={isDeleteDialogOpen} setDeleteDialogOpen={setDeleteDialogOpen} deleteCustomer={deleteCustomer} toDelete={toDelete}/>
    </>
 
  
  );
};

export default Customers;
