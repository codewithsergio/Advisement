import React, { useEffect, useState } from 'react'
import './StudentRecords.css'
import { updateDoc, doc, onSnapshot } from "firebase/firestore"; 
import {db} from './firebase-config';
import {CSVLink} from 'react-csv';
import { Icon } from "@iconify/react";

function StudentRecords({user}) {
    const [theme, setTheme] = useState('Light');
    const toggleTheme = () => {
        if(theme === 'Light'){
            setTheme('Dark');
        } else {
            setTheme('Light');
        }
    };
    const [recordsList, setRecordsList] = useState([]);
    const todaysDate = new Date();

    const confirmRecordDeletion = () => {
        if(window.confirm('This will permanently remove all student records for all users and cannot be undone. Are you sure you want to proceed with deletion?') === true){
            // Delete records
            updateDoc(doc(db, "records", "recordArray"), {
                information: []
              })
              .then(() => {
                alert(`All data has been deleted!`);
              })
              .catch((error) => {
                alert(error.message);
            });
        }
    };

    useEffect(() => {
        // When student submits form, re render page.
        onSnapshot(doc(db, "records", "recordArray"), (doc) => {
            setRecordsList(doc.data().information.reverse());
        });
    }, []);

  return (
    <div className={`StudentRecords ${theme}`}>
        <div className="allowedView">
            <h1>Student Records</h1>
            <p>Hello {user[0]}!</p>
            <CSVLink
            className="CSVButton"
            filename={`StudentRecords_${todaysDate.toLocaleString()}.csv`}
            data={[['Date', 'Name', 'Student ID', 'Reason'], ...recordsList.map(record => [record.date, record.name, record.studentId, record.reason])]}
            >Download CSV File</CSVLink>
            <button className="deleteRecordsButton"
            onClick={() => {confirmRecordDeletion()}}>DELETE Records</button>
            <div className="themeButtonDiv">
                <button className="themeButton" onClick={() => {toggleTheme()}}>
                    <Icon className="darkModeIcon" icon={"gg:dark-mode"}/>
                </button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Student ID</th>
                        <th>Reason</th>
                    </tr>
                    {recordsList.map((record, index) => (
                        <tr key={index}>
                            <td>{record.date}</td>
                            <td>{record.name}</td>
                            <td>{record.studentId}</td>
                            <td>{record.reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default StudentRecords