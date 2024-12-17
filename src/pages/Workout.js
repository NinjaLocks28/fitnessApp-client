import { useContext, useEffect, useState } from "react"
import { Row, Col, Table, Badge, Button, Modal, Card, ListGroup, Container } from "react-bootstrap"
import Swal from "sweetalert2"

import UserContext from '../UserContext';

import AddWorkout from "../components/AddWorkout"
import UpdateWorkout from "../components/UpdateWorkout"
import DeleteWorkout from "../components/DeleteWorkout"
import CompletedWorkout from "../components/CompletedWorkout"
import { useNavigate } from "react-router-dom";

export default function Workout() {
    

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    

    const [workouts, setWorkouts] = useState([])

    const [addWorkoutModal, setAddWorkoutModal] = useState(false);

    const closeAddWorkoutModal = () => setAddWorkoutModal(false);
    const showAddWorkoutModal = () => setAddWorkoutModal(true);


    const [filter, setFilter] = useState("all"); // 'all', 'completed', 'pending'
    const handleFilterChange = (filterType) => {
        setFilter(filterType);
        fetchWorkout(); // Refetch workouts based on the new filter
    }
    




    // ADD
    const addWorkout = (name, duration) => {

        fetch(`${process.env.REACT_APP_API_URL}/workouts/addWorkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })
        })
            .then(res => res.json())
            .then(data => {
                if (typeof data.message !== "string") {
                    Swal.fire({
                        title: "Great Start!",
                        text: "You’ve set a new goal—let’s crush it one step at a time!",
                        icon: "success",
                        confirmButtonText: "Let's Do More!"
                    });
                    
                    closeAddWorkoutModal();
                } else {
                    Swal.fire({
                        title: "Failed to Add Workout",
                        icon: "error"
                    });
                }
            })

    }


    // UPDATE
    const updateWorkout = (name, duration, id, closeUpdate) => {

        fetch(`${process.env.REACT_APP_API_URL}/workouts/updateWorkout/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Workout updated successfully") {
                    Swal.fire({
                        title: "Changes Saved Successfully!",
                        text: 'Your workout is updated. Keep pushing forward!',
                        icon: "success"
                    });
                    closeUpdate();
                } else {
                    Swal.fire({
                        title: "Failed to Update Workout",
                        icon: "error"
                    });
                }
            })
    }




    // DELETE

    const deleteWorkout = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm!',
            cancelButtonText: 'Oops, Go Back',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/workouts/deleteWorkout/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.message === "Workout deleted successfully") {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your workout has been deleted.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Cannot Delete.",
                                icon: "error"
                            });
                        }

                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: error.message,
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Your workout is safe :)',
                    icon: 'info'
                });
            }
        });

    }










    // Completed

    const completedWorkout = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: 'Finished Your Workout?',
            text: "Click confirm to mark it as complete. Great job on staying consistent!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Confirm!",
            cancelButtonText: 'Oops, Go Back',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/workouts/completeWorkoutStatus/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data.message === "Workout updated successfully") {
                            Swal.fire({
                                title: "Workout Complete!",
                                text: "You crushed it today! Time to celebrate your progress.",
                                icon: "success"
                            });
                            fetchWorkout();
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Something went wrong.",
                                icon: "error"
                            });
                        }

                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: error.message,
                            icon: "error"
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelled',
                    text: 'Please complete your workout :)',
                    icon: 'info'
                });
            }
        });

    }


    const fetchWorkout = () => {
        fetch(`${process.env.REACT_APP_API_URL}/workouts/getMyWorkouts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.message !== "string") {
                // Sort workouts so 'pending' appears first and 'completed' appears last
                const sortedWorkouts = data.workouts.sort((a, b) => {
                    if (a.status === 'pending' && b.status === 'completed') {
                        return -1;
                    } else if (a.status === 'completed' && b.status === 'pending') {
                        return 1;
                    } else {
                        return 0;
                    }
                });
    
                // Map through sorted workouts
                const workoutsArr = sortedWorkouts.map(workout => {
                    
                    const dateCompleted = workout.dateCompleted ? new Date(workout.dateCompleted).toLocaleString() : null; // Format date completed only once
    
                    return (
                        <div className="col-lg-4 col-md-6 col-12 mb-3" key={workout._id}>
    <Card className="shadow-sm" style={{ borderRadius: "10px", overflow: "hidden" }}>
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
            <Card.Title className="my-2 fw-bold text-uppercase">
                {workout.name}
            </Card.Title>
        </Card.Header>
        
        <Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <i className="fas fa-clock me-2"></i> <strong>Workout Time:</strong> {workout.duration}
                </ListGroup.Item>
                <ListGroup.Item>
                    <i className="fas fa-calendar-alt me-2"></i> <strong>Added on:</strong> {new Date(workout.dateAdded).toLocaleString()}
                </ListGroup.Item>
                
            </ListGroup>
        </Card.Body>
        
        <Card.Footer className="d-flex justify-content-between">
            <div>
                <UpdateWorkout 
                    workoutName={workout.name} 
                    workoutDuration={workout.duration} 
                    workout={workout._id} 
                    onUpdate={updateWorkout} 
                />
                <DeleteWorkout 
                    workout={workout._id} 
                    onDelete={deleteWorkout} 
                />
            </div>
            <CompletedWorkout 
                status={workout.status} 
                workout={workout._id} 
                onDone={completedWorkout} 
            />
        </Card.Footer>
    </Card>
</div>

                    );
                });
    
                setWorkouts(workoutsArr);
            } else {
                setWorkouts([]);
            }
        });
    };
    
    


    useEffect(() => {
    if (!user.id) {
        navigate('/login');
    }

    fetchWorkout(); 

}, [fetchWorkout, addWorkout, user.id, navigate, filter]) // Add 'filter' to dependencies





return (
    <>
        <div className="container">
            <Row>
                <Col className="p-4 text-center">
                    <h1>Your Fitness Journey Starts Here!</h1>
                </Col>
            </Row>
            <Row className="mb-5 d-flex justify-content-center">
                <Col xs="auto">
                <Button variant="danger" onClick={showAddWorkoutModal}>
                    {workouts.length > 0 ? " Add your next workout!" : "ADD WORKOUT"}
                </Button>
                </Col>
            </Row>
            
           
            <Container className='row' >
            {workouts}
            </Container>
        </div>

        

        {/* AddWorkoutModal Component */}
        <AddWorkout show={addWorkoutModal} handleClose={closeAddWorkoutModal} onAdd={addWorkout} />
    </>
);
}