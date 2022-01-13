import React, {useEffect, useState} from 'react';
import './LoadingAPI.css'

const LoadingAPI = () => {
    const jobDescriptionText = `Senior Angular Developer - Waterloo

    Waterloo, Ontario
    
    Must be currently residing in North America.
    
    
    Looking for either locals or those who would be willing to relocate (probably back to the office in 3-9 months). Client will cover relocation expenses.
    • Fully remote till end of pandemic
    • Work permit would work
    • Permanent role, not a contract
    
    
    Required Knowledge, Skills, and Abilities: (Submission Summary):
    
    1. 5+ years of relevant experience in the field
    
    2. Hands on experience with most of the following: (Please indicate # of years experience in each)
    
    a. Angular
    
    b. Extensive knowledge of Rxjs and state management
    
    c. Understanding of MVC, MVVM, MVP patterns
    
    d. Core JavaScript
    
    e. CSS, HTML, Responsive and Adaptive web design
    
    f. Consuming and understanding of RESTful interfaces
    
    g. SDLC and CI/CD
    
    h. Unit testing
    
    i. Clean code concepts`;

    const inputArr = [{
        type: "text",
        id: 1,
        value: ""
    }];

    const [jobDescription, setJobDescription] = useState(jobDescriptionText);
    const [state, setState] = useState(inputArr);
    const [retval, setRetval] = useState({});

    const postAPIdata = async () => {
        const skills = state.map(item => {
            return item.value;
        });

        const response = await fetch("http://127.0.0.1:5000/",
        {   
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                skills: skills, 
                job_description: jobDescription
            })
        });

        const json = await response.json();
        setRetval(json);
    }

    const addInput = (event) => {
        setState( (s) => {
            return [ ...s, 
                    {type: "text",
                     value: ""
                    }
                ];
        });
    };

    const deleteInput = (s) =>{
        setState((s, index) => {
            const newBlockArray = [...s];
            newBlockArray.splice(s.length-1, 1);
            return newBlockArray;
        });
    };

    const handleChange = (e) => {
        e.preventDefault();
        const index = e.target.id;
        setState( (s) => {
            const newArr = s.slice();
            console.log(newArr);
            newArr[index].value = e.target.value;
            
            return newArr;
        });
    };

    return (
        <div className="loading_api">
        
         
         <div className="left_side">
            <h1>List of Skills</h1>
            <div className="input_list">
                { state.map( (item, i ) => {
                    return (
                        <div className="input">
                            <input 
                            onChange={handleChange} 
                            value= {item.value}
                            id= {i}
                            type= {item.type}
                            />
                        </div>
                        );
                    })
                }
            </div>
            <div>
            <button className="btnAddSkill" onClick={addInput }> Add Skill </button>
            <button className="btnDeleteSkill" onClick={deleteInput }> Delete Skill </button>
            </div>
                {/* <p> {state} </p> */}
            
            <button onClick={postAPIdata}>
                POST TO API
            </button>

            <div>
                <ul>
                    {Object.keys(retval).map(function(key, keyIndex) {
                        return (
                            <div>
                                <b>{key}:</b> {JSON.stringify(retval[key])}
                            </div>
                        )
                    })}
                </ul>
            </div>
         </div>

         <div className='right_side'>
             <h3>Job Description</h3>
             <textarea 
                className="textarea" 
                rows="25"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
            />
         </div>
        
        </div>
    )
}

export default LoadingAPI;
