import React from 'react';
import BookBoxContainer from '../../containers/BookBoxContainer';
const HomePage = ({
  books
}) => (
  <div>
   {
   	books.map((book,index)=>(
      <BookBoxContainer book = {book} key={index} />
   	)).toJS()
   }

  </div>
);
export default HomePage;