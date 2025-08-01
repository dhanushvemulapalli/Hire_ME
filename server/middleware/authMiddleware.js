const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("🔐 Incoming token:", token);

  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", decoded);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
