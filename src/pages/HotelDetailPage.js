import './hoteldetailpage.css'
import Header from "../components/Header"
import { Link, useParams } from "react-router-dom";
// import { useContext } from "react";
import { useEffect, useState, useContext } from 'react';
import AuthContext from "../store/auth-context";
import Comments from '../components/Comments';
import { Button } from 'reactstrap';
import CommentForm from '../components/CommentForm';

const HotelDetailPage = () => {
    const params = useParams();

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isForm, setIsForm] = useState(false)

    const ctx = useContext(AuthContext);
    const hotelData = ctx.data[params.hotelId]

    const commentFormHandler = () => {
        setIsForm(!isForm);
    }

    useEffect(() => {
        fetchComments();
    }, [])

    const fetchComments = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/comments')

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const data = await response.json();
            const filteredComments = data.filter((element) => element.hotelID == params.hotelId)
            setComments(filteredComments)

        } catch (error) {
            setError(error.message)
        }

        setIsLoading(false);
    }

    let content;

    if (!comments.length) {
        content = <p>Hotel does not have any comment yet</p>
    } else {
        content = (
            comments.map((element) => {
                return (
                    <Comments key={element.id} user={element.user} stars={element.starts} comment={element.comment} />
                )
            })
        )
    }

    return (
        <div>
            <Header />
            <div>
                <h1 className='hotel__title'>{hotelData.name}</h1>
                <div className='hotel__container'>
                    <img className='hotel__image' src={hotelData.image} alt='Hotel'/>
                    <div className='hotel__descriptioncomments'>
                        <div className='hotel__description'>
                            <h3>Description of the Hotel</h3>
                            <p>{hotelData.description}</p>
                        </div>
                        <div >
                            <h3 style={{color: "white"}}>Comments</h3>
                            <div>
                                {isLoading && <p>Loading comments...</p>}
                                {!isLoading && error && <p>{error}</p>}
                                {!isLoading && !error && <div className='comments__container'>{content}</div>}
                            </div>
                        </div>
                        {ctx.isLoggedIn ? ( isForm ? (
                            <div className='commentform__container'>
                                <CommentForm formHandler={commentFormHandler} fetchComments={fetchComments} />
                            </div>
                        ) : (
                            <div className='comments__add'>
                                <Button onClick={commentFormHandler}>Add a Comment</Button>
                            </div>
                        )): (
                            <div className='comments__add'>Log In or Sign Up to add a comment</div>
                        )}
                    </div>
                </div>
                <div className='return__button'>
                    <Link to='/'>
                        <Button>Return</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HotelDetailPage;