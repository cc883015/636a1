// src/components/TaskForm.jsx

import React, { useState } from 'react';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可以调用后端接口添加任务/图书等
    console.log('提交的任务:', taskName);
    // 重置
    setTaskName('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>管理员面板 - 添加任务示例</h2>
      <form onSubmit={handleSubmit}>
        <label>任务名称：</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit">添加</button>
      </form>
    </div>
  );
};

export default TaskForm;
