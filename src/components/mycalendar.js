// MyCalendar.js

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: new Date(2023, 0, 15, 10, 0),
      end: new Date(2023, 0, 15, 12, 0),
    },
    // Add more events as needed
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    start: '',
    end: '',
  });

  const handleEventClick = (event) => {
    alert(`Clicked on event: ${event.title}`);
  };

  const addEvent = () => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    // Clear the form after adding the event
    setNewEvent({ title: '', start: '', end: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const nextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, 'month'));
  };

  const prevMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, 'month'));
  };

  return (
    <div style={{ height: '500px' }}>
      <div>
        <button onClick={prevMonth}>Previous Month</button>
        <span>{currentDate.format('MMMM YYYY')}</span>
        <button onClick={nextMonth}>Next Month</button>
      </div>

      <div>
        {/* Form to add a new event */}
        <form>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
          />

          <label>Start Date and Time:</label>
          <input
            type="datetime-local"
            name="start"
            value={newEvent.start}
            onChange={handleInputChange}
          />

          <label>End Date and Time:</label>
          <input
            type="datetime-local"
            name="end"
            value={newEvent.end}
            onChange={handleInputChange}
          />

          <button type="button" onClick={addEvent}>
            Add Event
          </button>
        </form>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '20px' }}
        onSelectEvent={handleEventClick}
      />
    </div>
  );
};

export default MyCalendar;
