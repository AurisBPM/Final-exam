import CustomerRow from "../customer-row/CustomerRow";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
  padding-bottom: 2rem;
`;

const CustomersTable = ({customers, setDialogueOpen, setCustomerData, setDeleteDialogOpen, setToDelete}) => {

    return (
        <StyledContainer>
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
        </StyledContainer>
    
    )
}

export default CustomersTable;