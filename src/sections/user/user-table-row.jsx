import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function UserTableRow({
  // selected,
  name,
  // avatarUrl,
  company,
  open1, 
  close,
  diff,
  // role,
  // isVerified,
  // status,
  // handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenClose = (a, b) => {
    // console.log(a.props.children, b.props.children);
    if(b.props.children - a.props.children > 0) {
      return <KeyboardDoubleArrowUpIcon style={{ color: "green" }}/>;
    }
      return <KeyboardDoubleArrowDownIcon style={{ color: "red" }}/>;
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <Avatar alt={name} src={avatarUrl} /> */}
            {/* <Typography variant="subtitle2" noWrap>
              {name}
            </Typography> */}
              <Link to={`/trades/${name.props.children}`}>{name}</Link>
          </Stack>
        </TableCell>

        <TableCell>
          <Link to={`/trades/${name.props.children}`}><Typography>{company}</Typography></Link>
        </TableCell>

        <TableCell>
          <Link to={`/trades/${name.props.children}`}><Typography>{open1}</Typography></Link>
        </TableCell>

        <TableCell>
          <Link to={`/trades/${name.props.children}`}><Typography>{close}</Typography></Link>
        </TableCell>

        <TableCell>
          <Link to={`/trades/${name.props.children}`}><Typography>{handleOpenClose(open1, close)}</Typography></Link>
        </TableCell>

        {/* <TableCell>{role}</TableCell>

        <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  // avatarUrl: PropTypes.any,
  company: PropTypes.any,
  // handleClick: PropTypes.func,
  // isVerified: PropTypes.any,
  name: PropTypes.any,
  open1: PropTypes.number,
  close: PropTypes.number,
  diff: PropTypes.any,
  // role: PropTypes.any,
  // selected: PropTypes.any,
  // status: PropTypes.string,
};
