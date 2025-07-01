const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter  = require("../config/nodemailer");

// Register a user
const register = async (req, res) => {

  const { name, email, password } = req.body;

  console.log(name, email, password);

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    const existedUser = await userModel.findOne({ email });

    if (existedUser?.isAccountVerified) {
      return res.json({
        success: false,
        message: "User Already Existed with this Email-Id",
      });
    }

    if(existedUser?.isAccountVerified === false) {
      await userModel.deleteOne({email});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    const user = await new userModel({ name, email, password: hashedPassword, verifyOtp: otp, verifyOtpExpireAt });

    await user.save();

    // Send verify otp email to user email
    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify OTP",
      text: `Dear ${name},\nYour Verify OTP is ${otp}.\nPlease use this OTP for verify your account within 24 hours otherwise this OTP will expires.`,
    };

    await transporter.sendMail(emailOptions);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      message: "OTP Sent successfully to the Registered Email!"
    })
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Missing Details Email-Id and Password required",
    });
  }

  try {
    const userExist = await userModel.findOne({ email });

    if (!userExist) {
      return res.json({
        success: false,
        message: "User not found with this Email-Id",
      });
    }

    if (userExist.isAccountVerified === false) {
      await userExist.deleteOne({email})
      return res.json({
        success: false,
        message: "User not found with this Email-Id",
      });
    }

    const matchedPassword = await bcrypt.compare(password, userExist.password);

    if (!matchedPassword) {
      return res.json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userData = {
      authenticate: true,
      user: {
        role: "user",
        userName: userExist.name,
      },
    }

    return res.json({
      success: true,
      message: "User Login Successful!",
      userData
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// User Logout
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Send verify otp to user email
// To check whether the user email is working or not
const sendVerifyOtp = async (req, res) => {
  const { userId } = req.body;

  console.log(userId)

  if (!userId) {
    return res.json({
      success: false,
      message: "Invalid Email-Id",
    });
  }

  try {
    const userExisted = await userModel.findOne({ _id: userId });

    if (!userExisted) {
      return res.json({
        success: false,
        message: "User not Found",
      });
    }

    if (userExisted.isAccountVerified) {
      return res.json({
        success: false,
        message: "User Already verified, please use another email to register",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    userExisted.verifyOtp = otp;
    userExisted.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    // Send verify otp email to user email
    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: userExisted.email,
      subject: "Verify OTP",
      text: `Your Verify OTP is ${otp}.\nPlease use this OTP for verify your account within 24 hours otherwise this OTP will expires.`,
    };

    await transporter.sendMail(emailOptions);

    await userExisted.save();

    return res.json({
      success: true,
      message: "OTP Sent Successfully!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


// Verify OTP entered by user
const verifyOtp = async (req, res) => {

  const { userId, otp } = req.body;

  if ((!userId || !otp)) {
    return res.json({
      success: false,
      message: "Invalid OTP",
    });
  }

  try {
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "Your OTP is Expired",
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;

    await user.save();

    // send welcome mail to user
    const mailOptions = {
      from: {
        name: "WPMS",
        address: process.env.SENDER_EMAIL
      },
      to: user.email,
      subject: "Welcome to WPMS Website!",
      text: `Hi ${user.name},\n    Welcome to WPMS Website from now you can utilize our services.\n\nThank you!`,
      // html: ``
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "User Registered Successful!",
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const inCompletedVerification = async (req, res) => {
  const { email } = req.body;

  if(!email) {
    return res.json({
      success: false,
      message: "Invalid Email"
    })
  }

  try {
    const userExist = await userModel.findOne({ email })

    if(!userExist){
      return res.json({
      success: false,
      message: "User Not found"
    })
    }

    if(userExist.isAccountVerified === false){
      await userModel.deleteOne({email});

      return res.json({
        success: true,
        message: "User Registration terminated"
      })
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message
    })

  }
}

// Check the user is Authenticated or not
const isAuthenticated = async (req, res) => {

  const { userId } = req.body;
  try {
    const userDetails = await userModel.findOne({ _id:userId })

  const userData = {
      authenticate: true,
      user: {
        role: "user",
        userName: userDetails.name,
      },
    }
    return res.json({
      success: true,
      message: "User is Authenticated!",
      userData
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Send Reset OTP to user
const sendResetOtp = async (req, res) => {
  const { email } = req.body;
console.log("email", email)
  try {
    if (!email) {
      return res.json({
        success: false,
        message: "Email-Id required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not Found with this Email-Id",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    // Send reset OTP to user email
    const mailOptions = {
      from: {
        name: "WPMS",
        address: process.env.SENDER_EMAIL
      },
      to: email,
      subject: "Reset OTP",
      text: `Dear ${user.name}\n\nYour Reset OTP is ${otp}.\nPlease use this OTP to reset your password within 15 minutes otherwise it will expires.`,
    };

    await transporter.sendMail(mailOptions);

    await user.save();

    return res.json({
      success: true,
      message: "Sent Reset OTP to user",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Reset OTP Entered by user and Reset Password
const verifyRestOtpAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
console.log("Body", req.body)
  try {
    if (!email || !otp || !newPassword) {
      return res.json({
        success: false,
        message: "Details Missed",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not Found",
      });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP Expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpireAt = 0;

    // Send a mail to inform that user password has changed
    const mailOptions = {
      from: {
        name: "WPMS",
        address: process.env.SENDER_EMAIL
      },
      to: email,
      subject: "Password had changed",
      text: `Dear ${user.name}\n\nYour WPMS Account password had changed.`,
    };

    await transporter.sendMail(mailOptions);

    await user.save();

    return res.json({
      success: true,
      message: "Password had resetted successfully!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyOtp,
  inCompletedVerification,
  isAuthenticated,
  sendResetOtp,
  verifyRestOtpAndResetPassword,
};
