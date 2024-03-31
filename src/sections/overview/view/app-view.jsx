import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Container from '@mui/material/Container';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import Card from "@mui/material/Card";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import { usePort } from 'src/context';
import Iconify from 'src/components/iconify';
import { db } from 'src/firebase';
import { doc, getDoc, setDoc, updateDoc, collection,addDoc, getDocs,query,deleteDoc,where } from 'firebase/firestore';
import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';




// ----------------------------------------------------------------------

export default function AppView() {
  const { data,setPortfolio, selectedPortfolio, setSelectedPortfolio } = usePort();
  const [port, setPort] = useState("");
  const [prices, setPrices] = useState({});
  const [symbol, setSymbol] = useState("");
  const [stockDetails, setStockDetails] = useState([])
  const [history, setHistory] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [values, setValues] = useState(['P1', 'P2', 'P3']);
  const [balance, setBalance] = useState(0);
  const [investment, setInvestment] = useState(0);

  const addPortfolio = async () => {
    try {
        // Get the current value of the 'total' field
        const userRef = doc(db, 'users', data?.user?.uid);
        const userSnapshot = await getDoc(userRef);
        const totalPortfolios = userSnapshot.data().total || 0;

        // Increment the 'total' field by 1
        await updateDoc(userRef, {
            total: totalPortfolios + 1
        });

        // Create a new collection for the portfolio
        const portfolioName = `P${totalPortfolios + 1}`;
        const portfolioCollectionRef = collection(db, 'users',data?.user?.uid, portfolioName);
        await setDoc(doc(portfolioCollectionRef, 'cash'),  {
          cash:100000,
          portfolio:portfolioName
        });
        setValues([...values, `P${totalPortfolios + 1}`]);
          alert("Success");
    } catch (error) {
        console.error("Error adding portfolio:", error.message);
    }
  }

  useEffect(() => {
    const fetchPortfolios = async () => {
      setSymbol("");
      setStockDetails("");
      const q = query(collection(db, "users", data?.user?.uid,selectedPortfolio),
      where('sellprice', '==', 0)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach((docc) => {
        setStockDetails((stockDet) => [...stockDet, docc.data()]);
        setSymbol((sym) => [...sym, docc.data().symbol]);
      })

      setStockDetails(prevStockDetails => prevStockDetails.slice(0, -1));
      setSymbol(prevSymbol => prevSymbol.slice(0, -1));
      // const que = query(collection(db, "users", data?.user?.uid,selectedPortfolio));
      // const snap = await getDocs(que);
      // snap.forEach((dod) => {
      //   console.log(dod.data());
      // })
    }
    fetchPortfolios();

    const getDetails = async() => {
      const cashRef = doc(db, 'users', data?.user?.uid,selectedPortfolio,"cash");
      const snap = await getDoc(cashRef);
      const totalcash = snap.data().cash;
      console.log(totalcash);
      setBalance(totalcash);
      setInvestment(100000 - totalcash);
    }
    getDetails();
    // const getCurPrice = async () => {
    //   setCurr("");
      
    // }
    // getCurPrice();

    const fetchPrice = async (sym) => {
      try {
        const response = await axios.get(`https://api.polygon.io/v1/open-close/${sym}/2024-03-28?adjusted=true&apiKey=6FKmFhdfak1SRxi15scxDwj2II16RQV3`);
        // console.log("resp : ", response.data.close);
        return [sym, response.data.close];
      } catch (error) {
        console.error('Error fetching price for sym', sym, ':', error);
        return [sym, null];
      }
    };

     const fetchData = async () => {
      try {
        const priceData = await Promise.all(symbol.map(sym => fetchPrice(sym)));
        const priceMap = Object.fromEntries(priceData);
        setPrices(priceMap);
      } catch (error) {
        console.error('Error fetching stock prices:', error);
      }
    };

    fetchData();

    const fetchHistory = async () => {
          const qur = query(
          collection(db, "users", data?.user?.uid, selectedPortfolio),
          where('sellprice', '!=', 0),
        );

        const snapper = await getDocs(qur);
        setHistory("");
        snapper.forEach(async (doccc) => {
          setHistory((hist) => [...hist, doccc.data()]);
        })
        
        setHistory(histo => histo.slice(0, -1));
        }

    fetchHistory();

  }, [data, selectedPortfolio])

  const fetchPrice = async (sym) => {
    try {
      const response = await axios.get(`https://api.polygon.io/v1/open-close/${sym}/2024-03-28?adjusted=true&apiKey=6FKmFhdfak1SRxi15scxDwj2II16RQV3`);
      // console.log("resp : ", response.data.close);
      return [sym, response.data.close];
    } catch (error) {
      console.error('Error fetching price for sym', sym, ':', error);
      return [sym, null];
    }
  };
  
  //  const getCmp = async(symbol) => {
  //     const res = await axios.get(`https://api.polygon.io/v1/open-close/${symbol}/2023-01-09?adjusted=true&apiKey=6FKmFhdfak1SRxi15scxDwj2II16RQV3`)
  //     console.log(res.data.close);
  //   }

  
  const handleExit = async(item) => {
    console.log(item.quantities * prices[item.symbol]);
    const cashRef = doc(db, 'users', data?.user?.uid,selectedPortfolio,"cash");
    const snap = await getDoc(cashRef);
    const totalcash = snap.data().cash || 0;
    await updateDoc(cashRef, {
      cash: totalcash + item.quantities * prices[item.symbol],
    });

    const q = query(
      collection(db, "users", data?.user?.uid, selectedPortfolio),
      where('symbol', '==', item.symbol),
      where('quantities', '==', item.quantities)
    );
    const snapsot = await getDocs(q);

    snapsot.forEach(async (docc) => {
      const docRef = doc(db, "users", data?.user?.uid, selectedPortfolio, docc.id);
      await updateDoc(docRef, {
        sellprice: prices[item.symbol]
      });
    });

    const qur = query(
      collection(db, "users", data?.user?.uid, selectedPortfolio),
      where('sellprice', '!=', 0),
    );

    const snapper = await getDocs(qur);
    setHistory("");
    snapper.forEach(async (doccc) => {
      setHistory((hist) => [...hist, doccc.data()]);
    })
    
    setHistory(histo => histo.slice(0, -1));

    

    alert("Success");
    // try {
    //   const orderRef = doc(db, 'users', data?.user?.uid, selectedPortfolio);
    //   const querySnapshot = await getDocs(orderRef);
    //   querySnapshot.forEach(async (doco) => {
    //     await deleteDoc(doco.ref);
    //     console.log('Document successfully deleted!');
    //   });
    // }
    // catch (err) {
    //   console.error('Error deleting documents: ', err);
    // }

  }
  
  // console.log("Manav : ", stockDetails);
  // console.log("Prices : ",prices)
  console.log("Hist : ", history);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setSelectedPortfolio(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, {data?.user?.displayName} 👋
        </Typography>

        <Typography variant="h5" sx={{ mb: 5 }} style={{marginTop: 20}}>
          Portfolio { selectedValue }
        </Typography>
        
        <select value={selectedPortfolio} onChange={handleChange}
          style={{
            backgroundColor: '#f2f2f2', // Light background
            border: '1px solid #ccc', // Border
            borderRadius: '4px', // Rounded corners
            padding: '8px 12px', // Padding for content
            fontSize: '16px', // Font size
            cursor: 'pointer', // Pointer cursor on hover
            width: "400px",
            height: "70px"
          }}
        >
          {values.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={addPortfolio} sx={{
          height:"40px"
        }}>
            Add Portfolio
         </Button>
      </div>
      <Grid container spacing={3}>

        <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Balance"
              total={balance === 0 ? "0" : balance}
              color="error"
              icon={<AttachMoneyOutlinedIcon sx={{ fontSize: '3rem' }} />}
            />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Investment Value"
            total={investment}
            color="success"
            icon={<ShoppingBagOutlinedIcon sx={{ fontSize: '3rem' }}/>}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Change"
            total={1352831}
            color="info"
            icon={<AttachMoneyOutlinedIcon sx={{ fontSize: '3rem' }} />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary

            title="Day's Change"
            total={1723315}
            color="warning"
            icon={<CurrencyExchangeOutlinedIcon sx={{ fontSize: '3rem' }} />}
          />
        </Grid>

        

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="My Portfolio"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Allocation Precentage"
            chart={{
              series: [
                { label: 'Apple (AAPL)', value: 1 },
                { label: 'Microsoft (MSFT)', value: 2 },
                { label: 'Google (GOOG)', value: 3 },
                { label: 'Amazon (AMZN)', value: 4 },
                { label: 'Nvidia (NVDA)', value: 5 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Metrics"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Metrics"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <Typography variant="h2" sx={{ mb: 2 }} style={{margin: 20}}>Current Positions</Typography>
          {stockDetails && stockDetails?.map((detail, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card variant="outlined" style={{display:"flex",justifyContent:"space-between"}}>
                <CardContent>
                  <Typography variant="body2">Symbol: {detail.symbol}</Typography>
                  <Typography variant="body2">Buy Price: {detail.buyprice}</Typography>
                  <Typography variant="body2">Quantities: {detail.quantities}</Typography>
                  <Typography variant="body2">Date: {detail.date}</Typography>
                  <Typography variant="body2">Current Price : {prices[detail.symbol]}</Typography>
                  {/* <Typography variant="body2">Current Price : {getCmp(details.symbol)}</Typography> */}
                 {/* {getCmp(detail.symbol)} */}
                </CardContent>
                <LoadingButton
                  style={{marginTop:"30px", backgroundColor: (prices[detail.symbol] - detail.buyprice) > 0 ? "green" : "red",
                  width:"200px",marginLeft:"20px",height:"10px", marginRight: "20px"}}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={()=>handleExit(detail)}
                >
                  Exit Order
              </LoadingButton>
              </Card>
            </Grid>
          ))}
          {/* <AppNewsUpdate
            title="Current Positions"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          /> */}
        </Grid>

        <Grid xs={12} md={6} lg={4} >
        <Typography variant="h3" sx={{ mb: 2 }} style={{margin: 20}}>Transaction History</Typography>
          {history && history.map((histo) => (
              <>
                <Typography>Buy Price : {histo.buyprice}</Typography>
                <Typography>Sell Price : {histo.sellprice}</Typography>
                <Typography>Date  : {histo.date}</Typography>
                <Typography>Symbol : {histo.symbol}</Typography>
              </>
            )
          )}
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
