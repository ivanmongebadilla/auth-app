
import './comments.css';
import { AiFillStar } from "react-icons/ai";

const Comments = (props) => {
    let starsRate;
    const starsArry = Array(props.stars).fill(0)
    starsRate = starsArry.map((element, index) => <AiFillStar key={index} style={{color: '#FFD700'}} />)

    return (
        <div className='main__container'>
            <div className="comment__container">
                <div className='comment__header'>
                    <div className='comment__user'>{props.user}</div>
                    <div className='comment__stars'>{starsRate}</div>
                    <div className='line__separator'></div>
                </div>
                <div>
                    <p>{props.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Comments;