import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const handlePageChange = (value, setPage) => {
  setPage(value);
};

const CustomPagination = ({ numOfPages, page, setPage }) => (
  <Stack spacing={2}>
    <Pagination
      count={numOfPages}
      shape="rounded"
      page={page}
      onChange={(event, value) => handlePageChange(value, setPage)}
    />
  </Stack>
);

export default CustomPagination;
