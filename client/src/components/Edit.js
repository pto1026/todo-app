import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Container, Form, Button } from 'react-bootstrap'

const Edit = () => {
    const [form, setForm] = useState({
        todo_title: '',
        todo_details: '',
        todo_status: '',
        records: []
    })

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString()
            const response = await fetch(`http://localhost:5000/record/${id}`)

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`
                window.alert(message)
                return
            }

            const record = await response.json()
            if (!record) {
                window.alert(`Record with id ${id} not found`)
                navigate('/')
                return
            }

            setForm(record)
        }

        fetchData()

        return
    }, [params.id, navigate])

    const updateForm = value => {
        return setForm(prev => {
            return { ...prev, ...value }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const editedTodo = {
            todo_title: form.todo_title,
            todo_details: form.todo_details,
            todo_status: form.todo_status
        }

        await fetch(`http://localhost:5000/update/${params.id.toString()}`, {
            method: 'POST',
            body: JSON.stringify(editedTodo),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        navigate('/')
    }

    return (
        <Container>
            <h3 className='display-3'>Update Todo</h3>
            <Form onSubmit={onSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' placeholder='Enter title' value={form.todo_title} onChange={e => updateForm({ todo_title: e.target.value })} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Details</Form.Label>
                    <Form.Control type='text' placeholder='Enter details' value={form.todo_details} onChange={e => updateForm({ todo_details: e.target.value })}/>
                    <Form.Text className='text-muted'>
                        What do we need to know?
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Check type='radio' label='Pending' value='Pending' checked={form.todo_status === 'Pending'} onChange={e => updateForm({ todo_status: e.target.value })} />
                    <Form.Check type='radio' label='In progress' value='In progress' checked={form.todo_status === 'In progress'} onChange={e => updateForm({ todo_status: e.target.value })} />
                    <Form.Check type='radio' label='Complete' value='Complete' checked={form.todo_status === 'Complete'} onChange={e => updateForm({ todo_status: e.target.value })} />
                </Form.Group>
                <Button variant='primary' type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default Edit