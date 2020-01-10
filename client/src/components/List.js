import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import Modal from "./Modal"
import JobForm from "./JobForm";
import axios from 'axios'
import JobCard from "./JobCard";
const List = (props) => {
    // State for looping through users jobs
    const [ jobs, setJobs ] = useState([])
    const [ toggleForm, setToggleForm] = useState(false)
    const [ openModal, setOpenModal ] = useState(false)
    // const [ specificJob, setSepecificJob] = useState([]);
    // axios call to get all user jobs
    useEffect( () => {
      axios.get('/api/jobs')
        .then( res => {
          setJobs(res.data);
        })
    }, [])
    const toggle = () => {
      setToggleForm(!toggleForm);
    }
    const deleteJob = (id) => {
      axios.delete(`/api/jobs/${id}`)
      .then(res => {
        setJobs(jobs.filter(j => j.id !== id))
      })
    }

    const handleUpdate = () => {
      axios.get(`/api/jobs`)
      .then( res => {
          setJobs(res.data);
        })
    };

    const renderJobs = (name) => {
      return jobs.map( job => {
        if ( name === job.status ) {
          return (
          <>
            <div
            key={job.id}
            className="job-card"
            company={job.company_name}
            title={job.job_title}
            status={job.status}
            >
              <JobCard handleUpdate={handleUpdate} deleteJob={deleteJob} job={job}/>
            </div>
          </>
        )}
        return (
          <></>
        )
      })
    }
    // Passing this function into JobForm as a prop
    const addJob = (job) => setJobs([ ...jobs, job, ]);
  return (
    <>
    <div className="list-component-container">
      <h1 className="list-header">{props.name}</h1>
        <button className="new-job-btn" onClick={toggle}>Add Job</button>
        { toggleForm ? <JobForm toggle={toggle} add={addJob} /> : null }
        { renderJobs(props.name) }
    </div>
    </>
  )
}
export default List;