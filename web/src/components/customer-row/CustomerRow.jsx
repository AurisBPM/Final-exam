import styled from 'styled-components';
import { Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledRow = styled.tr`
  text-align: left;
`;

const StyledBtnsTd = styled.td`
  text-align: left;
  width: 8rem;
`;


const CustomerRow = ({id, name, dob, email, setDialogueOpen, setCustomerData, setDeleteDialogOpen, setToDelete}) => {

const updateClick = () => {

    const customer = {
        id: id,
        name: name,
        dob: dob,
        email: email
    }

    setCustomerData(customer);
}

    return (
       <StyledRow>
             <td>{name}</td>
            <td>{dob}</td>
            <td>{email}</td>
          <StyledBtnsTd>
            <Stack direction='row' spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>{ setDeleteDialogOpen(true); setToDelete(id)}}>Delete</Button>
            <Button variant="contained" onClick={() => {updateClick(); setDialogueOpen()}}>Update</Button>

            </Stack>
          </StyledBtnsTd>
       </StyledRow>
       
         
        
    )

}

export default CustomerRow;