const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // هنا نثبت شكل req.user
    req.user = {
      id: decoded.id,
      isAdmin: decoded.isAdmin || false,
    };

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};


exports.adminMiddleware = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};
