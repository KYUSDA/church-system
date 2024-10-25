import React from 'react';
import Header from '../../Navbar/Header';
import MainFooter from '../../Footer/MainFooter';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { urlFor } from '../../../client';
import './SingleFamily.css';
const SingleFamily = () => {
    const location = useLocation();
    const familyId = location.pathname.split('/')[2];
    const family = useSelector((state) => state?.families?.families).find((family) => family?._id === familyId);
    return (
        <div>
            <div>
                <Header />
                <section className='imageContainer'>
                    <img src={urlFor(family.imgUrl)}
                        alt={family.title} />
                    <div className="breadcrumb-container">
                        <h2 className="hero-heading white">{family?.title?.toUpperCase()} FAMILY</h2>
                    </div>
                </section>
                <section className='future'>
                    <div className="container">
                        <div className="heading">
                            WELCOME TO {family?.title?.toUpperCase()} FAMILY
                        </div>
                        <p className="para-line">
                            {family?.description}
                        </p>
                    </div>
                </section>
                <section className="googleMap">
                    <img src={urlFor(family?.locationUrl)}
                        alt="family location" />
                </section>
                <section className="our-team">
                    <div className="container">
                        <h4 className="sub-heading">{family?.title?.toUpperCase()} LEADERS</h4>
                        <h2 className="heading">OUR LEADERS</h2>
                        <div className="team-leaders">
                            {family?.leaders?.map((leader, id) => (
                                <div className="team-leader" key={id}>
                                    <img
                                        src={urlFor(leader?.leaderUrl)}
                                        title="Team Leader"
                                        alt="Team Member"
                                        className="leader-img"
                                    />
                                    <div className="member-leader">
                                        <p className="leader-designation">ROLE : FAMILY LEADER</p>
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
                            {family?.title?.toUpperCase()} MEMBERS
                        </h2>
                        <div className="team-members">
                            {family?.members?.map((member, id) => (
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
                <div style={{ marginTop: "20px", height: '150px' }}>
                    <MainFooter />
                </div>
            </div>
        </div>
    )
}

export default SingleFamily