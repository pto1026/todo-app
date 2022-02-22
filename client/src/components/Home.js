import React, { useEffect, useState } from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const Home = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        async function getRecords() {
            const response = await fetch('http://localhost:5000/record')

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`
                window.alert(message)
                return
            }

            const records = await response.json()
            setTodos(records)
        }

        getRecords()

        return
    }, [todos])

    const navigate = useNavigate();

    function onEdit(id) {
        navigate(`/edit/${id}`)
    }

    async function onDelete(id) {
        await fetch(`http://localhost:5000/${id}`, {
            method: 'DELETE'
        })

        const newRecords = todos.filter(el => el._id !== id)
        setTodos(newRecords)
    }

    return (
        <Container>
            <h3 className='display-3'>Todo-App</h3>
            <ListGroup>
                {todos.map(todo => <ListGroup.Item key={todo._id}><div className='display-6'>{todo.todo_title}</div><div>{todo.todo_details}</div><div className='text-muted'>{todo.todo_status}</div><Button variant='outlined-secondary' onClick={() => onEdit(todo._id)}>Edit</Button><Button variant='danger' onClick={() => onDelete(todo._id)}>Delete</Button></ListGroup.Item>)}
            </ListGroup>
        </Container>
    )
}

export default Home