import './maincontent.css';
import MyCard from './MyCard';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MainContent = (props) => {

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchComments()
    }, [])

    let content;
    if (props.data === undefined || null) {
        content = <p>Loading</p>
    } 

    const fetchComments = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/comments')

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const data = await response.json();
            // const filteredComments = data.filter((element) => element.hotelID == params.hotelId)
            setComments(data)

        } catch (error) {
            setError(error.message)
        }

        setIsLoading(false);
    }

    if (props.data !== undefined || null) {
        content = props.data.map((element, index) => {
            const filteredComments = comments.filter((filterElement) => filterElement.hotelID == element.id)
            return (
                <MyCard key={index} id={element.id} title={element.name} description={element.description} image={element.image} comments={filteredComments}/>
            )
        })
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeIn", duration: 2 }} className='card__container'>
            {content}
        </motion.div>
    )
}

export default MainContent;