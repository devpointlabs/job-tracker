import React, { useState, useEffect } from 'react'
import axios from 'axios'
import JobForm from '../components/JobForm'



const Jobs = (props) => {
  // State for looping through users jobs
  const [ jobs, setJobs ] = useState([])
  const [ toggleForm, setToggleForm] = useState(false)
  
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

  // Rendering the loop of the jobs
  const renderJobs = () => {
    return jobs.map( job => (
      <div key={job.id}>
        <li >
          {job.company_name} 
          <br/>
          {job.job_title}
          <br />
          {job.status}
          <br />
        </li>
      </div>
    ))
  }

  // Passing this function into JobForm as a prop
  const addJob = (job) => setJobs([ ...jobs, job, ]);
  
  // jobs Index component
  return (
    <div>
      Jobs
      <ul>
        { renderJobs() }
      </ul>
      <button onClick={toggle}>Form</button>
      { toggleForm ? <JobForm toggle={toggle} add={addJob} /> : null }
    </div>
  )
}

export default Jobs