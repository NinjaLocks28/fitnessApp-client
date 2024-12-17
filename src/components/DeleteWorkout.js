import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function DeleteWorkout({workout, onDelete}) {

    return (
        <Button className="mx-2" variant="danger" size="sm" onClick={ (e) => onDelete(e , workout )}>
                            Delete
        </Button>
    )
}