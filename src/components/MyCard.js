import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card, CardImg, CardBody,
    CardTitle, CardText, Button
} from "reactstrap"
import { AiFillStar } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyCard = (props) => {
    let content;

    // if to take the average stars form the hotel comments
    if (props.comments.length > 0) {
        let avgStars = props.comments.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.starts
        }, 0)
        avgStars = Math.round(avgStars/props.comments.length)
        const starsArry = Array(avgStars).fill(0)
        content = starsArry.map((element, index) => <AiFillStar key={index} style={{color: '#FFD700'}} />)
    } else {
        content = <p>Not qualified yet</p>
    }

    return (
        <Card style={{maxWidth: '230px'}}>
            <CardTitle style={{fontSize: '25px', color: 'rgb(0, 96, 138)', textAlign: 'center', marginTop: '8px', marginBottom: '0px'}}>{props.title}</CardTitle>
            <CardImg width="50px" height="150px" style={{padding: "10px 10px 0px 10px"}} src={props.image} alt='hotel'/>
            <CardBody style={{padding: '5px 10px 8px 10px'}}>
                <CardText>
                    {props.description} 
                    <div className='card__start-container'>
                        Rate: {content}
                    </div>    
                </CardText>
            </CardBody>
            {/* <div className='card__start-container'>
                {content}
            </div> */}
            <motion.div style={{textAlign: "center"}} whileHover={{scale: 1.1}}>
                <Link style={{margin: 'auto', marginBottom: '5px'}} to={`/${props.id}`}><Button style={{backgroundColor: 'rgb(0, 96, 138)'}}>View Comments</Button></Link>
            </motion.div>
        </Card>
    )
}

export default MyCard;