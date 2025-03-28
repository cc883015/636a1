// frontend/src/components/BookList.jsx

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import defaultCover from '../asset/default-book.jpg';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', description: '' });
  const { token, role } = useContext(AuthContext);

  // 初始化时拉取书籍列表
  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  // 从后端获取所有书籍
  const fetchBooks = async () => {
    try {
      const res = await axios.get('/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error('获取书籍列表失败:', err);
    }
  };

  // 删除书籍（仅管理员）
  const handleDelete = async (bookId) => {
    if (!token) {
      alert('请先登录');
      return;
    }
    try {
      await axios.delete(`/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('删除成功');
      fetchBooks(); // 重新获取列表
    } catch (err) {
      alert('删除失败');
    }
  };

  // 创建新图书（仅管理员）
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('请先登录');
      return;
    }

    try {
      await axios.post(
        '/api/books',
        { ...newBook },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('创建成功');
      // 清空输入框
      setNewBook({ title: '', author: '', description: '' });
      fetchBooks();
    } catch (err) {
      alert('创建失败');
    }
  };

  return (
    <div style={styles.container}>
      <h2>书籍列表（3列网格展示）</h2>

      {/* 管理员才显示“添加”表单 */}
      {role === 'admin' && (
        <div style={styles.addForm}>
          <h4>添加新图书</h4>
          <form onSubmit={handleCreate} style={styles.form}>
            <input
              type="text"
              placeholder="书名"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="作者"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              required
            />
            <textarea
              placeholder="简介"
              value={newBook.description}
              onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
              style={{ resize: 'none' }}
            />
            <button type="submit">创建</button>
          </form>
        </div>
      )}

      {/* 以 CSS Grid 方式显示，每行 3 列，多余书籍自动换行 */}
      <div style={styles.gridContainer}>
        {books.map((book) => (
          <div style={styles.card} key={book._id}>
            <img src={defaultCover} alt="默认封面" style={styles.cover} />
            <div style={styles.info}>
              <strong>{book.title}</strong>
              <p>{book.author}</p>
              {/* 仅管理员显示“删除”按钮 */}
              {role === 'admin' && (
                <button style={styles.deleteBtn} onClick={() => handleDelete(book._id)}>
                  删除
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px'
  },
  addForm: {
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxWidth: '300px'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 一行三列
    gap: '20px'
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    overflow: 'hidden',
    textAlign: 'center'
  },
  cover: {
    width: '100%',
    height: 'auto'
  },
  info: {
    padding: '10px'
  },
  deleteBtn: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginTop: '5px'
  }
};

export default BookList;
