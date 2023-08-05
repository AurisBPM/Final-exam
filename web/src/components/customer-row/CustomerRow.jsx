import { Stack } from "@mui/material";


const CustomerRow = ({id, name, dob, email, auth_id, deleteFc}) => {



    return (

        <Stack spacing={2} direction="row">
             <div>{name}</div>
            <div>{dob}</div>
            <div>{email}</div>
          <div className="btns-div">
            <button onClick={()=>{ deleteFc(id)}}>Delete</button>
            <button>Update</button>
          </div>
        </Stack>
         
        
    )

}

export default CustomerRow;