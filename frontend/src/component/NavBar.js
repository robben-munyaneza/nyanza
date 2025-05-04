import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav>
        <ul>
    
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/jobpositions">Job_position</Link></li>
        <li><Link to="/applicants">Applicants</Link></li>
        <li><Link to="/applications">Applications</Link></li>
        <li><Link to="/recruitmentstages">Recruitment_Stages</Link></li>
        <li><Link to="/report">Report</Link></li>

                    </ul>
    </nav>
  )
}

export default NavBar
