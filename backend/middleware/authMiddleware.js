const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  try {
    // 获取并验证请求头中的认证信息
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '认证令牌缺失或格式错误' });
    }

    // 提取并验证令牌
    const token = authHeader.split(' ')[1];
    
    // 解码令牌
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 将用户信息添加到请求对象中
    req.user = { userId: decoded.userId, role: decoded.role };
    
    next();
  } catch (err) {
    // 针对不同类型的JWT错误提供更具体的响应
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: '认证令牌已过期' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: '无效的认证令牌' });
    } else {
      return res.status(500).json({ message: '认证过程中发生错误' });
    }
  }
};
