import React from 'react';
import Header from '../../Navbar/Header';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
const SingleFamily = () => {
    const location = useLocation();
    const familyId = location.pathname.split('/')[2];
    console.log(familyId);
    const family = useSelector((state) => state?.families?.families).find((family) => family?._id == familyId);
    console.log(family);
    //find(family => family?._id == familyId);
    return (
        <div>
            <Header />
            <section className='breadcrumbs'>
                <div className="breadcrumb-container">
                    <h2 className="hero-heading white">DIASPORA A FAMILY</h2>
                </div>
            </section>
            <section className='future'>
                <div className="container">
                    <h4 className="sub-heading">
                        Section overline
                    </h4>
                    <div className="heading">
                        WELCOME TO DIASPORA A FAMILY!
                    </div>
                    <p className="para-line">
                        A family situated at Diaspora area. We develop a bond as we all know
                        togetherness in brotherhood is a ke thing. We assemble to learn at
                        Jesus feet share the word and equip one another with the truth.
                    </p>
                </div>
            </section>
            <section className="out-team">
                <div className="container">
                    <h4 className="sub-heading">DIASPORA A LEADERS</h4>
                    <h2 className="heading">OUR LEADERS</h2>
                    <div className="team-leaders">
                        <div className="team-leader">
                            <img
                                src="img/joshua.jpg"
                                title="Team Member"
                                alt="Team Member"
                                className="leader-img"
                            />
                            <div className="member-leader">
                                <p className="leader-designation">FAMILY ELDER</p>
                                <h3 className="leader-name">Elder Joshua Hamisi</h3>
                                <p className="para-line">
                                    Am glad we always meet to share the word of God.
                                </p>
                            </div>
                        </div>

                        <div className="team-leader">
                            <img
                                src="img/person.png"
                                title="Team Member"
                                alt="Team Member"
                                class="leader-img"
                            />
                            <div className="leader-content">
                                <p className="leader-designation">FAMILY LEADER</p>
                                <h3 className="leader-name">Sharon Morgan</h3>
                                <p className="para-line">
                                    Welcome to Diaspora family we we create a bond as we share the
                                    word of God.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SingleFamily