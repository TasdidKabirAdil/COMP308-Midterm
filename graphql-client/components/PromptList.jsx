import React from "react";
import { gql, useMutation, useQuery } from '@apollo/client';
import { Table, Spinner, Button, Container } from 'react-bootstrap';

const GET_PROMPTS = gql`
    query getPrompts {
        prompts {
            id
            chatId
            prompt
            response 
            createdAt
            chatTitle
            upVotes
            downVotes
        }
    }
`;

const DELETE_PROMPT = gql`
    mutation deletePrompt($deletePromptId: ID!) {
        deletePrompt(id: $deletePromptId) {
            id
            chatId
            chatTitle
        }
    }   
`;

function PromptList() {
    const [deletePrompt] = useMutation(DELETE_PROMPT, {
        refetchQueries: [{ query: GET_PROMPTS }]
    });
    const { loading, error, data, refetch } = useQuery(GET_PROMPTS);

    if (loading) return <Spinner animation="border" className="d-block mx-auto my-4" />;
    if (error) return <p className="text-danger text-center">Error fetching prompts.</p>;

    return (
        <Container className="p-4 bg-light rounded shadow-sm">
            <h2 className="text-center mb-4">Prompt List</h2>
            <Table striped bordered hover responsive className="text-center">
                <thead className="table-primary">
                    <tr>
                        <th>Chat ID</th>
                        <th>Chat Title</th>
                        <th>Prompt</th>
                        <th>Response</th>
                        <th>Created At</th>
                        <th>Up Votes</th>
                        <th>Down Votes</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.prompts.map((prompt) => (
                        <tr key={prompt.id}>
                            <td>{prompt.chatId}</td>
                            <td>{prompt.chatTitle}</td>
                            <td>{prompt.prompt}</td>
                            <td>{prompt.response}</td>
                            <td>{new Date(prompt.createdAt).toLocaleDateString()}</td>
                            <td>{prompt.upVotes}</td>
                            <td>{prompt.downVotes}</td>
                            <td>
                                <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={async () => await deletePrompt({ variables: { deletePromptId: prompt.id } })}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Button variant="primary" className="w-100" onClick={() => refetch()}>
                Refetch
            </Button>
        </Container>
    );
}

export default PromptList;