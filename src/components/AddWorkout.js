import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function AddWorkout({show, handleClose, onAdd}) {

    const [ name, setName ] = useState('')
    const [ duration, setDuration ] = useState('15 min')

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(name, duration);

        setName('')
        setDuration('15 min')
    };

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title>Add Workout</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Workout Name"
                                required
                                value={name}
                                onChange={e => { setName(e.target.value) }} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Duration:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Workout Duration"
                                required
                                value={duration}
                                onChange={e => { setDuration(e.target.value) }} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}


