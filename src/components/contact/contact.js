import React from 'react';
import contact from '../../images/Capture1.JPG';
import './contact.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMap, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../footer/footer';
import phone from '../../images/phone1.png';
import map from '../../images/map.png';
import mail from '../../images/email.png';


library.add(faMap, faPhone, faEnvelope);

export default function Contact() {
   
    return (
        <div>
            <div className='bg_color'>
                <img src={contact} className="c-contact" alt="contact_img" />
                <h1 className='contact-heading'>SEND YOUR <span>MESSAGE</span></h1>
                <form>
                    <label>NAME</label>
                    <input id="name" className="contact-name" type="text" placeholder="Your Name" required="" />
                    <label>EMAIL</label>
                    <input id="email" className="contact-email" type="text" placeholder="Your Email" required="" />
                    <label>PHONE</label>
                    <input id="mobile" className="contact-mobile" type="text" placeholder="Your Phone" maxlength="10" pattern="[1-9]{1}[0-9]{9}" required="" />
                    <label>EVENT</label>
                    <select className="c-event" required="">
                        <option value="">Select Event</option>
                        <option value="Wedding & Reception">Wedding &
                            Reception</option>
                        <option value="Corporate Events">Corporate
                            Events</option>
                        <option value="Audio Launch">Audio Launch
                        </option>
                        <option value="Birthday Services">Birthday
                            Services</option>
                        <option value="Sports Events">Sports Events
                        </option>
                        <option value="Media Planners">Media Planners
                        </option>
                        <option value="Celebrity Managmentes">Celebrity
                            Managmentes</option>
                        <option value="Occasional Events">Occasional
                            Events</option>
                        <option value="Entertainment">Entertainment
                        </option>
                        <option value="Sfxproducts">Sfx Products
                        </option>
                        <option value="Others">Others</option>
                    </select>
                    <div>
                        <label for="location">
                            VENUE
                        </label>
                        <input id="location" className="location" type="text" placeholder="" required="" />
                    </div>
                    <div >
                        <label for="date">DATE OF EVENT</label>
                        <input id="date" className="date" type="date" placeholder=""
                            required="" />
                    </div>
                    <div>
                        <div >
                    <select className="contact-event" required="">
                        <option value="">Estimation</option>
                        <option value="Wedding & Reception">1 - 5lakhs</option>
                        <option value="Corporate Events">5 - 10lakhs
                        </option>
                        <option value="Audio Launch">l0 - 15lakhs
                        </option>
                        <option value="Birthday Services">15 - 20lakhs

                        </option>
                        <option value="Sports Events">20 - 25lakhs
                        </option>
                        <option value="Media Planners">25 - 30lakhs
                        </option>
                    </select>
                    </div>
                    </div>
                    <div>
                        <label for="message">NOTES</label>
                        <textarea name="message" id="message" cols="30" rows="10"
                            placeholder=""></textarea>
                    </div>
                    <div>
                        <button type="submit">Send your message</button>
                    </div>
                </form>
            </div>
            <div>
                <h1 className='contact-heading1'>KEEP IN <span>TOUCH </span></h1>
                <p>We create events aiming to pear to the voice for
                    children and gather for
                    support. <br />Please
                    update with our events and confirm you presence.</p>
                    <div className="row1 keep-in-touch-therd-box">
        <div className="col-md-9">
          <div className="single-box text-center">
          <img src={map} className="contact-map-icon" alt=''/>
            <h3>ADDRESS</h3>
            <p>Vajraksh ,Hyderabad, Telangana
            </p>
          </div>
        </div>
        <div className="col-md-9">
          <div className="single-box1 text-center">
          <img src={phone} className="contact-phone-icon" alt=''/>
            <h3>CALL US</h3>
            <p>+91 9248755551</p>
          </div>
        </div>
        <div className="col-md-9">
          <div className="single-box2 text-center">
          <img src={mail} className="contact-mail-icon" alt=''/>
            <h3>EMAIL US</h3>
            <p>info@vajrakshevents.com</p>
          </div>
        </div>
      </div>
            </div>
            <div className='bg_color'>
            <div className='map-container'>
            <iframe
  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15226.499168375509!2d78.446208!3d17.429785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90cbb2d20ad7%3A0x2b171f1f42c17851!2sVajra%20Events!5e0!3m2!1sen!2sin!4v1691001123237!5m2!1sen!2sin"
  title="Google Maps - Vajraksh Events Location"
  className='map-contact'
  width="80%"
  frameborder="0"
  height="450"
  style={{ border: '0', marginTop: '2%' }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
            </div>
            </div>
            <Footer />
        </div>
    )
}
