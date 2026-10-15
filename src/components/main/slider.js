import React, { useState } from 'react';
import user1 from '../../images/user1.png';
import user2 from '../../images/user2.png';
import "./main.css";

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      content:
        "I have attended many marriage events over the years, but the one I recently attended the marriage at Vajraksh Events stood out from the rest. The event was flawlessly planned and executed, with every detail perfectly thought out. The couple's love story was beautifully woven into the event, creating a romantic and heartwarming atmosphere. The food was absolutely delicious, and the music kept everyone on the dance floor all night long. What I appreciated most about the event was the sense of community it created. Friends and family came together to celebrate the love of the newlyweds, and it was a beautiful reminder of the importance of building strong relationships. It was a truly wonderful experience, and I feel lucky to have been a part of it.",
      author: "Avinash Sheela",
      image: user1,
    },
    {
      content:
        "Our event's success wouldn't have been possible without the expertise and commitment of the Vajraksh Event team. We received rave reviews from our attendees, who praised the event's organization and the team's professionalism. We can't thank them enough for creating an event that not only met but exceeded our expectations.",
      author: "Veronica Shreya",
      image: user2,
    },
    {
      content:
        "Throughout the planning process, Vajraksh Events kept me informed and involved, making sure every aspect was tailored to my preferences. Their creativity and ability to think outside the box brought a unique and unforgettable touch to the event.",
      author: "Patawar Abhishek",
      image: user1,
    },
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      <div id="testimonial-slider" className='owl-carousel owl-theme' style={{opacity:'1',display:'block'}}>
        <div className='owl-wrapper-outer'>
        <div className="testimonial-slide" style={{width:'690px'}}>
          <div className="testimonial">
            <p className="description">{testimonials[currentSlide].content}</p>
            <h3 className="title">{testimonials[currentSlide].author}</h3>
            <div className="pic">
              <img src={testimonials[currentSlide].image} alt={testimonials[currentSlide].author} />
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="testimonial-buttons">
        {testimonials.map((_, index) => (
        <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`round-button ${currentSlide === index ? 'active' : ''}`}
      >
        {index + 1}
      </button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
