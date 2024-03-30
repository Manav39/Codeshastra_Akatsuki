import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { db } from 'src/firebase';
import { users } from 'src/_mock/user';
import { doc, getDoc, setDoc, updateDoc, collection } from 'firebase/firestore';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { usePort } from 'src/context';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';





// ----------------------------------------------------------------------

export default function UserPage() {
  const { data } = usePort();
  const navigate = useNavigate();
  const [symbols, setSymbols] = useState([
        { symbol: "AAPL", companyName: "Apple", currPrice: 171.48, open1: 171.75 },
        { symbol: "AMZN", companyName: "Amazon", currPrice: 180.38, open1: 180.17 },
        { symbol: "MSFT", companyName: "Microsoft", currPrice: 420.72, open1: 420.96 },
        { symbol: "GOOG", companyName: "Google", currPrice: 152.26, open1: 152 },
        { symbol: "NVDA", companyName: "Nvidia", currPrice:903.58 , open1: 899.95},
        { symbol: "XHB", companyName: "SPDR S&P Homebuilders ETF", currPrice: 111.59, open1: 111.16 },
        { symbol: "XLB", companyName: "The Materials Select Sector SPDR Fund", currPrice: 92.89, open1: 92.65 },
        { symbol: "XLE", companyName: "The Energy Select Sector SPDR Fund", currPrice: 94.41, open1: 93.95 },
        { symbol: "XLY", companyName: "The Consumer Discretionary Select Sector SPDR Fund", currPrice: 183.89, open1: 184.23 },
        { symbol: "XLK", companyName: "The Technology Select Sector SPDR Fund", currPrice: 208.27, open1: 208.23 },
        { symbol: "XLV", companyName: "The Health Care Select Sector SPDR Fund", currPrice: 147.73, open1: 147.92 },
        { symbol: "XLI", companyName: "The Industrial Select Sector SPDR Fund", currPrice: 125.96, open1: 126.1 },
        { symbol: "XLU", companyName: "The Utilities Select Sector SPDR Fund", currPrice: 65.65, open1: 65.19 },
        { symbol: "XLP", companyName: "The Consumer Staples Select Sector SPDR Fund", currPrice: 76.36, open1: 75.73 },
        { symbol: "XLF", companyName: "The Financial Select Sector SPDR Fund", currPrice: 42.12, open1: 35.5 },
        { symbol: "XLC", companyName: "The Communication Services Select Sector SPDR Fund", currPrice: 81.66, open1: 50.62 },
        { symbol: "XLRE", companyName: "The Real Estate Select Sector SPDR Fund", currPrice: 39.53, open1: 38.06 }
    ]);


  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

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
      await setDoc(doc(portfolioCollectionRef, 'portfolioId'), {});
      alert("Success");
    } catch (error) {
        console.error("Error adding portfolio:", error.message);
    }
  }
  
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Stocks</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'open', label: 'Open ($)' },
                  { id: 'close', label: 'Close ($)' },
                  { id: 'arrow', label: '', align: 'center' },
                  // { id: 'status', label: 'Status' },
                  // { id: '' },
                ]}
              />
              <TableBody>
                {symbols
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (

                    // <button onClick={()=>navigate(`/trades/${row.symbol}`)}>
                        <UserTableRow
                      // key={row.id}
                      name={<span style={{ textDecoration: 'none', marginLeft: 20, color: "#333", fontWeight: "bold" }}>{row.symbol}</span>}
                      // role={row.role}
                      // status={row.status}
                      company={<span style={{ textDecoration: 'none', marginLeft: 20, color: "#333", fontWeight: "bold" }}>{row.companyName}</span>}
                      open1={<span style={{ textDecoration: 'none', color: "#333", fontWeight: "bold" }}>{row.open1}</span>}
                      close={<span style={{ textDecoration: 'none', color: "#333", fontWeight: "bold" }}>{row.currPrice}</span>}
                      arrow={<span style={{ textDecoration: 'none', color: "#333", fontWeight: "bold" }}>{row.currPrice}</span>}
                      // avatarUrl={row.avatarUrl}
                      // isVerified={row.isVerified}
                      // selected={selected.indexOf(row.name) !== -1}
                      // handleClick={(event) => handleClick(event, row.name)}
                    />
                    // </button>
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={symbols.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[4, 6]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
