import React, { useState, useEffect } from 'react';
import Services from './services';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sports_img from '../../images/sports.jpg';
import './sports.css';
import banner from '../../images/banner_nv4.png'
import bgImage from '../../images/bg_pattern_1.png';
import { CALCULATE_PRICE_URL, CORPORATE_DEC, CORPORATE_CHAIRS, CORPORATE_GIFTS, CORPORATE_SHEILDS,ENTERTAINMENT,PHOTOGRAPHY,NON_VEG_ITEMS , VEG_ITEMS,FOOD_ITEMS,VENUE } from '../../endpoints';
import './services.css';
import axios from 'axios';
import Footer from '../footer/footer';
import Modal from 'react-modal';
import  ReactGA  from 'react-ga4';
import * as yup from 'yup';
// import  ReactGA  from 'react-ga4';
import { useNavigate } from 'react-router-dom';
const validationSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Invalid name'),
  email: yup.string()
    .email('Invalid email')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/, 'Invalid email address')
    .required('Email is required'),
    
  phone: yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid phone number')
    .required('Phone number is required'),
});
const createToggleVisibilityFunction = (setState, stateToReset) => () => {
  setState((prevState) => !prevState);
  stateToReset.forEach((state) => state(false));
};

const SportsEvents = () => {
  const [decorationData, setDecorationData] = useState([]);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [showDecoration, setShowDecoration] = useState(false);
  const [chairsData, setChairsData] = useState([]);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const [showChairs, setShowChairs] = useState(false);
  const [gifts, setGifts] = useState([]);
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [showGifts, setShowGifts] = useState(false);
  const [sheilds, setSheilds] = useState([]);
  const [selectedSheilds, setSelectedSheilds] = useState([]);
  const [showSheilds, setShowSheilds] = useState(false);
  const [entertainment,setEntertainment] = useState([]);
  const [selectedEntertainment,setSelectedEntertainment] = useState([]);
  const [showEntertainment, setShowEntertainment] = useState(false);
  const [photography, setPhotography] = useState([]);
  const [selectedPhotography, setSelectedPhotography] = useState([]);
  const [showPhotography, setShowPhotography] = useState(false)
  const [nonveg,setNonveg] = useState([]);
  const [veg,setVeg] = useState([]);
  const [food,setFood] = useState([]);
  const [selectedNonveg, setSelectedNonveg] = useState([]);
  const [selectedVeg,setSelectedVeg] = useState([]);
  const [selectedFood,setSelectedFood] = useState([]);
  const [showNonveg, setShowNonveg] = useState(false);
  const [selectedFoodCategory, setSelectedFoodCategory] = useState(null);
  const [venue,setVenue] = useState([]);
  const [selectedVenue,setSelectedVenue] = useState([]);
  const [showVenue, setShowVenue] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFoodSelection = (category) => {
    setSelectedFoodCategory(category);
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get(CORPORATE_CHAIRS)
    .then(response => {
      setChairsData(response.data);
      setIsLoading(false); 
    })
    .catch(error => {
      console.error('Error fetching chairs data:', error);
      setIsLoading(false); 
    })
    setIsLoading(true);
  axios.get(CORPORATE_DEC)
  .then(response => {
    setDecorationData(response.data);
    setIsLoading(false); 
  })
  .catch(error => {
    console.error('Error fetching chairs data:', error);
    setIsLoading(false); 
  })
  setIsLoading(true);
  axios.get(NON_VEG_ITEMS)
  .then(response => {
    setNonveg(response.data);
    setIsLoading(false); 
  })
  .catch(error => {
    console.error('Error fetching chairs data:', error);
    setIsLoading(false); 
  })
    setIsLoading(true);
    axios.get(VEG_ITEMS)
    .then(response => {
      setVeg(response.data);
      setIsLoading(false); 
    })
    .catch(error => {
      console.error('Error fetching chairs data:', error);
      setIsLoading(false); 
    })
    setIsLoading(true);
    axios.get(FOOD_ITEMS)
    .then(response => {
      setFood(response.data);
      setIsLoading(false); 
    })
    .catch(error => {
      console.error('Error fetching chairs data:', error);
      setIsLoading(false); 
    })
    setIsLoading(true);
    axios.get(CORPORATE_GIFTS)
    .then(response => {
      setGifts(response.data);
      setIsLoading(false); 
    })
    .catch(error => {
      console.error('Error fetching chairs data:', error);
      setIsLoading(false); 
    })
    setIsLoading(true);
    axios.get(VENUE)
    .then(response => {
      setVenue(response.data);
      setIsLoading(false); 
    })
    .catch(error => {
      console.error('Error fetching chairs data:', error);
      setIsLoading(false); 
    })
    setIsLoading(true);
    axios.get(CORPORATE_SHEILDS)
    .then(response => {
      setSheilds(response.data);
      setIsLoading(false); 
    })
    .catch(error => {
      console.error('Error fetching chairs data:', error);
      setIsLoading(false); 
    })
    setIsLoading(true);
    axios.get(PHOTOGRAPHY)
    .then(response => {
      setPhotography(response.data);
      setIsLoading(false); 
    })
    .catch(error => {
      console.error('Error fetching chairs data:', error);
      setIsLoading(false); 
    })
    setIsLoading(true);
    axios.get(ENTERTAINMENT)
    .then(response => {
      setEntertainment(response.data);
      setIsLoading(false); 
    })
    .catch(error => {
      console.error('Error fetching chairs data:', error);
      setIsLoading(false); 
    })
    ReactGA.initialize('G-3Z5SJGDL7N'); 
  }, []);

  const handleDecorationSelection = (item) => {
    if (selectedDecoration && selectedDecoration.item_id === item.item_id) {
      setSelectedDecoration(null);
    } else {
      setSelectedDecoration({ ...item, quantity: 1 });
    }
  };
  const handleChairSelection = (item, quantity) => {
    const isAlreadySelected = selectedChairs.some(chair => chair.item_id === item.item_id);

    if (isAlreadySelected) {
      if (quantity > 0) {
        setSelectedChairs(selectedChairs.map(chair =>
          chair.item_id === item.item_id ? { ...chair, quantity } : chair
        ));
      } else {
        setSelectedChairs(selectedChairs.filter(chair => chair.item_id !== item.item_id));
      }
    } else {
      setSelectedChairs([...selectedChairs, { ...item, quantity }]);
    }
  };
  const handleGiftsselection = (item) => {
    if (!Array.isArray(selectedGifts)) {
      setSelectedGifts([]);
      return;
    }
    const selectedIndex = selectedGifts.findIndex((gifts) => gifts.item_id === item.item_id);
    if (selectedIndex !== -1) {
      const updatedSelection = [...selectedGifts];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedGifts(updatedSelection);
    } else {
      setSelectedGifts([...selectedGifts, { ...item, quantity: 1 }]);
    }
  };
  const handleSheildsselection = (item) => {
    if (!Array.isArray(selectedSheilds)) {
      setSelectedSheilds([]);
      return;
    }
    const selectedIndex = selectedSheilds.findIndex((sheilds) =>sheilds.item_id === item.item_id);
    if (selectedIndex !== -1) {
      const updatedSelection = [...selectedSheilds];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedSheilds(updatedSelection);
    } else {
      setSelectedSheilds([...selectedSheilds, { ...item, quantity: 1 }]);
    }
  };
  const handleEntertainmentselection = (item) => {
    if (!Array.isArray(selectedEntertainment)) {
      setSelectedEntertainment([]);
      return;
    }
    const selectedIndex = selectedEntertainment.findIndex((entertainment) =>entertainment.item_id === item.item_id);
    if (selectedIndex !== -1) {
      const updatedSelection = [...selectedEntertainment];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedEntertainment(updatedSelection);
    } else {
      setSelectedEntertainment([...selectedEntertainment, { ...item, quantity: 1 }]);
    }
  };
  const handlePhotographyselection = (item) => {
    if (!Array.isArray(selectedPhotography)) {
      setSelectedPhotography([]);
      return;
    }
    const selectedItemIndex = selectedPhotography.findIndex((photographyItem) => photographyItem.item_id === item.item_id);

       if (selectedItemIndex !== -1) {
         const updatedSelection = [...selectedPhotography];
         updatedSelection.splice(selectedItemIndex, 1);
         setSelectedPhotography(updatedSelection);
       } else {
         setSelectedPhotography([...selectedPhotography, { ...item, quantity: 1 }]);
       }
  };
  const handleNonvegselection = (item) => {
     
    if (!Array.isArray(selectedNonveg)) {
      
      setSelectedNonveg([]);
      return;
    }
  
   
    const selectedIndex = selectedNonveg.findIndex((nonveg) => nonveg.item_id === item.item_id);
  
    if (selectedIndex !== -1) {
      
      const updatedSelection = [...selectedNonveg];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedNonveg(updatedSelection);
    } else {
     
      setSelectedNonveg([...selectedNonveg, { ...item, quantity: 1 }]);
    }
  };
  const handleVegselection = (item) => {
   
    if (!Array.isArray(selectedVeg)) {
      
      setSelectedVeg([]);
      return;
    }
  
   
    const selectedIndex = selectedVeg.findIndex((veg) => veg.item_id === item.item_id);
  
    if (selectedIndex !== -1) {
      
      const updatedSelection = [...selectedVeg];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedVeg(updatedSelection);
    } else {
     
      setSelectedVeg([...selectedVeg, { ...item, quantity: 1 }]);
    }
  }; 
  const handleFoodselection = (item) => {
   
    if (!Array.isArray(selectedFood)) {
      
      setSelectedFood([]);
      return;
    }
  const selectedIndex = selectedFood.findIndex((food) => food.item_id === item.item_id);
  
    if (selectedIndex !== -1) {
      
      const updatedSelection = [...selectedFood];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedFood(updatedSelection);
    } else {
     
      setSelectedFood([...selectedFood, { ...item, quantity: 1 }]);
    }
  };
  const handleVenueSelection = (item) => {
    if (selectedVenue&& selectedVenue.item_id === item.item_id) {
      setSelectedVenue(null);
    } else {
      setSelectedVenue({ ...item, quantity: 1 });
    }
  };

  const toggleChairsVisibility = createToggleVisibilityFunction(
    setShowChairs,
    [setShowDecoration, setShowNonveg, setShowGifts, setShowEntertainment, setShowVenue, setShowPhotography,setShowSheilds]
  );

  const toggleDecorationVisibility = createToggleVisibilityFunction(
    setShowDecoration,
    [setShowChairs, setShowNonveg, setShowGifts, setShowEntertainment, setShowVenue,setShowSheilds,setShowPhotography]
  );

  const toggleNonvegVisibility = createToggleVisibilityFunction(
    setShowNonveg,
    [setShowChairs, setShowDecoration,setShowSheilds, setShowGifts, setShowEntertainment, setShowVenue, setShowPhotography]
  );
  
  const toggleGiftsVisibility = createToggleVisibilityFunction(
    setShowGifts,
    [setShowChairs, setShowDecoration, setShowEntertainment,setShowNonveg, setShowVenue, setShowPhotography,setShowSheilds]
  );

  const toggleEntertainmentVisibility = createToggleVisibilityFunction(
    setShowEntertainment,
    [setShowChairs, setShowDecoration, setShowNonveg, setShowGifts, setShowVenue,setShowSheilds,  setShowPhotography]
  );

  const toggleSheildsVisibility = createToggleVisibilityFunction(
    setShowSheilds,
    [setShowChairs, setShowDecoration, setShowNonveg, setShowGifts, setShowEntertainment, setShowPhotography,setShowVenue]
  );

  const toggleVenueVisibility = createToggleVisibilityFunction(
    setShowVenue,
    [setShowChairs, setShowDecoration, setShowNonveg, setShowGifts, setShowEntertainment, setShowSheilds, setShowPhotography]
  );

  const togglePhotographyVisibility = createToggleVisibilityFunction(
    setShowPhotography,
    [setShowChairs, setShowDecoration,setShowSheilds, setShowNonveg, setShowGifts, setShowVenue, setShowEntertainment]
  );

  const isAnyItemSelected = () => {
    const selectedArrays = [
      selectedChairs,
      [selectedDecoration],
      selectedNonveg,
      selectedVeg,
      selectedFood,
      selectedGifts,
      selectedEntertainment,
      [selectedVenue],
      selectedSheilds,
      selectedPhotography,
    ];
  
    return selectedArrays.some((selectedArray) =>
      selectedArray.length > 0 && selectedArray.some((item) => item && item.quantity > 0)
    );
  };
  

  const handleCalculatePrice = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
  
      // ReactGA.event({
      //   category: 'Wedding_Button_Click',
      //   action: 'Calculate_Price_Wedding',
      //   label: 'Calculate_Price_Wedding',
      // });
  
      const { email } = formData;
      const selectedItems = [
        ...selectedChairs.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...(selectedDecoration ? [{ code: selectedDecoration.code, quantity: selectedDecoration.quantity || 1 }] : []),
      ...selectedGifts.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...selectedSheilds.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...selectedFood.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...selectedEntertainment.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...(selectedVenue ? [{ code: selectedVenue.code, quantity: selectedVenue.quantity || 1 }] : []),
      ...selectedPhotography.map(item => ({ code: item.code, quantity: item.quantity || 1 }))
      ];
  
      if (selectedItems.length > 0) {
        toast.info('Your quote is being prepared, please be patient', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          className: 'custom-toast-info',
        });
  
        const response = await axios.post(CALCULATE_PRICE_URL, { ...formData, items: selectedItems });
  
        if (response.status === 200) {
          setIsModalOpen(false); // Close the modal
          sessionStorage.setItem("email", email);
          console.log('Form submitted:', formData);
  
          toast.success(`Please Check Your ${email} for the quote`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
          });
  
          // Redirect to wedding page after successful submission
          navigate('/sportsevents');
        }
      } else {
        toast.error('Select at least one item to get a quote', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } catch (errors) {
      if (errors.inner) {
        // Form is invalid, set form errors
        const errorsMap = {};
        errors.inner.forEach((error) => {
          errorsMap[error.path] = error.message;
        });
        setFormErrors(errorsMap);
      } else {
        console.error('Error calculating price:', errors);
        toast.error('Error calculating price. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  };
  const renderItems = (items, selectedItems, handleSelection) => (
    <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', margin: '2px',marginLeft:'5%'}}>
      {items.map(item => (
        <li key={item.item_id} className="item" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
          <div>
            <input
              type="checkbox"
              checked={selectedItems.some(selectedItem => selectedItem?.item_id === item?.item_id)}
              onChange={() => handleSelection(item)}
            />
            <div>
              {item.item_name}
            </div>
          </div>
          {item.item_image && (
            <img
              src={`data:image/jpeg;base64,${item.item_image}`}
              alt={item.item_name}
              className="item-image"
              width="200" height="100"
            />
          )}
         
        </li>
      ))}
    </ul>
  );
  
  const RadioButtons = ({ options, selectedValue, onChange }) => (
    <div className="radio-buttons-container">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            value={option.value}
            style={{ paddingRight: '20px', width: '60%' }}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
  return (
    <div>
       <div className='inner_serv_hedding'>
        <h3> Sports Events</h3>
        <img src={banner} className='serv_inner_banner_wgm' alt=''  style={{ backgroundImage: `url(${bgImage})` }}/>
        </div>
        
           <div className='inner_Wedding_banner'>
      <div className='src-container'>
        <div className='src-row'>
          <div className='src-col-9 src-col-12'>
        <div className='inner_wedding_left'>
        <img src={sports_img} className="ser_img" alt="sports_img" />
          <h3>
            <span className='ser_span'>Sports Events</span>
          </h3>
          <p>Sports events serve as a platform for entertainment, excitement, and friendly competition, and can bring people together in support of a common goal or to celebrate their love of the game.</p>
          <p>Vajraksh events host and organize sports tournaments and events throughout the year. Organizers are drawn to our excellent facilities, convenient location, and also with the amazing weather. We follow the process of understanding client objectives and building the event step by step. We continuously strive to push the boundaries of a creative thought with every new project we take on.</p>
          <p>We have our dedicated team of experienced professionals who are experts in sports event planning, who help and coordinate with the team to execute with their planning, taking care of the basic steps to plan enjoyable sports tournaments and make the event fill with more fun and joy</p>
        </div>
        {/* </div> */}
          </div>
          <div className='ser-col-3 ser-col-sm-12'>
          <Services/>
          </div>
        </div>
      </div>
      </div>
      <div className="ModalContainer1">
      <div className="toggle-button1">
        <button onClick={toggleChairsVisibility}>Chairs</button>
        <button onClick={toggleDecorationVisibility}>Decoration</button>
        <button onClick={toggleNonvegVisibility}>Food</button>
        <button onClick={toggleGiftsVisibility}>Gifts</button>
        <button onClick={toggleSheildsVisibility}>Sheilds</button>
        <button onClick={toggleEntertainmentVisibility}>Entertainment</button>
        <button onClick={togglePhotographyVisibility}>Photography</button>
        <button onClick={toggleVenueVisibility}>Venue</button>
      </div>
      {isLoading ? (
  <p>Data loading...</p>
) : (
      <div>
      {showChairs && (
        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' ,marginLeft:'5%'}}>
          {chairsData.map(item => (
            <li key={item.item_id} className="item" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
              <div>
                {item.item_name}
              </div>
              {item.item_image && (
                <img
                  src={`data:image/jpeg;base64,${item.item_image}`}
                  alt={item.item_name}
                  className="item-image"
                  width="100" height="100"
                />
              )}
              <div className="quantity-input-container">
                <input
                style={{paddingTop:'-10%'}}
                  type="checkbox"
                  checked={selectedChairs.some(chair => chair.item_id === item.item_id)}
                  onChange={(e) => handleChairSelection(item, e.target.checked ? 0 : 0)}
                />
                <input
                  type="number"
                  min="0"
                  style={{ padding: '10px', width: '60%' }}
                  placeholder='Enter quantity'
                  value={selectedChairs.find(chair => chair.item_id === item.item_id)?.quantity || ''}
                  onChange={(e) => handleChairSelection(item, parseInt(e.target.value, 10))}
                  disabled={!selectedChairs.some(chair => chair.item_id === item.item_id)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {showDecoration && renderItems(decorationData, [selectedDecoration], handleDecorationSelection)}

{showNonveg && (
  <div>
    <h3 style={{ color: '#0056B3' }}>Food category</h3>
      <RadioButtons
        options={[
          { label: 'Nonveg', value: 'nonveg' },
          { label: 'Veg', value: 'veg' },
          { label: 'Both', value: 'both' },
        ]}
        selectedValue={selectedFoodCategory}
        onChange={(value) => handleFoodSelection(value)}
      />
    <ul style={{ listStyle: 'none', textAlign: 'center',margin:'10px', padding: '20px' }}>
      {selectedFoodCategory === 'nonveg' && renderItems(nonveg, selectedNonveg, handleNonvegselection)}
      {selectedFoodCategory === 'veg' && renderItems(veg, selectedVeg, handleVegselection)}
      {selectedFoodCategory === 'both' && renderItems(food, selectedFood, handleFoodselection)}
    </ul>
    {/* ... */}
  </div>
)}

{showGifts && renderItems(gifts, selectedGifts, handleGiftsselection)}

{showEntertainment && renderItems(entertainment, selectedEntertainment, handleEntertainmentselection)}

{showVenue && renderItems(venue, [selectedVenue], handleVenueSelection)}

{showSheilds && renderItems(sheilds, selectedSheilds, handleSheildsselection)}

{showPhotography && renderItems(photography, selectedPhotography, handlePhotographyselection)}
</div>
      )}
          
      <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Quote Modal"
          className="Model"
          // onSubmit={handleCalculatePrice}
          style={{
            overlay: {
              zIndex: 1000,
            },
            content: {
              overflow: 'auto', 
            },
          }} 
        >
          <h3 style={{textAlign:'center',color:'white'}}>Please Enter Your Detailes</h3>
          <form className='quote_form' onSubmit={handleCalculatePrice}>
          <label className='modal_quote_label' htmlFor="name">Name:</label>
          <input className='modal_quote_input' type="text4" id="name" name="name" value={formData.name} onChange={handleChange} />
          {formErrors.name && <span className="error-message">{formErrors.name}</span>}

          <label className='modal_quote_label' htmlFor="email">Email:</label>
          <input className='modal_quote_input' type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}

          <label className='modal_quote_label3' >Mobile Number:</label>
          <input
            className='modal_quote_input'
            type="tel"
            id="phone"
            name="phone"
            pattern="[6-9][0-9]{9}"
            value={formData.phone}
            onChange={handleChange}
          />
          {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}

          <button className='modal_quote_button' type="submit">Submit</button>
        </form>
       
             </Modal>
             <button className='ss_button_submit' onClick={() => {
  if (isAnyItemSelected()) {
    setIsModalOpen(true);
    ReactGA.event({
      category: 'Button_Click_C_events',
      action: 'Get_Quote_C_events',
      label: 'Get_Quote_C_events',
    });
  } else {
    toast.error('Select at least one item to get a quote', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, 
    });
  }
}}>
  Get the Quote
</button>
          <ToastContainer />
        </div>
        
<Footer/>
    </div>
  )
}
export default SportsEvents;
