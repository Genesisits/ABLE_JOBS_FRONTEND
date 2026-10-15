import React, { useState, useEffect, useRef } from "react";
import { EVENTS_LIST, EVENT_MESSAGE, EVENT_CHAT_HISTORY ,DEACTVATE_EVENT} from '../endpoints';
import axios from 'axios';
import Pagination from "react-js-pagination";
import './eventlist.css';
import { Link } from "react-router-dom";
import { FaEye } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaPlus } from 'react-icons/fa'; 
import { FaSave } from 'react-icons/fa'; 

const EventList = () => {
  const [eventListData, setEventListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [eventid, setEventid] = useState('');
  const [history, setHistory] = useState({});
  const [deactivate,setDeactivate] =useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const containerRef = useRef(null);
 
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredEvent1, setHoveredEvent1] = useState(null);
  const [hoveredEvent2, setHoveredEvent2] = useState(null); 


  useEffect(() => {
    axios.get(EVENTS_LIST)
      .then(response => {
        setEventListData(response.data.events);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching events data:', error));
    axios.get(EVENT_CHAT_HISTORY)
      .then(response => {
        const formattedHistory = {};
        response.data.forEach(chat => {
          if (!formattedHistory[chat.event_id]) {
            formattedHistory[chat.event_id] = [];
          }
          formattedHistory[chat.event_id].push({
            message: chat.message,
            timestamp: chat.timestamp
          });
        });
        setHistory(formattedHistory);
      })
      .catch(error => console.error('Error fetching chat history:', error));
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);
 

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const formatTimestamp = (timestamp) => {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const date = ('0' + dateObj.getDate()).slice(-2);
    const hours = ('0' + dateObj.getHours()).slice(-2);
    const minutes = ('0' + dateObj.getMinutes()).slice(-2);

    return `${date}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleMessageChange = (e, eventId) => {
    setMessage(e.target.value);
    setEventid(eventId);
  };
  const handleDeactivateEevnt = (eventId) => {
    setDeactivate(eventId); 
  };
  const handleDeactivated = (eventId) => {
    axios.post(DEACTVATE_EVENT, { event_id: eventId })
      .then(response => {
        
        console.log('Message sent successfully:', response);
      })
      .catch(error => console.error('Error sending message:', error));
  };
  const handleSendMessage = (eventId, message) => {
    if (!message.trim()) {
      console.error('Error: Message cannot be empty');
      return; 
    }
    axios.post(EVENT_MESSAGE, {
      event_id: eventId,
      message: message
    })
      .then(response => {
        
        console.log('Message sent successfully:', response);
        console.log(eventId);
      })
      .catch(error => console.error('Error sending message:', error));
  };

  
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = eventListData.slice(indexOfFirstItem, indexOfLastItem);
 
const handleAddButtonClick = (eventId) => {
  
  sessionStorage.setItem("selectedEventId", eventId);
  sessionStorage.setItem("ItemEventId", eventId);
  console.log("ItemEventId:", eventId)
  
};
const handleAddButtonsClick = (eventId) => {
  
  sessionStorage.setItem("ItemEventId", eventId);
  console.log("ItemEventId:", eventId)
 
};

  return (
    <div className="event-list-container">
      <h2 style={{marginTop:'0%'}}>Events List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : Array.isArray(eventListData) && eventListData.length > 0 ? (
        <div>
          <table className="event-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th className="e-date">Event Name</th>
                <th>Event ID</th>
                <th>Event Type</th>
                <th>Date</th>
                <th>Location</th>
                <th>Remarks</th>
                <th style={{width:'0%'}}>Event Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((event, index) => (
                <tr key={event.id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td className="e-date">{event.name}</td>
                  <td>{event.code}</td>
                  <td>{event.event_type}</td>
                  <td className="e-date">
                  {new Date(event.date).toLocaleDateString('en-GB')}</td>
                  <td>{event.location}</td>
                  <td>
                    <div ref={containerRef} style={{ width: '100%', minHeight: '50px', maxHeight: '10px', resize: 'vertical',overflow: 'auto', border: '1px solid #ccc' }}>
                    <div style={{ overflowY: 'auto', paddingRight: '17px' }}>
                      {history[event.code] && history[event.code].map((messageObj, index) => (
                        <div>
                        
                  <p className="timestamp" style={{ fontSize: '12px', marginBottom: '-2%' }}>{formatTimestamp(messageObj.timestamp).split(' ')[0]}</p>
            
                 <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <p className="message-remarks" style={{ marginBottom: '10px' }}>{messageObj.message}</p>
                <p className="timestamp" style={{ fontSize: '12px', marginBottom: '5px',marginLeft:'15px' }}>{formatTimestamp(messageObj.timestamp).split(' ')[1]}</p>
                        </div>
                        </div>
                      ))}
                      </div>
                     <div style={{ display: 'flex', alignItems: 'center' }}>
  <textarea
    style={{ width: '80%', height: '20px',marginLeft:'5%', marginTop:'2%',resize: 'vertical', overflow: 'auto', border: 'none', padding: '5px' }}
    placeholder="Type your remarks here"
    type="text"
    value={eventid === event.code ? message : ""}
    onChange={(e) => handleMessageChange(e, event.code)}
  />
  <div style={{ marginLeft: '10px' }} onClick={() => handleSendMessage(event.code, message)}>
    <FaSave style={{width:'60px',height:'25px',color:'green'}}/>
  </div>
</div>

                    </div>
                  </td>
                  <td>
            <div className="button-container">
            <div 
  className={`switch-button ${event.status === 'assigned' ? "on" : "off"}`} 
  
  style={{
    width: '25px', 
    height: '10px', 
    padding: '2px', 
    position: 'relative',
    marginTop:'3%'
  }}
>
  {event.status === 'assigned' && (
    <div 
      className="switch-handle" 
      style={{
        width: '10px', 
      height: '10px', 
      borderRadius: '50%', 
      backgroundColor: '#fff', 
      position: 'absolute', 
      left: event.status === 'assigned' ? 'calc(100% - 12px)' : '2px', 
      top: '50%', 
      transform: 'translateY(-50%)', 
      transition: 'left 0.2s ease', 
      }}
    ></div>
  )}
  {event.status !== 'assigned' && (
    <div 
      className="switch-handle" 
      style={{
        width: '10px', 
        height: '10px',
        borderRadius: '50%', 
        backgroundColor: '#fff', 
        position: 'absolute', 
        left: '2px', 
        top: '50%', 
        transform: 'translateY(-50%)', 
        transition: 'left 0.2s ease', 
      }}
    ></div>
  )}
</div>
              <div>
              <Link
      to="/eventitem"
      className="event_items_assign"
      style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }} 
    >
      <FaEye 
       onClick={() => handleAddButtonsClick(event.code)} 
        className="event_items_assign_icon" 
        style={{ 
          cursor: 'pointer', 
          marginRight: '5px',
        }}
        onMouseEnter={() => setHoveredEvent(event.code)} 
        onMouseLeave={() => setHoveredEvent(null)} 
      />
     
      {hoveredEvent === event.code && ( 
        <span 
          className="event_items_assign_text"
          style={{ 
            position: 'absolute',
            top: '-190%', 
            left: '-10%',
            transform: 'translateY(-50%)', 
            opacity: 1, // Always show text when hovered
            transition: 'opacity 0.3s ease-in-out', 
          }}
          
        >
          View/Assign
        </span>
        
      )}
    </Link>
              </div>
             <div className="details-button" 
              style={{ background: 'none', border: 'none', cursor: 'pointer',color:'red',padding: '10px 20px',  position: 'relative',marginTop:'-2%',marginLeft:'-3%' }}
              value={deactivate === event.code} 
               onChange={(e) => handleDeactivateEevnt(e, event.code)}
                onClick={() => handleDeactivated(event.code)}>
                  
  <FontAwesomeIcon icon={faTimes} 
  onMouseEnter={() => setHoveredEvent1(event.code)} 
  onMouseLeave={() => setHoveredEvent1(null)} />
  {hoveredEvent1 === event.code && ( 
        <span 
          className="event_items_assign_text"
          style={{ 
            position: 'absolute',
            top: '-30%', 
            left: '-50%',
            transform: 'translateY(-50%)', 
            opacity: 1, // Always show text when hovered
            transition: 'opacity 0.3s ease-in-out', 
          }}
        >
          Deactivate
        </span>
      )}
</div>
              <div>
              {/* <div > */}
        <Link 
  to="/caddevent"
  className="add-event-button" 
  style={{ 
     
    padding: '10px 20px', 
     
    color: 'green', 
    textDecoration: 'none',
    background: 'none',
     border: 'none',
      cursor: 'pointer',
      position: 'relative',
      marginTop:'-5%'
  }}
  onClick={() => handleAddButtonClick(event.code)}
>
<FaPlus style={{width:'20px',
   height:'20px',}}
   onMouseEnter={() => setHoveredEvent2(event.code)} 
   onMouseLeave={() => setHoveredEvent2(null)} 
   />
    {hoveredEvent2 === event.code && ( 
        <span 
          className="event_items_assign_text"
          style={{ 
            position: 'absolute',
            top: '-15%', 
            marginLeft: '-70%',
            transform: 'translateY(-50%)', 
            opacity: 1, 
            transition: 'opacity 0.3s ease-in-out', 
            whiteSpace:'nowrap'
          }}
        >
          Add Event
        </span>
      )}
</Link>
        {/* </div> */}
              </div>
            </div>
          </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={eventListData.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default EventList;
