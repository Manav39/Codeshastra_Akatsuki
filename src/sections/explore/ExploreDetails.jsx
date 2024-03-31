import axios from 'axios';
import React, { useEffect,useState, } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

function ExploreDetails() {
    const { id } = useParams();
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchDetails() {
        await axios
          .get(`https://api.polygon.io/v3/reference/tickers/${id}?apiKey=A1Ap0EgnQ7NJePs3kR0lvxp4jMCIoRSi`)
          .then((data) => setDetails(data?.data?.results));
      }
      fetchDetails();
    }, [id]);

    function formatNumber(number, decimals = 2) {
        if (number === 0) return "0";
      
        const suffixes = ["", "K", "M", "B", "T", "P", "E"];
        const magnitude = Math.floor(Math.log10(Math.abs(number)) / 3);
        const suffix = suffixes[magnitude];
        const normalized = parseFloat((number / 10 ** (magnitude * 3)).toFixed(decimals));
      
        return `${normalized}${suffix}`;
      }
  
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}> {/* Centered with top margin */}
        <Grid container spacing={4}> {/* Consistent spacing */}
          <Grid item xs={12}>
            <Card sx={{ mb: 3 }}> {/* Card for detail grouping */}
            <Typography variant="h2" sx={{ mb: 2 }} style={{margin: 20}}>
                {details.name}
            </Typography>
            <Link to={`${details.homepage_url}`}>
                <Typography variant="h6" sx={{ mb: 2 }} style={{margin: 20}}>
                    {details.homepage_url}
                </Typography>
            </Link>
              <CardHeader style={{marginTop: -20}} title={`Listed on: ${details.list_date}`} sx={{ mb: 3 }} /> {/* Card header for clarity */}
              <CardContent>
                <Typography style={{marginTop: -20}} variant="h5" sx={{ mb: 2 }}>
                  Market Cap: ${formatNumber(details.market_cap)}
                </Typography>
                <Typography variant="h3" sx={{ mb: 2 }}>
                  {details.sic_description}
                </Typography>
                <Typography variant="body1">
                  {details.description}
                </Typography>
              </CardContent>
              
            </Card>
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/trades/${details.ticker}`)}
                style={{backgroundColor: "green"}}
            >
                Buy
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  export default ExploreDetails;