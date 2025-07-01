import axiosInstance from "../api/axiosInstance";

export const registerService = async (userData) => {
  try {
    const { data } = await axiosInstance.post("/api/auth/register", userData);
    console.log(data);
    alert(data.message);
    return data;
  } catch (error) {
    console.log(error);
    alert(error.message);
    return { success: false };
  }
};

export const loginService = async (formData) => {
  try {
    const { data } = await axiosInstance.post("/api/auth/login", formData);

    console.log(data);

    alert(data.message);
    return data;
  } catch (error) {
    console.log(error);
    alert(error.message);
    return { success: false };
  }
};

export const logoutService = async () => {
  try {
    const { data } = await axiosInstance.post("/api/auth/logout", {});

    console.log(data);
    alert(data.message);
    return data;
  } catch (error) {
    console.log(error);
    alert(error.message);
    return { success: false };
  }
};

export const sendVerifyOTPService = async (email) => {
  try {
    const { data } = await axiosInstance.post("/api/auth/send-verify-otp", {
      email,
    });

    console.log(data);
    if (data.success) {
      alert(data.message);
      return data;
    } else {
      alert(data.message);
      return data;
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
    return { success: false };
  }
};

export const verifyOTPService = async (otp) => {
  try {
    const { data } = await axiosInstance.post("/api/auth/verify-otp", { otp });

    console.log(data);
    if (data.success) {
      alert(data.message);
      return data;
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
    return { success: false };
  }
};

export const sendResetOTPService = async (email) => {
  try {
    console.log(email, "service");
    const { data } = await axiosInstance.post("/api/auth/send-reset-otp", {
      email,
    });

    console.log(data);
    if (data.success) {
      alert(data.message);
      return data;
    } else {
      alert(data.message);
      return data;
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
    return { success: false };
  }
};

export const resetPasswordService = async (formData) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/auth/reset-password",
      formData
    );

    console.log(data);
    if (data.success) {
      alert(data.message);
      return data;
    } else {
      alert(data.message);
      return data;
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
    return { success: false };
  }
};

export const terminateOtpVerificationService = (email) => {
  try {
    const { data } = axiosInstance.post("/incompleted-registration", { email });

    return data;
  } catch (error) {
    console.log(error);
    alert(error.message);
    return { success: false };
  }
};

export const getAuthenticatedService = async () => {
  try {
    const { data } = await axiosInstance.post("/api/auth/is-auth");
    return data;
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
