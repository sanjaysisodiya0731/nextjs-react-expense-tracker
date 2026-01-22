'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // For cookie management
import { showSuccess } from "../utils/toaster"

type UserType = {
    id: string;
    name: string;
    email: string;
    token: string;
} | null;

// create the context
const AuthContext = createContext<any>(null)

// create a provider component
export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserType>(null);
    const router = useRouter();

    // logic to fetch current user can be added here
    const login = (userData: UserType) => {
        if (!userData) return;
        // localStorage can be used to persist user data
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userData.token);
        setUser(userData);

        // Cookie (middleware के लिए)
        Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // 7 days valid
        Cookies.set("token", userData.token, { expires: 7 });

        // Redirect to home page after successful login
        router.push('/dashboard');
    };

    const logout = () => {
        // clear user data from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        
        Cookies.remove("user");   // remove cookie
        Cookies.remove("token");
        
        setUser(null);
        // Redirect to login page after logout
        
        router.push('/login');

        showSuccess("Logged out successfully!");
    };

    //App load par user check
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
        } else {
            setUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, token: user?.token }}>
            {children}
        </AuthContext.Provider>
    )
};

// create a custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}