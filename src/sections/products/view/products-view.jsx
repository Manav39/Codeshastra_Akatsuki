import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import { products } from 'src/_mock/products';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import JSONDATA from './stocks_with_names.json';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [filterName, setFilterName] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [jsonData, setJsonData] = useState();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setJsonData(JSONDATA);
  }, [])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const onFilterName = (event) => {
    setFilterName(event.target.value);
    // const a = jsonData.filter((val) => (
    //   val.symbol.toLowerCase().includes(filterName.toLowerCase()) || val.company.toLowerCase().includes(filterName.toLowerCase())
    // ))
    // setFilteredData(a);
    // console.log(a);
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Search For Stocks
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

          {/* <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort /> */}
        </Stack>
      </Stack>

      <OutlinedInput
        style={{ width: "100%" }}
          value={filterName}
          onChange={onFilterName}
          placeholder="Search Stock..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />

    {jsonData && jsonData
      .filter((val) => (
          val.symbol.toLowerCase().includes(filterName.toLowerCase()) || val.company.toLowerCase().includes(filterName.toLowerCase())
        ))
        .slice(0, 10)
        .map((row) => (
          <Paper
            key={row.symbol}
            sx={{
              padding: 2,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              border: '2px solid #ccc', // Add a border
              borderRadius: 1,         // Rounded corners
              m: 1,
            }}
          >
            <Link style={{textDecoration: "none", display: "flex"}} to={`/explore/${row.symbol}`}>
              <Typography variant="h4" sx={{ color: '#3c88d2' }}> 
                Stock: {row.company}
              </Typography>
              <Typography variant="h4" sx={{ color: 'blue', mb: 1 }}> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
              <Typography variant="h4" sx={{ color: 'teal' }}>
                ( {row.symbol} )
              </Typography>
            </Link>
          </Paper>
        ))
      }

      {/* <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid> */}

      {/* <ProductCartWidget /> */}
    </Container>
  );
}
