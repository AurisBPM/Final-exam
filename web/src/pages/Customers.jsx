import axios from 'axios';
import { useEffect, useState } from 'react';
import UpdateModal from '../components/update-modal/Update-Modal';
import DeleteModal from '../components/delete-modal/DeleteModal';
import NoCustomersInfo from '../components/no-customers-info/NoCustomersInfo';
import CustomersTable from '../components/table/CustomersTable.jsx';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerData, setCustomerData] = useState({});
  const [toDelete, setToDelete] = useState('');

  const setDialogueOpen = () => {
    setDialogOpen(true);
  };

  const setDialogueClosed = () => {
    setDialogOpen(false);
  };

  const customersUrl = 'http://localhost:8080/customers';

  const deleteCustomer = async (id) => {
    try {
      const request = await axios.delete(
        'http://localhost:8080/customers/' + id
      );
      console.log(request);
      setCustomers((oldCustomers) => {
        return oldCustomers.filter((customer) => {
          return id != customer.id;
        });
      });
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  return customers.length ? (
    <>
      <CustomersTable
        customers={customers}
        setDialogueOpen={setDialogueOpen}
        setCustomerData={setCustomerData}
        setDeleteDialogOpen={setDeleteDialogOpen}
        setToDelete={setToDelete}
      />

      <UpdateModal
        close={setDialogueClosed}
        open={isDialogOpen}
        customerData={customerData}
        setCustomerData={setCustomerData}
        setCustomers={setCustomers}
        customers={customers}
      />
      <DeleteModal
        isDeleteDialogOpen={isDeleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteCustomer={deleteCustomer}
        toDelete={toDelete}
      />
    </>
  ) : (
    <NoCustomersInfo />
  );
};

export default Customers;
