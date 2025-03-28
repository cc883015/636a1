import React from 'react';
import './App.css'; // 或者你可以单独创建 BookList.css

const BookList = () => {
  // 假设这里有一些书籍数据（可从后端 API 获取）
  const books = [
    { id: 1, title: '书籍标题A', author: '作者A' },
    { id: 2, title: '书籍标题B', author: '作者B' },
    { id: 3, title: '书籍标题C', author: '作者C' },
  ];

  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <img src="/defaultBook.jpg" alt="Book Cover" />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
