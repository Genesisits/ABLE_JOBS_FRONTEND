import React, { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Footer from '../footer/footer';

import { images } from "./images";

export default function App() {
  const [weddingIndex, setWeddingIndex] = useState(-1);
  const [corporateIndex, setCorporateIndex] = useState(-1);

  const handleWeddingClick = (index, item) => setWeddingIndex(index);
  const handleCorporateClick = (index, item) => setCorporateIndex(index);

  const fixedWidth = 700; 
  const fixedHeight = 700; 

  return (
    <div>
      <img
        style={{ width: '100%', height: '500px' }}
        src={require('../../images/blog_img.jpg')}
        alt="Blog Header"
      />
      <div style={{ paddingLeft: '7%', paddingRight: '7%' }}>
        <h1>Wedding and Reception</h1>
        <Gallery
          images={images.filter(img => !img.corporate)}
          onClick={handleWeddingClick}
          enableImageSelection={false}
        />
        <Lightbox
          slides={images.filter(img => !img.corporate).map(({ original }) => ({
            src: original,
            width: fixedWidth,
            height: fixedHeight,
          }))}
          open={weddingIndex >= 0}
          index={weddingIndex}
          close={() => setWeddingIndex(-1)}
        />
        <br />
        <h1>Corporate events</h1>
        <Gallery
          images={images.filter(img => img.corporate)}
          onClick={handleCorporateClick}
          enableImageSelection={false}
        />
        <Lightbox
          slides={images.filter(img => img.corporate).map(({ original }) => ({
            src: original,
            width: fixedWidth,
            height: fixedHeight,
          }))}
          open={corporateIndex >= 0}
          index={corporateIndex}
          close={() => setCorporateIndex(-1)}
        />
        
      </div>
      <Footer />
    </div>
  );
}
