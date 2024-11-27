import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './DepartmentDetails.css';
import { urlFor } from '../../client';
const DepartmentsDetails = () => {
  const location = useLocation();
  const departmentId = location.pathname.split('/')[2];
  const department = useSelector((state) => state?.departments?.departments).find((department) => department?._id === departmentId);

  return (
    <div>

      <div>
        <section className='breadcrumbs'>
          <div className="breadcrumb-container">
            <h2 className="hero-heading white">{department?.title?.toUpperCase()} </h2>
          </div>
        </section>
        <section className='future'>
          <div className="container">
            <div className="heading">
              WELCOME TO {department?.title?.toUpperCase()} DEPARTMENT
            </div>
            <p className="para-line">
              {department?.description}
            </p>
          </div>
        </section>
        <section className="our-team">
          <div className="container">
            <h4 className="sub-heading">{department?.title?.toUpperCase()} LEADERS</h4>
            <h2 className="heading">OUR LEADERS</h2>
            <div className="team-leaders">
              {department?.leaders?.map((leader, id) => (
                <div className="team-leader" key={id}>
                  <img
                    src={urlFor(leader?.leaderUrl)}
                    title="Team Leader"
                    alt="Team Member"
                    className="leader-img"
                  />
                  <div className="member-leader">
                    <p className="leader-designation">ROLE : DEPARTMENT LEADER</p>
                    <h3 className="leader-name">{leader?.name}</h3>
                    <p className="para-line">
                      {leader?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className='our-team'>
          <div className="container">
            <div className="sub-heading">
              Members
            </div>
            <h2 className="heading">
              {department?.title?.toUpperCase()} MEMBERS
            </h2>
            <div className="team-members" style={{ margin: '10px' }}>
              {department?.members?.map((member, id) => (
                <div className="team-member" key={id}>
                  <img
                    src={urlFor(member?.memberUrl)}
                    title="Team Member"
                    alt="Team Member"
                    className="member-img"
                  />
                  <div className="member-content">
                    <p className="member-designation">MEMBER</p>
                    <h3 className="member-name">{member?.name}</h3>
                    <p className="para-line">
                      {member?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DepartmentsDetails