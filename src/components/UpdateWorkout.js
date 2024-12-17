import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UpdateWorkout({workoutName, workoutDuration, workout, onUpdate}) {

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const closeUpdate = () => setShowUpdateModal(false);
    const showUpdate = () => setShowUpdateModal(true);

    const [ name, setName ] = useState(workoutName)
    const [ duration, setDuration ] = useState(workoutDuration)


    const submitUpdate = (e, closeUpdate) => {
        e.preventDefault();
        onUpdate(name, duration, workout, closeUpdate);
    };

    return (
        <>
            <Button variant="warning" size="sm" onClick={showUpdate}>Update</Button>
            

            <Modal show={showUpdateModal} onHide={closeUpdate}>
                <Form onSubmit={(e) => submitUpdate(e, closeUpdate)}>

                    <Modal.Header closeButton>
                        <Modal.Title>Update Workout</Modal.Title>
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
                        <Button variant="danger" onClick={closeUpdate}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}


