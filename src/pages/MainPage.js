import Header from '../components/Header'
import { useEffect, useContext } from 'react';
import AuthContext from '../store/auth-context';
import MainContent from '../components/MainContent';

const MainPage = () => {
    const ctx = useContext(AuthContext);

    // const [data, setData] = useState();

    useEffect(() => {
        (async () => {
        try {
            const response = await fetch('https://auth-app-jsonserver.onrender.com/hotels')

            // console.log(response)

            if (!response.ok) {
                const error = new Error('An error occurred while fetching');
                error.code = response.status;
                error.info = await response.json();
                throw error;
            }

            const responseData = await response.json();
            ctx.onGetData(responseData)
            // setData(responseData)

        } catch (error) {

            // console.log(error)

        }
        })()
    }, [])

    return (
        <div>
            <Header />
            <MainContent data={ctx.data} />
        </div>
    )

}

export default MainPage;

