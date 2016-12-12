import React from 'react';
import BookBoxContainer from '../../containers/BookBoxContainer';
const HomePage = ({
  books
}) => (
  <div>
   {
   	books.map((book,bookID)=>(
      <BookBoxContainer book = {book} key={bookID} />
   	)).toJS()
   }

  </div>
);
export default HomePage;