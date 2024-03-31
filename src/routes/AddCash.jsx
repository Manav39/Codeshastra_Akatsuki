// import React from 'react'
// import { useParams } from 'react-router-dom';

// function StockDetails() {
//   const { id } = useParams();
//   console.log(id);
//   return (
//     <div>{id}</div>
//   )
// }

// export default StockDetails
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { usePort } from 'src/context';
import InputAdornment from '@mui/material/InputAdornment';
import { auth, db } from 'src/firebase'; 
import { doc, addDoc, collection, getDoc, updateDoc } from 'firebase/firestore'
import { GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter, } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {

  const { data, selectedPortfolio } = usePort();

  function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState();
  const [price, setPrice] = useState(0);
  const [margin, setMargin] = useState(0);
  const [type, setType] = useState(0);
  const [vis, setVis] = useState(false);
  const [availableCash, setAvailableCash] = useState(0);
   const [add, setAdd] = useState(0);
  const theme = useTheme();

  useEffect(() => {
   
  },[])


  
  const handleAddCash = async () => {
    try {
        // Get the current value of the 'total' field
      

        // Increment the 'total' field by 1
        // await updateDoc(userRef, {
        //     total: totalPortfolios + 1
        // });

        // Create a new collection for the portfolio
        // const portfolioName = `P${totalPortfolios + 1}`;
      
        const cashRef = doc(db, 'users', data?.user?.uid, selectedPortfolio, "cash");
        const snap = await getDoc(cashRef);
        const totalcash = parseFloat(snap.data().cash) || 0;

        // Convert add to a number if it's not already
        const addNumber = parseFloat(add) || 0;

        await updateDoc(cashRef, {
        cash: totalcash + addNumber,
        });

          alert("Success");
    } catch (error) {
        console.error("Error adding portfolio:", error.message);
    }
  }
 
    
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h5">Add Cash</Typography>


           <>
      <Stack spacing={3} style={{marginTop:"20px"}}>        
              <TextField name="Add Cash" label="Add cash" onChange = {(e) => setAdd(e.target.value)}  />
      </Stack>

      <LoadingButton
        style={{marginTop:"20px", backgroundColor:"green"}}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleAddCash}
      >
        Add
      </LoadingButton>
    </>
        </Card>
      </Stack>
    </Box>
  );
}
