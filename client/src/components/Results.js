import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import io from 'socket.io-client';


const Results = () => {

    const [ socket ] = useState(() => io(":8000"))
    const [ allPets, setAllPets ] = useState([])

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id)
        });

        socket.on("added_pet", (data) =>{
            console.log("new pet was added")

            setAllPets((currentValue) => [ data, ...currentValue])
        })

        socket.on("adopted_pet", (petId) => {
            setAllPets((currentValue) => currentValue.filter(pet => pet._id !== petId) )
        })

        return () => socket.disconnect();
    },[])

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
        .then((res) => {
            setAllPets(res.data)
        })
        .catch((err) => console.log(err))
    },[])

    return (
        <div>
            <header className="d-flex justify-content-between p-5">
                <h1 className="d-inline text-white">Pet Shelter</h1> <Link to="/pets/new">add a pet to shelter</Link>
            </header>
            <main>
                <h3 className="m-5">These pets are looking for a good home</h3>
                <table className="m-auto w-50">
                    <thead>
                        <tr>
                            <td><h5>Name</h5></td>
                            <td><h5>Type</h5></td>
                            <td><h5>Actions</h5></td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPets.map((pet, index) => (
                                <tr>
                                    <td>{pet.petName}</td>
                                    <td>{pet.petType}</td>
                                    <td className="text-center">
                                        <Link to = {`/pet/${pet._id}`}>details</Link>
                                        <span className="mr-1 ml-1">|</span>
                                        <Link to = {`/pet/${pet._id}/edit`}>edit</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export default Results;