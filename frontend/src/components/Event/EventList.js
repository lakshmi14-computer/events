import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/event-list');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="event-list">
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id} className="event-item">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>{event.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
