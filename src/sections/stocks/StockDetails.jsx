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
import InputAdornment from '@mui/material/InputAdornment';
import { auth } from 'src/firebase'; 
import { GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter, } from 'src/routes/hooks';
import { usePort } from 'src/context';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {

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
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const currDate = getFormattedDate(new Date());
    axios.get(`https://api.polygon.io/v3/reference/tickers/${id}?date=${currDate}&apiKey=6FKmFhdfak1SRxi15scxDwj2II16RQV3`)
      .then((data) => {
        console.log(data?.data?.results)
        setName(data?.data?.results?.name)
        console.log(name)
        setType(data?.data?.results?.type)
      })
      .catch((err) => console.error(err))
    
    await axios.get(`https://api.polygon.io/v1/open-close/${id}/2024-03-28?adjusted=true&apiKey=6FKmFhdfak1SRxi15scxDwj2II16RQV3`)
      .then((data) => {
        setPrice(data?.data?.close);
      })
      .catch((err) => console.error(err))
    }

    fetchData();

  },[id,name,type])

  const handleClick = async() => {
    
  };

  const handleChange = (e) => {
    setQuantity(e);
    setMargin(price *e);
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
          <Typography variant="h2">{id}</Typography>
          <Typography variant="h5">Name : {name}</Typography>


           <>
      <Stack spacing={3} style={{marginTop:"20px"}}>        
              <TextField name="type" label="Type" value={type}  />
              <TextField name="quantity" label="Enter Quantity" value={quantity} onChange={(e) => handleChange(e.target.value)} />
              <TextField name="price" label="Current Price" value={price}  />
              <TextField name="margin" label="Margin Required" value={margin}  />
              <TextField name="marginavailable" label="Availabe Margin" value="$100000"  />
      </Stack>

      <LoadingButton
        style={{marginTop:"20px", backgroundColor:"green"}}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Buy
      </LoadingButton>
    </>
        </Card>
      </Stack>
    </Box>
  );
}
