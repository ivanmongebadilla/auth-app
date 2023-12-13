import { useState } from "react";

const useHttp = (requestConfig) => {
    // const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToekn] = useState(null);

    const fetchAuth = async (userInfo) => {
        // const url = 'http://localhost:3000/register';
        console.log("Fetch is entering")
        console.log(requestConfig.url)
        try {
            const response = await fetch(requestConfig.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo)
            })
        
            if (!response.ok) {
                const error = new Error('An error occurred while fetching');
                console.log(error)
                error.code = response.status;
                error.info = await response.json();
                throw error;
            }
        
            const data = await response.json();
            console.log(data)
            setToekn(data.accessToken)
            localStorage.setItem("Token", data.accessToken)
            // console.log(data.accessToken)

        } catch (error) {
            setError(error.info || 'Something went wrong!')
        }
    }

    return {
        token: token,
        error: error,
        fetchAuth: fetchAuth, 
    }
}

export default useHttp;