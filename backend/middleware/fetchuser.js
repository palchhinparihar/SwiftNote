import jwt from "jsonwebtoken";
const JWT_SECRET = "1#P5Qah9m0";

// Middleware to fetch user from JWT token.
const fetchuser = (req, res, next) => {
  // Get the authentication token from the 'auth-token' header.
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    // Verify the token using the JWT_SECRET.
    // If the token is valid, it decodes the payload data.
    const payloadData = jwt.verify(token, JWT_SECRET);
    req.user = payloadData.user;

    // Call the next route
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

export default fetchuser;