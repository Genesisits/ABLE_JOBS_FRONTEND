import React from "react";
import "./about.css";
import img from '../../images/h5.jfif';
import img1 from '../../images/a2.jpg';
import img2 from '../../images/a3.jfif';
import Footer from '../footer/footer';
import 'font-awesome/css/font-awesome.min.css';

export default function About() {

        
        return (
                <div className="my-about-container">
                        <div>
                                <img src={img} className="about-img1" alt="about_img" />
                        </div>
                        <div className="about-container1">
                                <div className="row about-row-1">
                                        <div className="about-text">
                                                <div className="about-heading">
                                                        <h4>About Us</h4>
                                                        <p style={{ fontSize: '1rem' }}>Developing events after a careful study of the brand and
                                                                considering its objective. Delivering the best possible to generate maximum response towards the
                                                                products and clients. Deciphering the response: Project Evaluation and Feedback. These EVENTS give an
                                                                insight into the actual size and help us in defining best strategy for our clients. An Exclusive Event
                                                                Organiser in Hyderabad.</p>
                                                        <h5>
                                                                <span>IN THE MEDIA</span>
                                                                <ul className="event-list">
                                                                        <li><i className="fa fa-hand-o-right"> Social Events</i></li>
                                                                        <li><i className="fa fa-hand-o-right"> Corporate</i></li>
                                                                        <li><i className="fa fa-hand-o-right"> Mice</i></li>
                                                                        <li><i className="fa fa-hand-o-right"> movies</i></li>
                                                                        <li><i className="fa fa-hand-o-right"> Entertainment</i></li>
                                                                        <li><i className="fa fa-hand-o-right"> Sports Events</i></li>
                                                                        <li><i className="fa fa-hand-o-right"> Celebrity Management</i></li>
                                                                        <li><i className="fa fa-hand-o-right"> Occasional Events</i></li>
                                                                </ul>
                                                        </h5>
                                                </div>
                                                <div>
                                                        
                                                <img className="about_img2" src={img1} alt="about_img" />
                                                <img className="about_img3" src={img2} alt="about_img" />
                                        

                                                </div>

                                        </div>

                                </div>
                                <div className="about-container2">
                                        <h1>Wedding Planner and Event Organizer Services In Hyderabad</h1>
                                        <p><i className="fa fa-hand-o-right"></i> Event Organizer with an
                                        Exclusive Wedding and event management company based in
                                        Hyderabad and networking allover India. Events management more than skill is an art.
                                        An art of understanding someone else’s vision and bringing it alive into a tangible
                                        product.</p>
                                        <p><i className="fa fa-hand-o-right"></i> Event Organizer Services and
                                        Exclusive Wedding Planner Hyderabad Vajra events make
                                        your memorable events with us and will be unforgettable event in life.</p>
                                        <p><i className="fa fa-hand-o-right"></i> We started our journey with a
                                        wedding and here we are today, doing corporate events,
                                        audio Launches, Brand promotions being a few to begin with.</p>
                                        <p><i className="fa fa-hand-o-right"></i> Our services also include
                                        Birthday parties, exhibitions, trade shows, award functions, School and college
                                        Fests, Celebrity Management, fashion shows etc</p>

                                </div>
                                <div className="about-container3">
                                <h1>The VAJRAKSH process</h1>
                                <p><i className="fa fa-hand-o-right"></i> Taking the detailed brief.</p>
                                <p><i className="fa fa-hand-o-right"></i> Identification of tasks and
                                        finalizing detailed checklist.</p>
                                <p><i className="fa fa-hand-o-right"></i> Ideas based on the final objective.</p>
                                <p><i className="fa fa-hand-o-right"></i> Execution.</p>
                                <p><i className="fa fa-hand-o-right"></i> Event co-ordination.</p>
                                <p><i className="fa fa-hand-o-right"></i> Concept development.</p>
                                <p><i className="fa fa-hand-o-right"></i> Evaluation and Client feedback.</p>
                                </div>

                        </div>
                <Footer/>
                </div>

        )
}
