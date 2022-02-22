import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const Create = () => {
    const [form, setForm] = useState({
        todo_title: '',
        todo_details: '',
        todo_status: ''
    })
    const navigate = useNavigate()

    const updateForm = (value) => {
        return setForm(prev => {
            return { ...prev, ...value }
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const newTodo = { ...form }

        await fetch('http://localhost:5000/record/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
        }).catch(error => {
            window.alert(error)
            return
        })

        setForm({ todo_title: '', todo_details: '', todo_status: '' })
        navigate('/')
    }

    return (
        <Container>
            <h3 className='display-3'>Create New Todo</h3>
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

export default Create