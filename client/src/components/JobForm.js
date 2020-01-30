import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useFormInput from '../hooks/useFormInput'

const JobForm = (props) => {
  // State for fields in the form, using a custom hook (useFormInput) to simplify state a bit
  const { values, handleSubmit, handleChange, setValues } = useFormInput(submit)
  const { company, job_title, status, color } = values
  const [defaultStatus, setDefaultStatus] = useState(jobStatus.find(status => status.value === props.name).value)

  // sets default state for jobStatus
  useEffect(() => {
    setValues({
      status: defaultStatus
    })
  }, [])

  // submit function, axios post call. 
  function submit() {
    axios.post('/api/jobs', {
      company_name: company,
      job_title: job_title,
      status: status,
      color: color
    })
      .then(res => {
        props.add(res.data);
        props.hide();
      })
  };


  // Form component
  return (
    <div className="new-job">
      <h2 className="form-heading new-heading">Add a new job</h2>
      <form onSubmit={handleSubmit} className="jobview-form new-form">
        <div className="all-inputs new">
          <div className="form-input">
            <h3>Company</h3>
            <input 
              type="text" 
              name="company"
              required 
              {...company} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-input">
            <h3>Job Title</h3>
            <input 
              type="text" 
              name="job_title" 
              required
              {...job_title} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-input">
            <h3>Status</h3>
            <select name="status"
              {...status}
              onChange={handleChange}
              defaultValue={defaultStatus}
              selected
              required
            >
              {jobStatus.map(j => (
                <>
                  <option
                    value={j.value}

                  >
                    {j.value}
                  </option>
                </>
              ))
              }
            </select>
          </div>
          <div className="form-input">
            <h3>Color</h3>
            <select name="color" {...color} onChange={handleChange} >
              {colors.map(c => (
                <>
                  <option value="none" selected disabled hidden>
                    Select an Option
                  </option>
                  <option value={c.text}>
                    {c.value}
                  </option>
                </>
              ))
              }
            </select>
          </div>
        </div>
        <button
          className="jobinfo-save-btn task-save fill2"
          type="submit" value="Submit"
        >
          Save
        </button>
      </form>
    </div>
  )
}

const jobStatus = [
  { key: "a", text: "Wishlist", value: "Wishlist", },
  { key: "b", text: "Applied", value: "Applied", },
  { key: "c", text: "Interviewed", value: "Interviewed", },
  { key: "d", text: "Offer", value: "Offer", },
  { key: "e", text: "Rejected", value: "Rejected", },
  { key: "f", text: "Archived", value: "Archived", }
];

const colors = [
  { key: "a", value: "Ocean", text: "#2d3a66", },
  { key: "b", value: "Blue", text: "#505995", },
  { key: "c", value: "Navy", text: "#070059", },
  { key: "d", value: "Purple", text: "#3d1a68", },
  { key: "e", value: "Iris", text: "#5c4e8c", },
];


export default JobForm