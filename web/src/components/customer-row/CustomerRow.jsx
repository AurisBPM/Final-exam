import styled from 'styled-components';
import { Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledRow = styled.tr`
  text-align: left;
`;


const CustomerRow = ({id, name, dob, email, auth_id, deleteFc, setDialogueOpen, setCustomerData}) => {

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
          <td className="btns-div">
            <Stack direction='row' spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>{ deleteFc(id)}}>Delete</Button>
            <Button variant="contained" onClick={() => {updateClick(); setDialogueOpen()}}>Update</Button>

            </Stack>
          </td>
       </StyledRow>
       
         
        
    )

}

export default CustomerRow;