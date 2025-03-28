import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Tasks = () => {
  const [books, setBooks] = useState([]);
  const { token, role } = useContext(AuthContext);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!token) return alert('请先登录');
    try {
      await axios.delete(`/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBooks();
    } catch (err) {
      alert('删除失败');
    }
  };

  return (
    <div>
      <h2>书籍列表</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <strong>{book.title}</strong> - {book.author}
            {role === 'admin' && (
              <button onClick={() => handleDelete(book._id)}>删除</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
