import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import io from 'socket.io-client'



const Details = (props) => {
    const { id } = props;
    const [ socket ] = useState(() => io(":8000"))
    const [pet, setPet] = useState({})

    const adoptPet = (petId) => {
        axios.delete(`http://localhost:8000/api/pet/${petId}`)
        .then(res => {
            console.log(res.data)
            socket.emit("pet_was_adopted", petId);
            socket.disconnect();
            navigate('/')
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pet/${props.id}`)
            .then(res => {
                setPet(res.data)
            })
    }, [])

    const Like = (e, pet) => {
        pet.likes = pet.likes + 1
        setPet({...pet})
        axios.put(`http://localhost:8000/api/${props.id}/edit`,pet)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        e.target.setAttribute("disabled", "")
        
    }

    return (
        <div>
            <header className="d-flex justify-content-between p-5">
                <h1 className="d-inline text-white">Pet Shelter</h1> <Link to="/">back to Home</Link>
            </header>
            <main>
                <div className="p-5 d-flex justify-content-between">
                    <h4 className="d-inline-flex">Details about : {pet.petName}</h4>
                    <button onClick={e => adoptPet(id)} className="w-25 btn btn-danger">🏠 Adopt {pet.petName}</button>
                </div>
                <div className="m-5 p-4 border border-dark bg-white">
                    <div className="d-inline-flex flex-column w-50">
                        <div className="m-4 d-inline-flex justify-content-between align-items-center">
                            <h3 className="m-4 d-inline">Pet type:</h3>
                            <p className="d-inline">{pet.petType}</p>
                        </div>
                        <div className="m-4 d-inline-flex justify-content-between align-items-center">
                            <h3 className="m-4 d-inline">Description:</h3>
                            <p className="d-inline">{pet.desc}</p>
                        </div>
                        <div className="m-4 d-inline-flex justify-content-between align-items-center">
                            <h3 className="m-4 d-inline">Skills :</h3>
                            <div className="d-inline">
                                <p>{pet.petSkillsOne}</p>
                                <p>{pet.petSkillsTwo}</p>
                                <p>{pet.petSkillsThree}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center m-5">
                        <button onClick={e => Like(e, pet)} className="m-auto btn btn-success w-25">👍 Like</button>
                        <span>{pet.likes} like(s)</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Details;