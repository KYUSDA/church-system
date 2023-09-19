import React from 'react'
import { Link } from 'react-router-dom';
import './SlideShow.css';
import kyusdalogo from './img/kyusdalogo.png';
import aboutImage from './img/bgimage7.jpg';
import announcementImage from './img/annoucement2.jpg';
const Slideshow = () => {
    return (
        <div>
            <header>
                <div className="slideshow-container">
                    <div className="mySlides fade">
                        <div className="bg-showcase"></div>
                        <div className="slideshow-text">
                            <h2>welcome to kyusda</h2>
                            <p className="slogan">We Love You, We Cherish you, and We Value you.</p>
                            <br />
                            <br />
                        </div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">1 / 2 update</div>
                        <div className="bg-showcase-announcement1"></div>
                    </div>

                    <div className="mySlides fade">
                        <div className="numbertext">2 / 2 update</div>
                        <div className="bg-showcase-announcement2"></div>
                    </div>
                    <a className="prev" onClick="plusSlides(-1)">&#10094;</a>
                    <a className="next" onClick="plusSlides(1)">&#10095;</a>
                </div>
                <div className="dots">
                    <span className="dot" onClick="currentSlide(1)"></span>
                    <span className="dot" onClick="currentSlide(2)"></span>
                    <span className="dot" onClick="currentSlide(3)"></span>
                </div>
            </header>
            {/* <nav id="main">
                <ul>
                    <li className="logo"><a href="#"><img src={kyusdalogo} alt="KYUSDA logo" width="40" height="40" /></a></li>
                    <li className="nav-icons"><i className="fa fa-home"></i><a href="#">Home</a></li>
                    <li className="nav-icons"><i className="fa-solid fa-people-group"></i><a href="#">Families</a></li>
                    <li className="nav-icons"><i className="fa fa-building"></i><a href="#">Departments</a></li>
                    <li className="nav-icons"><i className="fa fa-calendar"></i><a href="#">Events</a></li>
                    <li className="nav-icons"><i className="fa-solid fa-book"></i><a href="#">Resources</a></li>
                    <li className="nav-icons"><i className="fa-solid fa-book"></i><a href="#">Blogs</a></li>
                    <li ><Link href="#" class="active">Membership</Link></li>
                </ul>
            </nav> */}
            <div className="site-wrap">
                {/* <div className="about-us-img">
                    <img src={aboutImage} alt="medical students" title="medical students after a sabbath worship" />
                    <div class="icons">
                        <a href="https://www.youtube.com/@kyusdachurch9822" target="_blank"><i className="fab fa-youtube fa-2x" style={{ color: 'red' }}></i></a>
                        <a href=""><i className="fab fa-facebook fa-2x" style={{ color: 'blue' }}></i></a>
                        <a href=""><i className="fa fa-envelope fa-2x" style={{ color: '#333' }}></i></a>
                    </div>
                </div> */}

                {/* <div className="about-us-description">
                    <h2>About us</h2>
                    <h4 className="about-text-title">Our Mission</h4>
                    <p className="about-us-paragraphs">
                        Make disciples of Jesus Christ who live as His loving witnesses and proclaim to all people the everlasting gospel of the Three Angels’ Messages in preparation for His soon return (Matt 28:18-20, Acts 1:8, Rev 14:6-12).
                    </p>
                    <h4 className="about-text-title">Our Method</h4>
                    <p className="about-us-paragraphs">
                        Guided by the Bible and the Holy Spirit, we pursue this mission through Christ-like living, communicating, discipling, teaching, healing, and serving.
                    </p>
                    <h4 className="about-text-title">Our Worship</h4>
                    <p className="about-us-paragraphs">
                        Join us for our vesperses, weekly Sabbath worship services, where we come together to worship, sing hymns, and study God's Word. We also offer various ministries and programs to enrich your spiritual journey and help you grow in your relationship with God.
                    </p>
                    <h4 className="about-text-title">Our History</h4>
                    <p className="about-us-paragraphs">
                        Kyusda has a rich history of serving the community and spreading the message of hope and salvation. Founded 23rd Feb 2019, our church has been a beacon of light in the university for generations.
                    </p>
                    <h4 className="about-text-title">Get Involved</h4>
                    <p className="about-us-paragraphs">
                        We invite you to be part of our church family. Whether you are seeking spiritual growth, fellowship, or a place to serve, Kyusda has a place for you. Explore our website to learn more about our ministries, events, and how you can get involved.
                    </p>
                </div> */}

                {/* <div class="featured-content">
                    <div class="featured-content-text">
                        <h2>Featured Content</h2>
                    </div>
                    <div class="featured-content-img-holder">
                        <figure class="img-holder">
                            <a href="">
                                <img src={announcementImage} alt="featured content" />
                            </a>
                            <figcaption>camp meeting 2023</figcaption>
                        </figure>
                        <figure class="img-holder">
                            <a href="">
                                <img src={announcementImage} alt="featured content" />
                            </a>
                            <figcaption>camp meeting 2023</figcaption>
                        </figure>
                        <figure class="img-holder">
                            <a href="">
                                <img src={announcementImage} alt="featured content" />
                            </a>
                            <figcaption>camp meeting 2023</figcaption>
                        </figure>
                        <figure class="img-holder">
                            <a href="">
                                <img src={announcementImage} alt="featured content" />
                            </a>
                            <figcaption>camp meeting 2023</figcaption>
                        </figure>
                        <figure class="img-holder">
                            <a href="">
                                <img src={announcementImage} alt="featured content" />
                            </a>
                            <figcaption>camp meeting 2023</figcaption>
                        </figure>
                        <figure class="img-holder">
                            <a href="">
                                <img src={announcementImage} alt="featured content" />
                            </a>
                            <figcaption>camp meeting 2023</figcaption>
                        </figure>
                        <figure class="img-holder">
                            <a href="">
                                <img src={announcementImage} alt="featured content" />
                            </a>
                            <figcaption>camp meeting 2023</figcaption>
                        </figure>
                        <figure class="img-holder">
                            <a href="">
                                <img src={announcementImage} alt="featured content" />
                            </a>
                            <figcaption>camp meeting 2023</figcaption>
                        </figure>
                        <figure class="img-holder">
                            <a href="">
                                <img src={announcementImage} alt="featured content" />
                            </a>
                            <figcaption>camp meeting 2023</figcaption>
                        </figure>
                        <figure class="img-holder">
                            <a href="">
                                <img src={announcementImage} alt="featured content" />
                            </a>
                            <figcaption>camp meeting 2023</figcaption>
                        </figure>
                    </div>
                </div> */}
                {/* <div class="footer">
                    <div className="footer-title">
                        <h2>Contact Us</h2>
                        <hr />
                    </div>

                    <div className="footer-content-left">
                        <p><i className="fa fa-map-marker"></i>Kirinyaga Campus</p>
                        <p><i className="fas fa-at"></i>P.O. Box: 143-10300 Kerugoya, Kenya.</p>
                    </div>
                    <div className="footer-content-right">
                        <p><i className="fa fa-phone"></i>+254 111 834 738</p>
                        <p><i className="fa fa-envelope-open"></i> kyusdachurch@gmail.com</p>
                    </div>
                    <div className="copyright">
                        <p>&copy; 2019 - 2023 KYUSDA Church</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Slideshow
