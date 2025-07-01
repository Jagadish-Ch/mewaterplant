const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.json({
        success: false,
        message: "User not Authenticated, please login!",
      });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.body.userId = await tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "User not Authenticated, please login!",
      });
    }

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = userAuth;
