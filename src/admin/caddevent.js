import React, { useState, useEffect } from "react";
import './admin.css';
import axios from 'axios';
import {
  CHAIR_URL, DECORATION_URL, ADD_EVENT_ITEMS, VENDER_LIST, FOOD_ITEMS, MAKEUP_ITEMS, ENTERTAINMENT,
  VENUE, TRANSPORT, PHOTOGRAPHY, CORPORATE_GIFTS, BCAKE, CORPORATE_SHEILDS} from '../endpoints';
import './../components/services/services.css';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import * as yup from 'yup';

// const validationSchema = yup.object().shape({
//   eventtype: yup.string().required("Select Event Type"),

// });

const ITEMS_PER_PAGE = 5;
export default function AddEvent() {
  // const [errors, setErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedOption, setSelectedOption] = useState("Events");
  const [decorationData, setDecorationData] = useState([]);
  const [chairsData, setChairsData] = useState([]);
  const [food, setFood] = useState([]);
  const [makeup, setMakeup] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [venue, setVenue] = useState([]);
  const[cakes,setCakes] = useState([]);
  const [gifts, setGifts] = useState([]);
  
  
  const [transport, setTransport] = useState([]);
  const [photography, setPhotography] = useState([]);
  const [selectedChairs, setSelectedChairs] = useState([]);
  const [selectedDecoration, setSelectedDecoration] = useState(null);
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedMakeup, setSelectedMakeup] = useState([]);
  const [selectedEntertainment, setSelectedEntertainment] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [selectedTransport, setSelectedTransport] = useState([]);
  const [selectedPhotography, setSelectedPhotography] = useState([]);
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [selectedCake, setSelectedCake] = useState([]);
  const [displayRange, setDisplayRange] = useState({ start: 0, end: 4 });
  const [vendersData, setVendersData] = useState([]);
  const [visibility, setVisibility] = useState({
    chairs: false,
    decoration: false,
    food: false,
    makeup: false,
    gifts: false,
    entertainment: false,
    photography: false,
    venue: false,
    transport: false,
    cakes:false
  });
  
  const [addeventformData, setAddeventFormData] = useState({
    email: [],
    event_type: '',
    category: '',
    items: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingChairs, setLoadingChairs] = useState(false);
  const [loadingDecoration, setLoadingDecoration] = useState(false);
  const [loadingFood, setLoadingFood] = useState(false);
  const [loadingGifts, setLoadingGifts] = useState(false);
  const [loadingMakeup, setLoadingMakeup] = useState(false);
  const [loadingVenue, setLoadingvenue] = useState(false);
  const [loadingTransport, setLoadingTransport] = useState(false);
  const [loadingEntertainment, setLoadingEntertainment] = useState(false);
  const [loadingPhotography, setLoadingPhotography] = useState(false);
  const [loadingCakes, setLoadingCakes] = useState(false);
  const [sheilds, setSheilds] = useState([]);
  const [selectedSheilds, setSelectedSheilds] = useState([]);
  const [loadingSheilds, setLoadingSheilds] = useState(false);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = vendersData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(vendersData.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (visibility.chairs) {
      setLoadingChairs(true);
      axios.get(CHAIR_URL)
        .then(response => {
          setChairsData(response.data);
          setLoadingChairs(false);
        })
        .catch(error => {
          console.error('Error fetching chairs data:', error);
          setLoadingChairs(false);
        });
    }

    if (visibility.decoration) {
      setLoadingDecoration(true); 
    axios.get(DECORATION_URL)
      .then(response => {
        setDecorationData(response.data);
        setLoadingDecoration(false); 
      })
      .catch(error => {
        console.error('Error fetching decoration data:', error);
        setLoadingDecoration(false); // Set loading state to false in case of error
      });
    }
    if (visibility.food) {
      setLoadingFood(true); 
      axios.get(FOOD_ITEMS)
      .then(response => {
        setFood(response.data);
        setLoadingFood(false); 
      })
      .catch(error => {
        console.error('Error fetching decoration data:', error);
        setLoadingFood(false); // Set loading state to false in case of error
      });
    }
   
    if (visibility.makeup) {
      setLoadingMakeup(true); 
      axios.get(MAKEUP_ITEMS)
      .then(response => {
        setMakeup(response.data);
        setLoadingMakeup(false); 
      })
      .catch(error => {
        console.error('Error fetching decoration data:', error);
        setLoadingMakeup(false); // Set loading state to false in case of error
      });
    }
    
    if (visibility.venue) {
      setLoadingvenue(true); 
      axios.get(VENUE)
      .then(response => {
        setVenue(response.data);
        setLoadingvenue(false); 
      })
      .catch(error => {
        console.error('Error fetching decoration data:', error);
        setLoadingvenue(false); 
      });
    }
    if (visibility.sheilds) {
      setLoadingSheilds(true);  
    axios.get(CORPORATE_SHEILDS)
    .then(response => {
      setSheilds(response.data);
      setLoadingSheilds(false); 
    })
    .catch(error => {
      console.error('Error fetching chairs data:', error);
      setLoadingSheilds(false); 
    })
  }
    if (visibility.cakes) {
      setLoadingCakes(true); 
      axios.get(BCAKE)
      .then(response => {
        setCakes(response.data);
        setLoadingCakes(false); 
      })
      .catch(error => {
        console.error('Error fetching decoration data:', error);
        setLoadingCakes(false); 
      });
    }
    if (visibility.transport) {
      setLoadingTransport(true); 
      axios.get(TRANSPORT)
      .then(response => {
        setTransport(response.data);
        setLoadingTransport(false); 
      })
      .catch(error => {
        console.error('Error fetching decoration data:', error);
        setLoadingTransport(false); 
      });
    }
    if (visibility.photography) {
      setLoadingPhotography(true); 
      axios.get(PHOTOGRAPHY)
      .then(response => {
        setPhotography(response.data);
        setLoadingPhotography(false); 
      })
      .catch(error => {
        console.error('Error fetching decoration data:', error);
        setLoadingPhotography(false); 
      });
    }
    if (visibility.entertainment) {
      setLoadingEntertainment(true); 
      axios.get(ENTERTAINMENT)
      .then(response => {
        setEntertainment(response.data);
        setLoadingEntertainment(false); 
      })
      .catch(error => {
        console.error('Error fetching decoration data:', error);
        setLoadingEntertainment(false); 
      });
    }
 
    if (visibility.gifts) {
      setLoadingGifts(true);
      axios.get(CORPORATE_GIFTS)
      .then(response => {
        setGifts(response.data);
        setLoadingGifts(false);
      })
      .catch(error => {
        console.error('Error fetching chairs data:', error);
        setLoadingGifts(false);
      });
    }
    
    axios.get(VENDER_LIST)
      .then(response => {
        setVendersData(response.data.vendors);
        console.log(response.data.vendor)
      })
      .catch(error => {
        console.error('Error fetching vendors data:', error);
      });
  }, [visibility.chairs, visibility.decoration,visibility.sheilds, visibility.food, visibility.makeup, visibility.entertainment, visibility.venue, visibility.photography, visibility.transport,  visibility.gifts,visibility.cakes]);
  const eventButtons = {
    wedding_reception: ['Chairs', 'Decoration', 'Food', 'Makeup', 'Entertainment', 'Venue', 'Transport', 'Photography'],
    corporate_events: ['Chairs', 'Decoration', 'Food', 'Gifts', 'Sheilds', 'Entertainment', 'Photography', 'Venue'],
    mice_events: ['Chairs', 'Decoration', 'Food', 'Gifts', 'Sheilds', 'Entertainment', 'Photography', 'Venue'],
    movie_publicity: ['Chairs', 'Decoration', 'Food', 'Gifts', 'Sheilds', 'Entertainment', 'Photography', 'Venue'],
    birthday_parties: ['Chairs', 'Decoration', 'Food', 'Gifts','cakes', 'Entertainment', 'Photography', 'Venue'],
    sports_events: ['Chairs', 'Decoration', 'Food', 'Gifts', 'Sheilds', 'Entertainment', 'Photography', 'Venue'],
    media_planners: ['Chairs', 'Decoration', 'Food', 'Gifts', 'Sheilds', 'Entertainment', 'Photography', 'Venue'],
    celebrity_management: ['Chairs', 'Decoration', 'Food', 'Gifts', 'Sheilds', 'Entertainment', 'Photography', 'Venue'],
    occasional_events: ['Chairs', 'Decoration', 'Food', 'Gifts', 'Sheilds', 'Entertainment', 'Photography', 'Venue'],
    entertainment: ['Chairs', 'Decoration', 'Food', 'Gifts', 'Sheilds', 'Entertainment', 'Photography', 'Venue'],
    sfx_products: ['Chairs', 'Decoration', 'Food', 'Gifts', 'Sheilds', 'Entertainment', 'Photography', 'Venue'],
  };

  const handleEventTypeChange = (e) => {
    const newEventType = e.target.value;
    setAddeventFormData(prevFormData => ({
      ...prevFormData,
      event_type: newEventType,
    }));
    setSelectedEventType(newEventType);

    setVisibility({
      ...Object.fromEntries(Object.entries(visibility).map(([key]) => [key, false])),
      [newEventType.toLowerCase()]: true,
    });
  };

  const handleCategoryChange = (newCategory) => {
    setAddeventFormData((prevFormData) => ({
      ...prevFormData,
      category: newCategory,
    }));
    setSelectedCategory(newCategory);

    // Filter vendors based on the selected category

    setVisibility({
      ...Object.fromEntries(Object.entries(visibility).map(([key]) => [key, false])),
      [newCategory.toLowerCase()]: true,
    });
  };

  const handleEmailChange = (event) => {
    const selectedEmail = event.target.value;
    const isChecked = event.target.checked;

    // Update the selected emails in addeventformData
    setAddeventFormData((prevFormData) => {
      const updatedEmails = isChecked
        ? [...prevFormData.email, selectedEmail]
        : prevFormData.email.filter((email) => email !== selectedEmail);

      return {
        ...prevFormData,
        email: updatedEmails,
      };
    });
  }

  const handleNextClick = () => {
    setDisplayRange(prevRange => ({ start: prevRange.start + 1, end: prevRange.end + 1 }));
  };

  const handlePrevClick = () => {
    setDisplayRange(prevRange => ({ start: prevRange.start - 1, end: prevRange.end - 1 }));
  };

  const handleItemsChange = (item, quantity) => {
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

  const handleDecorationSelection = (item) => {
    if (selectedDecoration && selectedDecoration.item_id === item.item_id) {
      setSelectedDecoration(null);
    } else {
      setSelectedDecoration({ ...item, quantity: 1 });
    }
  };
  const handleMakeupselection = (item) => {

    if (!Array.isArray(selectedMakeup)) {
      setSelectedMakeup([]);
      return;
    }
    const selectedItemIndex = selectedMakeup.findIndex((makeupItem) => makeupItem.item_id === item.item_id);

    if (selectedItemIndex !== -1) {
      const updatedSelection = [...selectedMakeup];
      updatedSelection.splice(selectedItemIndex, 1);
      setSelectedMakeup(updatedSelection);
    } else {
      setSelectedMakeup([...selectedMakeup, { ...item, quantity: 1 }]);
    }
  };
  const handleSheildsselection = (item) => {

    if (!Array.isArray(selectedSheilds)) {
      setSelectedSheilds([]);
      return;
    }
    const selectedItemIndex = selectedSheilds.findIndex((sheildsItem) => sheildsItem.item_id === item.item_id);

    if (selectedItemIndex !== -1) {
      const updatedSelection = [...selectedSheilds];
      updatedSelection.splice(selectedItemIndex, 1);
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
    const selectedIndex = selectedEntertainment.findIndex((entertainment) => entertainment.item_id === item.item_id);
    if (selectedIndex !== -1) {
      const updatedSelection = [...selectedEntertainment];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedEntertainment(updatedSelection);
    } else {
      setSelectedEntertainment([...selectedEntertainment, { ...item, quantity: 0 }]);
    }
  };

  const handleVenueSelection = (item) => {
    if (selectedVenue && selectedVenue.item_id === item.item_id) {
      setSelectedVenue(null);
    } else {
      setSelectedVenue({ ...item, quantity: 1 });
    }
  };

  const handleTransportselection = (item) => {
    if (!Array.isArray(selectedTransport)) {
      setSelectedTransport([]);
      return;
    }
    const selectedItemIndex = selectedTransport.findIndex((transportItem) => transportItem.item_id === item.item_id);

    if (selectedItemIndex !== -1) {
      const updatedSelection = [...selectedTransport];
      updatedSelection.splice(selectedItemIndex, 1);
      setSelectedTransport(updatedSelection);
    } else {
      setSelectedTransport([...selectedTransport, { ...item, quantity: 1 }]);
    }
  };
  const handleFoodselection = (item) => {

    if (!Array.isArray(selectedFood)) {

      setSelectedFood([]);
      return;
    }
    const selectedItemIndex = selectedFood.findIndex((foodItem) => foodItem.item_id === item.item_id);

    if (selectedItemIndex !== -1) {
      const updatedSelection = [...selectedFood];
      updatedSelection.splice(selectedItemIndex, 1);
      setSelectedFood(updatedSelection);
    } else {
      setSelectedFood([...selectedFood, { ...item, quantity: 1 }]);
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
  const handleCakeselection = (item) => {
    if (!Array.isArray(selectedCake)) {
      setSelectedCake([]);
      return;
    }
    const selectedIndex = selectedCake.findIndex((cakeItem) => cakeItem.item_id === item.item_id);
    if (selectedIndex !== -1) {
      const updatedSelection = [...selectedCake];
      updatedSelection.splice(selectedIndex, 1);
      setSelectedCake(updatedSelection);
    } else {
      setSelectedCake([...selectedCake, { ...item, quantity: 1 }]);
    }
  };
  

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    
    // validationSchema.validate(addeventformData, { abortEarly: false })
    const { email } = addeventformData;

    // Get selected items (chairs and decoration)
    const selectedItems = [
      ...selectedChairs.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...(selectedDecoration ? [{ code: selectedDecoration.code, quantity: selectedDecoration.quantity || 1 }] : []),
      ...selectedFood.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...selectedMakeup.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...selectedEntertainment.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...(selectedVenue ? [{ code: selectedVenue.code, quantity: selectedVenue.quantity || 1 }] : []),
      ...selectedTransport.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...selectedPhotography.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...selectedGifts.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...selectedCake.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
      ...selectedSheilds.map(item => ({ code: item.code, quantity: item.quantity || 1 }))
    ];

    if (selectedItems.length > 0 && email.length > 0) {
      toast.info('Your quote is being prepared, please be patient', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        className: 'custom-toast-info',
      });

      // Send data to the backend
      const selectedEventId = sessionStorage.getItem("selectedEventId");
      
      axios.post(ADD_EVENT_ITEMS + selectedEventId, { category: selectedEventType, items: selectedItems, emails: email })
        .then(response => {
          if (response.status === 200) {
            sessionStorage.setItem("email", email);
            console.log('Form submitted:', addeventformData);
            navigate("/admin");
            // Get selected vendors

          }
        })
        .catch(error => {
          console.error('Error adding event:', error);
        });
    }
  };

  const toggleVisibility = (property) => {
    setVisibility((prevVisibility) => ({
      ...Object.fromEntries(Object.entries(prevVisibility).map(([key]) => [key, false])),
      [property]: true,
    }));
  };
  
  return (

    <div className="event-modal">
      {/* <NavigationBar handleOptionClick={handleOptionClick} />  */}
      <h2 style={{ marginTop: '6%' }}>Add Contract of Event</h2>
      <Link to="/admin" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'green' }} />
      </Link>

      <label className='admin_label_1' htmlFor="category">Type of Your Event*</label>
      <select className='admin_input_1' style={{ width: '330px' }} value={selectedEventType} onChange={handleEventTypeChange} id="eventtype" name="eventtype" required>
        <option value="" disabled selected>Select Event Type</option>
        <option value="wedding_reception">Wedding&Reception</option>
        <option value="corporate_events">Corporate Events</option>
        <option value="mice_events">Mice Events</option>
        <option value="movie_publicity">Movie Publicity & Promotions</option>
        <option value="birthday_parties">Birthday Parties</option>
        <option value="sports_events">Sports Events</option>
        <option value="media_planners">Media Planners</option>
        <option value="celebrity_management">Celebrity Management</option>
        <option value="occasional_events">OCCASIONAL EVENTS</option>
        <option value="entertainment">Entertainment</option>
        <option value="sfx_products">SFX Products</option>
      </select>
      
      <div className="admin-toggle-button">
        {selectedEventType && (
          <div className="admin-toggle-button1" style={{ display: 'flex', flexDirection: 'row', marginLeft: '15%' }}>
            {eventButtons[selectedEventType].map((buttonLabel) => (
              <button key={buttonLabel} onClick={() => { handleCategoryChange(buttonLabel.toLowerCase()); toggleVisibility(buttonLabel.toLowerCase()) }}>
                {buttonLabel}
              </button>
            ))}
          </div>
        )}
      </div>
      {loadingChairs && <div>Loading Items...</div>}
      {!loadingChairs && visibility.chairs && chairsData && chairsData.length > 0 && (
        <div className="chairs-component-container">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%' }}>
            {chairsData.slice(displayRange.start, displayRange.end).map(item => (
              <li key={item.item_id} className="item1" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', flex: '0 0 calc(33.33% - 20px)' }}>
                <div>
                  {item.item_name}
                </div>
                {item.item_image && (
                  <img
                    src={`data:image/jpeg;base64,${item.item_image}`}
                    alt={item.item_name}
                    className="item-image1"
                    width="100" height="100"
                  />
                )}
                <div className="quantity-input-container">
                  <input
                    type="checkbox"
                    checked={selectedChairs.some(chair => chair.item_id === item.item_id)}
                    onChange={(e) => handleItemsChange(item, e.target.checked ? 0 : 0)}
                  />
                  <input
                    type="number"
                    min="0"
                    style={{ paddingRight: '20px', width: '60%' }}
                    placeholder='Enter quantity'
                    value={selectedChairs.find(chair => chair.item_id === item.item_id)?.quantity || ''}
                    onChange={(e) => handleItemsChange(item, parseInt(e.target.value, 10))}
                    disabled={!selectedChairs.some(chair => chair.item_id === item.item_id)}
                  />
                </div>

              </li>
            ))}
            <div >
              <button className='pre-button' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= chairsData.length}> &gt;</button>
            </div>
          </ul>
        </div>
      )}
      {loadingDecoration && <div>Loading Items...</div>}
      {!loadingDecoration && visibility.decoration && decorationData && decorationData.length > 0 && (
        <div className="chairs-component-container2">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%' }}>
            {decorationData.slice(displayRange.start, displayRange.end).map(item => (
              <li key={item.item_id} className="item" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', flex: '0 0 calc(33.33% - 20px)' }}>
              <div>
               <input
                  type="checkbox"
                  // style={{ width: '15px', height: '15px' }}
                  checked={selectedDecoration?.item_id === item.item_id}
                  onChange={() => handleDecorationSelection(item)}
                  />
                  </div>
                <div>
                  {item.item_name}
                </div>
                {item.item_image && (
                  <img
                    src={`data:image/jpeg;base64,${item.item_image}`}
                    alt={item.item_name}
                    className="item-image"
                  />
                )}
              </li>
            ))}
            <div >
              <button className='pre-button1' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= decorationData.length}> &gt;</button>
            </div>
          </ul>
        </div>
      )}
       {loadingMakeup && <div>Loading Items...</div>}
      {!loadingMakeup && visibility.makeup && (<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%' }}>
          {makeup.slice(displayRange.start, displayRange.end).map(item => (
            <li key={item.item_id} className="item" style={{ display: 'inline-block', margin: '10px', padding: '10px', border: '1px solid #ccc' }} >
               <input
                type="checkbox"
                checked={selectedMakeup.some((makeup) => makeup.item_id === item.item_id)}
                onChange={() => handleMakeupselection(item)}
              />
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
            </li>
            ))}
             <div >
              <button className='pre-button1' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= food.length}> &gt;</button>
            </div>
        </ul>
        
        )}
        
       {loadingEntertainment && <div>Loading Items...</div>}
      {!loadingEntertainment && visibility.entertainment && (<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%' }}>
          {entertainment.slice(displayRange.start, displayRange.end).map(item => (
            <li key={item.item_id} className="item" style={{ display: 'inline-block', margin: '10px', padding: '10px', border: '1px solid #ccc' }} >
              <input
                type="checkbox"
                checked={selectedEntertainment.some((entertainment) => entertainment.item_id === item.item_id)}
                onChange={() => handleEntertainmentselection(item)}
              />
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
              
            </li>
            ))}
             <div >
              <button className='pre-button4' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= entertainment.length}> &gt;</button>
            </div>
        </ul>)}
      {loadingVenue && <div>Loading Items...</div>}
      {!loadingVenue && visibility.venue && venue && venue.length > 0 && (
        <div className="chairs-component-container2">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%' }}>
            {venue.slice(displayRange.start, displayRange.end).map(item => (
              <li key={item.item_id} className="item" style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', flex: '0 0 calc(33.33% - 20px)' }}>
                <input
                  type="checkbox"
                  checked={selectedVenue?.item_id === item.item_id}
                  onChange={() => handleVenueSelection(item)}

                />
                <div>
                  {item.item_name}
                </div>
                {item.item_image && (
                  <img
                    src={`data:image/jpeg;base64,${item.item_image}`}
                    alt={item.item_name}
                    className="item-image"
                  />
                )}
                
              </li>
            ))}
            <div >
              <button className='pre-button3' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= venue.length}> &gt;</button>
            </div>
          </ul>
        </div>
      )}
      {loadingTransport && <div>Loading Items...</div>}
      {!loadingTransport && visibility.transport && (<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%' }}>
          {transport.slice(displayRange.start, displayRange.end).map(item => (
            <li key={item.item_id} className="item" style={{ display: 'inline-block', margin: '10px', padding: '10px', border: '1px solid #ccc' }} >
               <input
                type="checkbox"
                checked={selectedTransport.some((transport) => transport.item_id === item.item_id)}
                onChange={() => handleTransportselection(item)}
              />
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
             
            </li>
            ))}
             <div >
              <button className='pre-button2' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= transport.length}> &gt;</button>
            </div>
        </ul>)}
      {loadingFood && <div>Loading Items...</div>}
      {!loadingFood && visibility.food && (
         <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%' }}>
         {food.slice(displayRange.start, displayRange.end).map(item => (
           <li key={item.item_id} className="item" style={{ display: 'inline-block', margin: '10px', padding: '10px', border: '1px solid #ccc' }} >
             <input
               type="checkbox"
               checked={selectedFood.some((food) => food.item_id === item.item_id)}
               onChange={() => handleFoodselection(item)}
             />
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
             
           </li>
           ))}
            <div >
              <button className='pre-button2' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= food.length}> &gt;</button>
            </div>
       </ul>
       )}
        {loadingPhotography && <div>Loading Items...</div>}
      {!loadingPhotography && visibility.photography && (<ul style={{listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%' }}>
         {photography.slice(displayRange.start, displayRange.end).map(item => (
           <li key={item.item_id} className="item" style={{ display: 'inline-block', margin: '10px', padding: '10px', border: '1px solid #ccc' }} >
              <input
               type="checkbox"
               checked={selectedPhotography.some((photography) => photography.item_id === item.item_id)}
               onChange={() => handlePhotographyselection(item)}
             />
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
            
           </li>
           ))}
            <div >
              <button className='pre-button2' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= photography.length}> &gt;</button>
            </div>
       </ul>)}
       {loadingCakes && <div>Loading Items...</div>}
       {!loadingCakes && visibility.cakes && ( <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%'  }}>
          {cakes.slice(displayRange.start, displayRange.end).map(item => (
            <li key={item.item_id} className="item" style={{ display: 'inline-block', margin: '10px', padding: '10px', border: '1px solid #ccc' }} >
                 <input
                type="checkbox"
                checked={selectedCake.some((cakes) => cakes.item_id === item.item_id)}
                onChange={() => handleCakeselection(item)}
              />
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
              </li>
          ))}
          <div >
              <button className='pre-button4' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= cakes.length}> &gt;</button>
            </div>
              </ul>
       )}
           {loadingSheilds && <div>Loading Items...</div>}
       {!loadingSheilds && visibility.sheilds && ( <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%'  }}>
          {sheilds.slice(displayRange.start, displayRange.end).map(item => (
            <li key={item.item_id} className="item" style={{ display: 'inline-block', margin: '10px', padding: '10px', border: '1px solid #ccc' }} >
               <input
                type="checkbox"
                checked={selectedSheilds.some((sheilds) => sheilds.item_id === item.item_id)}
                onChange={() => handleSheildsselection(item)}
              />
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
              
              </li>
          ))}
          <div >
              <button className='pre-button2' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= sheilds.length}> &gt;</button>
            </div>
              </ul>
       )}
      {loadingGifts && <div>Loading Items...</div>}
      {!loadingGifts && visibility.gifts && ( <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '50px', marginTop: '1%'  }}>
          {gifts.slice(displayRange.start, displayRange.end).map(item => (
            <li key={item.item_id} className="item" style={{ display: 'inline-block', margin: '10px', padding: '10px', border: '1px solid #ccc' }} >
              <input
                type="checkbox"
                checked={selectedGifts.some((gifts) => gifts.item_id === item.item_id)}
                onChange={() => handleGiftsselection(item)}
              />
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
              
            </li>
            ))}
             <div >
              <button className='pre-button2' onClick={handlePrevClick} disabled={displayRange.start === 0}>&lt; </button>
            </div>
            <div>
              <button className='next-button' onClick={handleNextClick} disabled={displayRange.end >= gifts.length}> &gt;</button>
            </div>

        </ul>
        )}
      
      {selectedCategory && (
        <div className="event-input-box2">
          <label className="vendor-label">Select Vendors:</label>
          {currentItems.map((vendor) => (
            <div key={vendor.id} className="vendor-checkbox">
              <input
                type="checkbox"
                id={`vendor_${vendor.id}`}
                value={vendor.email}
                checked={addeventformData.email.includes(vendor.email)}
                onChange={handleEmailChange}
                className="vendor-checkbox3"
              />
              <></>
              <label className="vendor-checkbox2" htmlFor={`vendor_${vendor.id}`}>
                {vendor.email} - [ {vendor.category} ]
              </label>
            </div>
          ))}
          {/* Pagination */}
          <div className="e-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
            ))}
          </div>
        </div>
      )}

      <div className="add-event-button2">
        <Link to="/admin" className="add-event-button3"
          style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', textDecoration: 'none', borderRadius: '5px' }}
          onClick={handleAddEventSubmit}>Send To Vender</Link>
      </div>
    </div>
  )

}

