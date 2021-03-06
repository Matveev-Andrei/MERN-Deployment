import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import io from 'socket.io-client'



const AddPet = () => {
    const [ socket ] = useState(() => io(":8000"))
    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [desc, setDesc] = useState("");
    const [petSkillsOne, setPetSkillsOne] = useState("");
    const [petSkillsTwo, setPetSkillsTwo] = useState("");
    const [petSkillsThree, setPetSkillsThree] = useState("");
    const [errors, setErrors] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/pet", {
            petName,
            petType,
            desc,
            petSkillsOne,
            petSkillsTwo,
            petSkillsThree
        }
        )
            .then((res) => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else if (res.data.keyValue) {
                    setErrors(res.data)
                }
                else {
                    socket.emit("pet_was_added", res.data);
                    socket.disconnect();
                    setPetName("");
                    setPetType("");
                    setDesc("");
                    setPetSkillsOne("");
                    setPetSkillsTwo("");
                    setPetSkillsThree("");
                    navigate("/")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <header className="d-flex justify-content-between p-5">
                <h1 className="d-inline text-white">Pet Shelter</h1> <Link to="/">back to Home</Link>
            </header>
            <main>
                <h3 className="m-5">Know a pet needing a home?</h3>
                <div className="m-5">
                    {errors.keyValue ?
                        <p className="text-danger">{errors.keyValue.name}This name already exists, you must choose a unique name</p>
                        : null
                    }
                    {errors.petName ?
                        <p className="text-danger">{errors.petName.message}</p>
                        : null
                    }
                    {errors.petType ?
                        <p className="text-danger">{errors.petType.message}</p>
                        : null
                    }
                    {errors.desc ?
                        <p className="text-danger">{errors.desc.message}</p>
                        : null
                    }
                </div>
                <form onSubmit={submitHandler} className="p-4 m-4 w-50 d-flex justify-content-around border border-dark bg-white">
                    <div className="d-inline-flex flex-column w-50">
                        <div>
                            <label className="d-block">Pet Name:</label>
                            <input
                                value={petName}
                                onChange={(e) => setPetName(e.target.value)}
                                type="text"
                                name="petName" />
                        </div>
                        <div>
                            <label className="d-block">Pet Type:</label>
                            <input
                                value={petType}
                                onChange={(e) => setPetType(e.target.value)}
                                type="text"
                                name="petType" />
                        </div>
                        <div>
                            <label className="d-block">Pet Description:</label>
                            <input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                type="text"
                                name="desc" />
                        </div>
                        <div className="mt-3 w-100">
                            <button className="btn btn-primary w-50" type="submit">???? Add Pet</button>
                        </div>
                    </div>
                    <div className="d-inline-flex flex-column w-50">
                        <p>Skills (optional)</p>
                        <div>
                            <label className="d-block">Skill 1 :</label>
                            <input
                                value={petSkillsOne}
                                onChange={(e) => setPetSkillsOne(e.target.value)}
                                type="text"
                                name="petSkillsOne" />
                        </div>
                        <div>
                            <label className="d-block">Skill 2 :</label>
                            <input
                                value={petSkillsTwo}
                                onChange={(e) => setPetSkillsTwo(e.target.value)}
                                type="text"
                                name="petSkillsTwo" />
                        </div>
                        <div>
                            <label className="d-block">Skill 3 :</label>
                            <input
                                value={petSkillsThree}
                                onChange={(e) => setPetSkillsThree(e.target.value)}
                                type="text"
                                name="petSkillsThree" />
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default AddPet;