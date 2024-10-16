import React from "react";
import blog from '../../images/party.jpg';
import bridge from '../../images/b1.jpg';
import bridge1 from '../../images/b2.jfif';
import bridge2 from '../../images/b3.jpg';
import Footer from '../footer/footer';
import './blog.css';

export default function Blog() {
    return(
        <div>
            <img src={blog} className="blog" alt="blog_img" />
            <div>
                
                <div className="services_sec_hm">
                <h1>Blog</h1>
                <div className="abc">
                <div className="card outer-card">
                <img src={bridge} className="bridge" alt="bridge_img" />
                <div className="card1 inner-card">
                <h3>Lorem ipsum dolor sit</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                </div>
                </div>
                <div className="card outer-card">
                <img src={bridge1} className="bridge1" alt="bridge_img" />
                <div className="card1 inner-card">
                <h3>Lorem ipsum dolor sit</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                </div>
                </div>
                <div className="card outer-card">
                <img src={bridge2} className="bridge2" alt="bridge_img" />
                <div className="card1 inner-card">
                <h3>Lorem ipsum dolor sit</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                </div>
                </div>
                </div>
            </div>
            </div>
            
            <Footer />
        </div>
    )
}
