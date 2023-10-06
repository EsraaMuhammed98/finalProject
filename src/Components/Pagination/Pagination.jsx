import React from 'react';
import styles from './Pagination.module.css';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

export default function Pagination({pageCount , handlePages}) {
  const [currentPage, setCurrentPage] = useState(1);
  return <>
    <ReactPaginate
       nextLabel="next >"
       pageRangeDisplayed={3}
       marginPagesDisplayed={2}
       pageCount={pageCount}
      onPageChange={handlePages}
       previousLabel="< previous"
       pageClassName="page-item"
       pageLinkClassName="page-link"
       previousClassName="page-item"
       previousLinkClassName="page-link"
       nextClassName="page-item"
       nextLinkClassName="page-link"
       breakLabel="..."
       breakClassName="page-item"
       breakLinkClassName="page-link"
       containerClassName={"pagination justify-content-center my-5"}
       activeClassName="active"
       renderOnZeroPageCount={null}
      />
  </>
}
