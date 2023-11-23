import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useContext, useState } from 'react';
import AuthContext from '../store/auth-context';
import { useParams } from 'react-router-dom';

const CommentForm = (props) => {

    const [starsState, setStarsState] = useState('1');
    const [commentState, setComment] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const ctx = useContext(AuthContext)
    const params = useParams();

    const onPostHandler = (event) => {
        event.preventDefault();
        console.log(commentState)
        const comment = {
            hotelID: parseInt(params.hotelId, 10),
            user: ctx.user,
            starts: parseInt(starsState, 10),
            comment: commentState,
        }
        postComment(comment)
        .then (() => {
            props.fetchComments();
            props.formHandler();
        })
    }

    const postComment = async (commentObj) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(commentObj)
            })

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

        } catch (error) {
            setError(error.message)
        }

        setIsLoading(false);
    }

    return (
        <Form onSubmit={onPostHandler}>
            <FormGroup>
                <Label for="exampleSelect">Stars Rate</Label>
                <Input type="select" name="select" id="exampleSelect" onChange={(event) => setStarsState(event.target.value)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">Comment</Label>
                <Input type="textarea" name="text" id="exampleText" onChange={(event) => setComment(event.target.value)}/>
            </FormGroup>
            <Button style={{marginRight: '10px'}}>Post Comment</Button>
            <Button onClick={props.formHandler}>Cancel</Button>
        </Form>
    )
}

export default CommentForm;