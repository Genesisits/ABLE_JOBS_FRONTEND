import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './services.css';
import { CHAIR_URL, DECORATION_URL, CALCULATE_PRICE_URL,NON_VEG_ITEMS , VEG_ITEMS,FOOD_ITEMS,MAKEUP_ITEMS,ENTERTAINMENT,VENUE,TRANSPORT,PHOTOGRAPHY} from '../../endpoints';
import ser_img from '../../images/s1.jpg';
import Services from './services';
import banner from '../../images/banner_nv4.png';
import bgImage from '../../images/bg_pattern_1.png';
import Footer from '../footer/footer';
import Modal from 'react-modal';
import  ReactGA  from 'react-ga4';
import * as yup from 'yup';
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


const Wedding = () => {
  const navigate = useNavigate();
  const createToggleVisibilityFunction = (setState, stateToReset) => () => {
    setState((prevState) => !prevState);
    stateToReset.forEach((state) => state(false));
  };
  const [isLoading, setIsLoading] = useState(true);
    const [chairsData, setChairsData] = useState([]);
    const [decorationData, setDecorationData] = useState([]);
    const [nonveg,setNonveg] = useState([]);
    const [veg,setVeg] = useState([]);
    const [food,setFood] = useState([]);
    const [makeup,setMakeup] = useState([]);
    const [entertainment,setEntertainment] = useState([]);
    const [venue,setVenue] = useState([]);
    const [transport,setTransport] = useState([]);
    const [photography,setPhotography] = useState([]);
    const [selectedChairs, setSelectedChairs] = useState([]);
    const [selectedDecoration, setSelectedDecoration] = useState(null);
    const [selectedNonveg, setSelectedNonveg] = useState([]);
    const [selectedVeg,setSelectedVeg] = useState([]);
    const [selectedFood,setSelectedFood] = useState([]);
    const [selectedMakeup,setSelectedMakeup] = useState([]);
    const [selectedEntertainment,setSelectedEntertainment] = useState([]);
    const [selectedVenue,setSelectedVenue] = useState([]);
    const [selectedTransport,setSelectedTransport] = useState([]);
    const [selectedPhotography,setSelectedPhotography] = useState([]);
    const [showChairs, setShowChairs] = useState(false);
    const [showDecoration, setShowDecoration] = useState(false);
    const [showNonveg, setShowNonveg] = useState(false);
    const [showMakeup, setShowMakeup] = useState(false);
    const [showEntertainment, setShowEntertainment] = useState(false);
    const [showVenue, setShowVenue] = useState(false);
    const [showTransport, setShowTransport] = useState(false);
    const [showPhotography, setShowPhotography] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
    });
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFoodCategory, setSelectedFoodCategory] = useState(null);
    const [formErrors, setFormErrors] = useState({
      name: '',
      email: '',
      phone: '',
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      })
      .catch((error) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
      });
  };
    const handleFoodSelection = (category) => {
      setSelectedFoodCategory(category);
    };
    
   
    useEffect(() => {
      setIsLoading(true);
      axios.get(CHAIR_URL)
      .then(response => {
        setChairsData(response.data);
        setIsLoading(false); 
      })
        .catch(error => {
          console.error('Error fetching chairs data:', error);
          setIsLoading(false); 
        });
        setIsLoading(true);
      axios.get(DECORATION_URL)
         .then(response => {
          setDecorationData(response.data);
          setIsLoading(false); 
        })
          .catch(error => {
            console.error('Error fetching chairs data:', error);
            setIsLoading(false); 
          });
        setIsLoading(true);
      axios.get(NON_VEG_ITEMS)
      .then(response => {
        setNonveg(response.data);
        setIsLoading(false); 
      })
        .catch(error => {
          console.error('Error fetching chairs data:', error);
          setIsLoading(false); 
        });
        setIsLoading(true);
        axios.get(VEG_ITEMS)
        .then(response => {
          setVeg(response.data);
          setIsLoading(false); 
        })
          .catch(error => {
            console.error('Error fetching chairs data:', error);
            setIsLoading(false); 
          });
        setIsLoading(true);
        axios.get(FOOD_ITEMS)
        .then(response => {
          setFood(response.data);
          setIsLoading(false); 
        })
          .catch(error => {
            console.error('Error fetching chairs data:', error);
            setIsLoading(false); 
          });
        setIsLoading(true);
        axios.get(MAKEUP_ITEMS)
        .then(response => {
          setMakeup(response.data);
          setIsLoading(false); 
        })
          .catch(error => {
            console.error('Error fetching chairs data:', error);
            setIsLoading(false); 
          });
        setIsLoading(true);
        axios.get(VENUE)
        .then(response => {
          setVenue(response.data);
          setIsLoading(false); 
        })
          .catch(error => {
            console.error('Error fetching chairs data:', error);
            setIsLoading(false); 
          });
        setIsLoading(true);
        axios.get(TRANSPORT)
        .then(response => {
          setTransport(response.data);
          setIsLoading(false); 
        })
          .catch(error => {
            console.error('Error fetching chairs data:', error);
            setIsLoading(false); 
          });
        setIsLoading(true);
        axios.get(PHOTOGRAPHY)
        .then(response => {
          setPhotography(response.data);
          setIsLoading(false); 
        })
          .catch(error => {
            console.error('Error fetching chairs data:', error);
            setIsLoading(false); 
          });
        setIsLoading(true);
        axios.get(ENTERTAINMENT)
        .then(response => {
          setEntertainment(response.data);
          setIsLoading(false); 
        })
          .catch(error => {
            console.error('Error fetching chairs data:', error);
            setIsLoading(false); 
          });
        ReactGA.initialize('G-3Z5SJGDL7N'); 
    }, []);
  
   const toggleChairsVisibility = createToggleVisibilityFunction(
    setShowChairs,
    [setShowDecoration, setShowNonveg, setShowMakeup, setShowEntertainment, setShowVenue, setShowTransport, setShowPhotography]
  );

  const toggleDecorationVisibility = createToggleVisibilityFunction(
    setShowDecoration,
    [setShowChairs, setShowNonveg, setShowMakeup, setShowEntertainment, setShowVenue, setShowTransport]
  );

  const toggleNonvegVisibility = createToggleVisibilityFunction(
    setShowNonveg,
    [setShowChairs, setShowDecoration, setShowMakeup, setShowEntertainment, setShowVenue, setShowTransport, setShowPhotography]
  );
  
  const toggleMakeupVisibility = createToggleVisibilityFunction(
    setShowMakeup,
    [setShowChairs, setShowDecoration, setShowNonveg, setShowEntertainment, setShowVenue, setShowTransport, setShowPhotography]
  );

  const toggleEntertainmentVisibility = createToggleVisibilityFunction(
    setShowEntertainment,
    [setShowChairs, setShowDecoration, setShowNonveg, setShowMakeup, setShowVenue, setShowTransport, setShowPhotography]
  );

  const toggleVenueVisibility = createToggleVisibilityFunction(
    setShowVenue,
    [setShowChairs, setShowDecoration, setShowNonveg, setShowMakeup, setShowEntertainment, setShowTransport, setShowPhotography]
  );

  const toggleTransportVisibility = createToggleVisibilityFunction(
    setShowTransport,
    [setShowChairs, setShowDecoration, setShowNonveg, setShowMakeup, setShowVenue, setShowEntertainment, setShowPhotography]
  );

  const togglePhotographyVisibility = createToggleVisibilityFunction(
    setShowPhotography,
    [setShowChairs, setShowDecoration, setShowNonveg, setShowMakeup, setShowVenue, setShowEntertainment, setShowTransport]
  );

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
 
    const handleDecorationSelection = (item) => {
      if (selectedDecoration && selectedDecoration.item_id === item.item_id) {
        setSelectedDecoration(null);
      } else {
        setSelectedDecoration({ ...item, quantity: 1 });
      }
    };

    const handleNonvegselection = (item) => {
     
      if (!Array.isArray(selectedNonveg)) {
        
        setSelectedNonveg([]);
        return;
      }
      const selectedItemIndex = selectedNonveg.findIndex((nonvegItem) => nonvegItem.item_id === item.item_id);

      if (selectedItemIndex !== -1) {
        const updatedSelection = [...selectedNonveg];
        updatedSelection.splice(selectedItemIndex, 1);
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
      const selectedItemIndex = selectedVeg.findIndex((vegItem) => vegItem.item_id === item.item_id);

      if (selectedItemIndex !== -1) {
        const updatedSelection = [...selectedVeg];
        updatedSelection.splice(selectedItemIndex, 1);
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
      const selectedItemIndex = selectedFood.findIndex((foodItem) => foodItem.item_id === item.item_id);

      if (selectedItemIndex !== -1) {
        const updatedSelection = [...selectedFood];
        updatedSelection.splice(selectedItemIndex, 1);
        setSelectedFood(updatedSelection);
      } else {
        setSelectedFood([...selectedFood, { ...item, quantity: 1 }]);
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
    
     const isAnyItemSelected = () => {
      const selectedArrays = [
        selectedChairs,
        [selectedDecoration],
        selectedNonveg,
        selectedVeg,
        selectedFood,
        selectedMakeup,
        selectedEntertainment,
        [selectedVenue],
        selectedTransport,
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
    
        ReactGA.event({
          category: 'Wedding_Button_Click',
          action: 'Calculate_Price_Wedding',
          label: 'Calculate_Price_Wedding',
        });
    
        const { email } = formData;
        const selectedItems = [
          ...selectedChairs.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
          ...(selectedDecoration ? [{ code: selectedDecoration.code, quantity: selectedDecoration.quantity || 1 }] : []),
          ...selectedNonveg.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
          ...selectedVeg.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
          ...selectedFood.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
          ...selectedMakeup.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
          ...selectedEntertainment.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
          ...(selectedVenue ? [{ code: selectedVenue.code, quantity: selectedVenue.quantity || 1 }] : []),
          ...selectedTransport.map(item => ({ code: item.code, quantity: item.quantity || 1 })),
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
            setIsModalOpen(false); 
            sessionStorage.setItem("email", email);
            console.log('Form submitted:', formData);
    
            toast.success(`Please Check Your ${email} for the quote`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 10000,
            });
    
            // Redirect to wedding page after successful submission
            navigate('/wedding');
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
      <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', margin: '2px',marginLeft:'5%' }}>
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
              style={{ paddingRight: '10px', width: '60%' }}
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
        <h3> Wedding & Receptions</h3>
        <img src={banner} className='serv_inner_banner_wgm' alt=''  style={{ backgroundImage: `url(${bgImage})` }}/>
        </div>
        
           <div className='inner_Wedding_banner'>
      <div className='src-container'>
        <div className='src-row'>
          <div className='src-col-9 src-col-12'>
        <div className='inner_wedding_left'>
        <img src={ser_img} className="ser_img" alt="ser_img" />
        {/* <div className='services_text1'> */}
          <h3>
            <span className='ser_span'> Wedding &amp; Receptions </span>
          </h3>
          <p>Weddings mark the start of a new chapter in a couple's life and celebrate their love and commitment to each other.</p>
          <p>A Wedding is a marriage ceremony where legally or formally recognized union of two people as partners in a personal relationship. Wedding conventions and traditions shift incredibly between societies, ethnic gatherings, religions, nations, and social classes. Most wedding functions include a trade of marriage promises by the couple, introduction of a blessing offering, ring representative thing, blossoms, cash, and an open announcement of marriage by a specialist figure.</p>
          <p>Extraordinary wedding articles of clothing are frequently worn, and the function is at times taken after by a wedding gathering. Music, petitions, readings or religious writings are likewise regularly consolidated into the service. We as a Wedding Planners make your dream come true by providing the best wedding event services with our highly professional Wedding Planners Hyderabad.</p>
         
          <p>We provide all these services under one roof, a one-stop destination for wedding events can offer convenience, flexibility, and peace of mind to the couple, allowing them to enjoy their special day without any hassle or stress.We completely give you a Perfect Wedding. Vajraksh Events will take the Stress you just sit and enjoy the Perfect wedding.</p>
        </div>
        {/* </div> */}
          </div>
          <div className='ser-col-3 ser-col-sm-12'>
          <Services/>
          </div>
        </div>
      </div>
      </div>
       
        <div className="ModalContainer">
          <div className="section">
  
            <div className="toggle-button1">
              <button onClick={toggleChairsVisibility}>Chairs</button>
              <button onClick={toggleDecorationVisibility}>Decoration</button>
              <button onClick={toggleNonvegVisibility}>Food</button>
              <button onClick={toggleMakeupVisibility}>Makeup</button>
              <button onClick={toggleEntertainmentVisibility}>Entertainment</button>
              <button onClick={toggleVenueVisibility}>Venue</button>
              <button onClick={toggleTransportVisibility}>Transport</button>
              <button onClick={togglePhotographyVisibility}>Photography</button>
            </div>
            {isLoading ? (
  <p>Data loading...</p>
) : (
            <div>
            {showChairs && (
        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap',margin:'2px' ,alignItems:'center',marginLeft:'2.5%'}}>
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
                  type="checkbox"
                  checked={selectedChairs.some(chair => chair.item_id === item.item_id)}
                  onChange={(e) => handleChairSelection(item, e.target.checked ? 0 : 0)}
                />
                <input
                  type="number"
                  min="0"
                  style={{ paddingRight: '20px', width: '60%' }}
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
    <h3 style={{ color: '#881008' }}>Food category</h3>
      <RadioButtons
        options={[
          { label: 'Nonveg', value: 'nonveg' },
          { label: 'Veg', value: 'veg' },
          { label: 'Both', value: 'both' },
        ]}
        selectedValue={selectedFoodCategory}
        onChange={(value) => handleFoodSelection(value)}
      />
    <ul style={{ listStyle: 'none' ,textAlign: 'center',margin:'10px', padding: '20px' }}>
      {selectedFoodCategory === 'nonveg' && renderItems(nonveg, selectedNonveg, handleNonvegselection)}
      {selectedFoodCategory === 'veg' && renderItems(veg, selectedVeg, handleVegselection)}
      {selectedFoodCategory === 'both' && renderItems(food, selectedFood, handleFoodselection)}
    </ul>
    {/* ... */}
  </div>
)}

{showMakeup && renderItems(makeup, selectedMakeup, handleMakeupselection)}

{showEntertainment && renderItems(entertainment, selectedEntertainment, handleEntertainmentselection)}

{showVenue && renderItems(venue, [selectedVenue], handleVenueSelection)}

{showTransport && renderItems(transport, selectedTransport, handleTransportselection)}

{showPhotography && renderItems(photography, selectedPhotography, handlePhotographyselection)}
   </div>
)}
<Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Quote Modal"
        className="Model"
        onSubmit={handleCalculatePrice}
        style={{
          overlay: {
            zIndex: 1000,
          },
          content: {
            overflow: 'auto',
          },
        }}
      >
        <h3 style={{ textAlign: 'center',color:'white' }}>Please Enter Your Details</h3>
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
             <button className='get_the_quote_button'
             onClick={() => {
  if (isAnyItemSelected()) {
    setIsModalOpen(true);
    ReactGA.event({
      category: 'Wedding_Button_Click',
      action: 'Get_Quote_Wedding',
      label: 'Get_Quote_Wedding',
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

</div>   
          <ToastContainer />
        </div>
        <Footer/>
      </div>
    );
  };
  
  export default Wedding;
  