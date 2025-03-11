import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ADD_PROMPT = gql`
    mutation AddPrompt($chatId: String!, $response: String!, $createdAt: String!, $chatTitle: String!, $prompt: String!) {
        addPrompt(chatId: $chatId, response: $response, createdAt: $createdAt, chatTitle: $chatTitle, prompt: $prompt) {
            id
            chatId
            chatTitle
            prompt
            response
            createdAt
        }
    }
`;

function AddPrompt() {
    const navigate = useNavigate();
    const [addPrompt] = useMutation(ADD_PROMPT);
    const [chatId, setChatId] = useState('');
    const [chatTitle, setChatTitle] = useState('');
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [createdAt, setCreatedAt] = useState(new Date());

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { data } = await addPrompt({
                variables: { chatId, chatTitle, prompt, response, createdAt }
            });
            console.log("Mutation success", data);
            if (data) {
                setChatId('');
                setChatTitle('');
                setPrompt('');
                setResponse('');
                setCreatedAt(new Date());
                navigate('/promptlist');
            }
        } catch (error) {
            console.error("Error adding prompt", error);
        }
    };

    return (
        <Container className="p-4 bg-light rounded shadow-sm">
            <h2 className="text-center mb-4">Add New Prompt</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Chat Id" value={chatId} onChange={(e) => setChatId(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Chat Title" value={chatTitle} onChange={(e) => setChatTitle(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Response" value={response} onChange={(e) => setResponse(e.target.value)} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <DatePicker className="form-control" selected={createdAt} onChange={(date) => setCreatedAt(date)} />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">Submit</Button>
            </Form>
        </Container>
    );
}

export default AddPrompt;
