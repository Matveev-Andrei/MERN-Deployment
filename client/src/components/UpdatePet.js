import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';


const UpdatePet = (props) => {
    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [desc, setDesc] = useState("");
    const [petSkillsOne, setPetSkillsOne] = useState("");
    const [petSkillsTwo, setPetSkillsTwo] = useState("");
    const [petSkillsThree, setPetSkillsThree] = useState("");
    const [errors, setErrors] = useState({});
    const [temp, setTemp] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pet/${props.id}`)
            .then(res => {
                setPetName(res.data.petName);
                setPetType(res.data.petType);
                setDesc(res.data.desc);
                setPetSkillsOne(res.data.petSkillsOne);
                setPetSkillsTwo(res.data.petSkillsTwo);
                setPetSkillsThree(res.data.petSkillsThree);
                setTemp(res.data.petName)
            })
    }, [])
    const updatedPet = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/${props.id}/edit`, {
            petName,
            petType,
            desc,
            petSkillsOne,
            petSkillsTwo,
            petSkillsThree
        })
            .then((res) => {
                if (res.data.errors) {
                    setErrors(res.data.errors)
                } else if (res.data.keyValue) {
                    setErrors(res.data)
                }
                else {
                    setPetName("");
                    setPetType("");
                    setDesc("");
                    setPetSkillsOne("");
                    setPetSkillsTwo("");
                    setPetSkillsThree("");
                    navigate("/")
                }
            })

    }

    return (
        <div>
            <header className="d-flex justify-content-between p-5">
                <h1 className="d-inline text-white">Pet Shelter</h1> <Link to="/">back to Home</Link>
            </header>
            <main>
                <h3 className="m-5">Edit {temp}</h3>
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
                <form onSubmit={updatedPet} className="border border-dark bg-white p-4 m-4 w-50 d-inline-flex justify-content-around">
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
                            <button className="btn btn-primary w-50" type="submit">✏️ Edit Pet</button>
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

export default UpdatePet;