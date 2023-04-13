import * as React from 'react';
import Pagination from '@mui/material/Pagination';


export default function BasicPagination(props) {

    const passPageToParent = (event, value)=>{props.childToParent(value)}

  return (

      <Pagination 
        count={props.count} 
        onChange={passPageToParent} 
    />

  );
}