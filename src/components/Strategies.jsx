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
import { auth, db } from 'src/firebase'; 
import { doc, addDoc, collection, getDoc, updateDoc } from 'firebase/firestore'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { usePort } from 'src/context';
import { bgGradient } from 'src/theme/css';
import Logo from 'src/components/logo';
import strat1 from 'src/backend/strategy1';
// ----------------------------------------------------------------------

export default function Strategies() {

  const { data, selectedPortfolio } = usePort();
    const [topp3, setTopp3] = useState([]);
    const [balance, setBalance] = useState(0);
    const [price, setPrice] = useState(0);
  function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

   const [allocation, setAllocation] = useState(0);
  const theme = useTheme();

  useEffect(() => {
      const top3 = strat1();
      setTopp3(top3);
    
  },[selectedPortfolio,allocation,data])

    const getDetails = async() => {
      const cashRef = doc(db, 'users', data?.user?.uid,selectedPortfolio,"cash");
      const snap = await getDoc(cashRef);
        let totalcash = snap.data().cash;
    
       totalcash -= allocation / 100 * totalcash;
       console.log("Total cash",totalcash)
        setBalance(totalcash);
        
        
        await updateDoc(cashRef, {
        cash: totalcash,
        });

        // console.log(topp3)
        const portfolioCollectionRef = collection(db, 'users',data?.user?.uid, selectedPortfolio);
        const res = await axios.get(`https://api.polygon.io/v1/open-close/${topp3[0]}/2023-03-28?adjusted=true&apiKey=6FKmFhdfak1SRxi15scxDwj2II16RQV3`)

        
        await addDoc(portfolioCollectionRef, {
          quantities: allocation/3,
          buyprice: res?.data?.close,
          portfolio: selectedPortfolio,
          sellprice: 0,
          symbol: topp3[0],
          date:getFormattedDate(new Date()),
        });

        const res2 = await axios.get(`https://api.polygon.io/v1/open-close/${topp3[1]}/2023-03-28?adjusted=true&apiKey=6FKmFhdfak1SRxi15scxDwj2II16RQV3`)

        
        await addDoc(portfolioCollectionRef, {
          quantities: allocation/3,
          buyprice: res2?.data?.close,
          portfolio: selectedPortfolio,
          sellprice: 0,
          symbol: topp3[1],
          date:getFormattedDate(new Date()),
        });

        const res3 = await axios.get(`https://api.polygon.io/v1/open-close/${topp3[2]}/2023-03-28?adjusted=true&apiKey=6FKmFhdfak1SRxi15scxDwj2II16RQV3`)

        
        await addDoc(portfolioCollectionRef, {
          quantities: allocation/3,
          buyprice: res3?.data?.close,
          portfolio: selectedPortfolio,
          sellprice: 0,
          symbol: topp3[2],
          date:getFormattedDate(new Date()),
        });

        alert("Success");


    }

    console.log(balance);
    
  const handleAddCash = async () => {
    // try {
    //     // Get the current value of the 'total' field
      

    //     // Increment the 'total' field by 1
    //     // await updateDoc(userRef, {
    //     //     total: totalPortfolios + 1
    //     // });

    //     // Create a new collection for the portfolio
    //     // const portfolioName = `P${totalPortfolios + 1}`;
      
    //     const cashRef = doc(db, 'users', data?.user?.uid, selectedPortfolio, "cash");
    //     const snap = await getDoc(cashRef);
    //     const totalcash = parseFloat(snap.data().cash) || 0;

    //     // Convert add to a number if it's not already
    //     const addNumber = parseFloat(add) || 0;

    //     await updateDoc(cashRef, {
    //     cash: totalcash + addNumber,
    //     });

    //       alert("Success");
    // } catch (error) {
    //     console.error("Error adding portfolio:", error.message);
    // }
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
              <Typography variant="h2" sx={{ marginBottom: "20px" }}>Strategy 1</Typography>
              <Typography variant="h5" sx={{marginBottom:"20px"}}>Sector Relative Strength - Mebane Faber</Typography>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
              >
                  
          <Typography variant="h5">Allocation Percentage</Typography>
          

           <>
      <Stack spacing={3} style={{marginTop:"20px"}}>        
              <TextField name="Add Percent" label="Add percent" onChange = {(e) => setAllocation(e.target.value)}  />
      </Stack>
                      <Typography sx={{marginTop:"20px"}}>Top 3 ETFs : {topp3[0]} {topp3[1]} {topp3[2]}</Typography>
      <LoadingButton
        style={{marginTop:"20px", backgroundColor:"green"}}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={getDetails}
      >
        Add
      </LoadingButton>
    </>
        </Card>
      </Stack>
    </Box>
  );
}
