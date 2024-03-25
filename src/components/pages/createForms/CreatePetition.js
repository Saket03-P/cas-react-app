import { useEffect } from "react";
import '../../Petition.css';
 
 
function CreatePetition(props) {
    useEffect(() => {
        console.log(props);
    }, [props]);
    return (  
        <>
    <div className="details-container">
      <h2 className="text-success">Petition has been created !!</h2>
      <div className="details">
      <p><strong>Name:</strong> {props.details.name}</p>
      <p><strong>Cause: </strong>{props.details.cause}</p>
      <p><strong>Title:</strong> {props.details.title}</p>
      <p><strong>Description: </strong>{props.details.message}</p>
      </div>
    </div>
 
 
        </>
    );
}
 
export default CreatePetition;