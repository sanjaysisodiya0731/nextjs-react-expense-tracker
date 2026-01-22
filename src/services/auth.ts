import api from "../lib/axios";

// Signup
export const signupUser = async (data:{name: string;email: string;password: string}) => {
    try {
        console.log("Signup data:", data);
        const response = await api.post("/auth/register", data);
        return response;
    } catch (error: any) {
        throw error.response?.data || { message: "Signup failed" };
    }
};

// Login
export const loginUser = async (data:{email:string;password:string}) => {
    try {
        console.log("Login data:", data);
        const response = await api.post("/auth/login", data);
        return response;
    } catch (error: any) {
        throw error.response?.data || { message: "Login failed" };
    }
}

// Logout
export async function logoutUser() {
  try {
    const res = await api.post("/logout");
    return res;
  } catch (error: any) {
    throw error.response?.data || { message: "Logout failed" };
  }
}

// Current User
export const getCurrentUser = async (token:string) => {
    const response = await api.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

// Update profile
export const updateProfile = async (
  data: { name?: string;},
  token: string
) => {
  try {
    const response = await api.put("/auth/update-profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Profile update failed" };
  }
};

// Forgot Password
export const forgotPassword = async (email: string) => {
    try {
        const response = await api.post("/auth/forgot-password", { email });
        return response;
    } catch (error: any) {
        throw error.response?.data || { message: "Forgot password request failed" };
    }
}

// Reset Password
export const resetPassword = async (data: {
    email: string;
    token: string;
    password: string;
}) => {
    try {
        const response = await api.post("/auth/reset-password", data);
        return response;
    } catch (error: any) {
        throw error.response?.data || { message: "Reset password failed" };
    }
}
