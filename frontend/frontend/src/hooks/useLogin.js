import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogin = () => {
    const [error, seterror] = useState(null);
    const [isloading, setisloading] = useState(false);
    const { dispatch } = useAuthContext();

    const Login = async (email, password) => {
        setisloading(true);
        seterror(null);

        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 204) {
                setisloading(false);
                return seterror("Server returned no data. Check backend login controller.");
            }

            const json = await response.json();

            if (!response.ok) {
                setisloading(false);
                seterror(json.error);
            }

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json));
   console.log("Response is OK, saving to localStorage...");
                dispatch({ type: 'login', payload: json });
                console.log("Data saved and dispatched!");
                setisloading(false);
            }
        } catch (err) {
            setisloading(false);
            seterror("Network error: Could not connect to server.");
        }
    };

    return { Login, isloading, error };
};