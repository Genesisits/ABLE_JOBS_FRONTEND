import React from "react";
import blog from '../../images/c2.jpg';
import Footer from '../footer/footer';
import './careers.css';


export default function Careers() {
  
    const inputStyle = {
        // width: '100%',
        // fontSize: '14px',
        // marginBottom: '-1px',
        padding: '4px 5px',
        // outline: 'none',
        backgroundColor: '#fff',
        border: '1px solid #212529',
        // color: '#212529',
        borderRadius: '6px 6px 6px 6px',
        
      };
    return (
        <div>
            <img src={blog} className="careers" alt="careers_img" />
            <h1 className="text5">CURRENT JOB OPENINGS</h1>
            <div className="text4">
                <p><strong>Position : </strong>Production</p>
                <p><strong>Experience : </strong>1-4 Years</p>
                <p><strong>Position : </strong>Business Development Executive</p>
                <p><strong>Experience : </strong>1-3 Years</p>
                <p><strong>Position : </strong>Graphic Designer</p>
                <p><strong>Experience : </strong>1-3 Years</p>
                <p><strong>Position : </strong>Tele caller</p>
                <p><strong>Experience : </strong>0-3 Years</p>
                <p><strong>Position : </strong>Intership</p>

                <ul className="style">
                    <li className="arrow-item"><i className="fa fa-arrow-right" ></i>
                        Understanding the
                        requirements for each event & Planning the event with attention to financial
                        and time
                        constraints.</li>
                    <li className="arrow-item"><i className="fa fa-arrow-right"></i>
                        Researching vendors
                        (catering, decorators, musicians etc.) and choosing the best combination of
                        quality and cost
                        Negotiating with vendors to achieve the most favorable terms.</li>
                    <li className="arrow-item"><i className="fa fa-arrow-right"></i>
                        Overseeing event
                        happenings and acting quickly to resolve problems & Evaluating the event's
                        success and
                        submitting reports.</li>
                </ul>
                <p><b>Immediate requirement interested candidates can apply.</b></p>
                <p><b>Forward your resumes to: careers@vajrakshevents.com</b></p>
            </div>
            <div>
                <div className="careers1">
                    <div className="career-container">
                        <div className="careers-row1">
                            <h1 className="text">Apply Here</h1>
                            {/* <div className="register-form"> */}
                            <form>
                                <div className="career-controls">
                                    <div className="careers-row2">
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="form_name">Full Name *</label>
                                            <input id="form_name" style={inputStyle} type="text" name="name"
                                                className="form-control"
                                                placeholder="Please enter your Full Name *"
                                                required="required" data-error="Firstname is required." />
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="form_email">Email *</label>
                                            <input id="form_email" style={inputStyle} type="email" name="email"
                                                className="form-control" placeholder="Please enter your email *"
                                                required="required" data-error="Valid email is required." />
                                        </div>
                                        </div>
                                    </div>
                                    <div className="careers-row2">
                                    <div className="col-md-6">
                                    <div className="form-group">
                                                        <label for="form_phone">Phone *</label>
                                                        <input id="form_phone" style={inputStyle} type="tel" name="mobile"
                                                            className="form-control" placeholder="Please enter your Phone" maxlength="10"  pattern="[1-9]{1}[0-9]{9}" required="" />
                                                    </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label for="form_phone" >Upload Resume *</label>
                                                        <input type="file" style={inputStyle} id="file" name="cm_resume"
                                                         className="form-control"   accept=".doc,.docx,.pdf" required=""/>
                                                    </div>
                                                    </div>
                                    </div>
                                    <div className="careers-row2">
                                    <div className="col-md-12">
                                    <div className="form-group">
                                                        <label for="form_message">Message *</label>
                                                        <textarea id="form_message" name="message" class="form-control"
                                                            placeholder="Message for me *" rows="4" required="required"
                                                            data-error="Please,leave us a message."></textarea>
                                                    </div>
                                                    </div>
                                    </div>
                                    <div className="col-md-12">
                                    <div className="career-btn">
                                                        <input type="submit" className="btn btn-success btn-send"
                                                            value="Send message"/>
                                                    </div>
                                                    </div>
                                </div>
                            </form>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>


    )
}
