import React, { useState, useEffect } from 'react';
import BookedEventList from './BookedEventList';
import CreateEvent from './CreateEvent';
import EventCard from './EventCard';
import EventForm from './eventform';
import EventList from './EventList';
import UpdateEvent from './UpdateEvent';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [isCreateMode, setCreateMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Fetch events from the backend API
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const toggleCreateMode = () => {
    setCreateMode(!isCreateMode);
  };

  const handleEventUpdate = (eventId) => {
    const eventToUpdate = events.find(event => event._id === eventId);
    setSelectedEvent(eventToUpdate);
    setCreateMode(true); // Switch to the update mode
  };

  return (
    <div className="event-management">
      <h1>Event Management</h1>

      {isCreateMode ? (
        <CreateEvent
          toggleCreateMode={toggleCreateMode}
          event={selectedEvent}
          fetchEvents={fetchEvents}
        />
      ) : (
        <div>
          <button onClick={toggleCreateMode}>Create New Event</button>
          <EventList events={events} onEventUpdate={handleEventUpdate} />
          <BookedEventList events={events} />
        </div>
      )}
    </div>
  );
};

export default EventManagement;
