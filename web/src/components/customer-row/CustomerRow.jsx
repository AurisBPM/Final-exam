import { Container, Stack } from "@mui/material";


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
       <Container>
 <Stack spacing={2} direction="row">
             <div>{name}</div>
            <div>{dob}</div>
            <div>{email}</div>
          <div className="btns-div">
            <button onClick={()=>{ deleteFc(id)}}>Delete</button>
            <button onClick={() => {updateClick(); setDialogueOpen()}}>Update</button>
          </div>
        </Stack>
       </Container>
       
         
        
    )

}

export default CustomerRow;