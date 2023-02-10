import React from 'react'
import './StudentForm.css'
import {useState} from 'react';
import {db} from './firebase-config';
import { updateDoc, doc, arrayUnion } from "firebase/firestore"; 

function StudentForm() {
    const [name, setName] = useState('');
    const [id, setId] = useState('');

    const [selected, setSelected] = useState([]);

    const [needToSignIn, setNeedToSignIn] = useState(true);

    const choices = ['Graduation App', 'Course Planning', 'Major/Minor Changes',
    'General Advicement'];

    const clearForm = () => {
        setName('');
        setId('');
        setSelected([]);
    };

    const sendForm = (e) => {
        const date = new Date();
        e.preventDefault();
        if (name.length === 0){
            alert("Please write your full name.");
            return;
        } else if(selected.length === 0){
            alert("Please choose a reason for your visit.");
            return;
        } else if(id.length !== 9){
            alert("Please make sure your student ID is correct before submitting.");
            return;
        }

        updateDoc(doc(db, "records", "recordArray"), {
            information: arrayUnion({
                date: `${date.getMonth() + 1}-${date.getDate()}`,
                name: name,
                studentId: id,
                reason: selected.join(', '),
            })
          })
          .then(() => {
            alert(`${name}, you have submitted successfully.`);
          })
          .catch((error) => {
            alert(error.message);
        });

        clearForm();
        setNeedToSignIn(false);
    };

  return (
    <div className="StudentForm">
        { needToSignIn ? (
            <div>
                <div className="form_page_title">Sign in for Advisement</div>
                <div className="tag_line">After filling up your data, take a seat!</div>
                <form>
                    <input
                    value={name}
                    onChange={(e) => setName(e.target.value)} type="text"
                    placeholder='Full Name'/>
                    <input
                    value={id}
                    onChange={(e) => setId(e.target.value)} type="text"
                    placeholder='Student ID'/>
        
        
                    <div className="radioGroup">
                        <div className="radioGroupTitle">Reason for Visit</div>
                        {choices.map((choice, index) => (
                            <label className="container" key={index}>
                                <input type="checkbox" name="myCheckbox"
                                onChange={() => {
                                    if(selected.includes(choice)){
                                        setSelected(selected.filter(i => i !== choice))
                                    }else{
                                        setSelected([...selected, choice])
                                    }
                                }} value={index} checked={selected.includes(choice)}/>
                                <span className="checkmark"></span>
                                <span className="choiceText">{choice}</span>
                            </label>
                        ))}
                    </div>
                    <button type="submit" onClick={sendForm}>Submit</button>
                </form>
            </div>
        ) : (
            <div className="goodbye_page">
                <h1>We will be with you shortly!</h1>
            </div>
        )}
    </div>
  )
}

export default StudentForm