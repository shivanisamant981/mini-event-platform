import { useEffect, useState } from "react";
import { fetchEvents, rsvpJoin, rsvpLeave } from "../api/events";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const res = await fetchEvents();
      setEvents(res.data);
    } catch (error) {
      alert("Failed to load events");
    }
  };

  const handleJoin = async (id) => {
    try {
      await rsvpJoin(id);
      loadEvents(); // refresh list
    } catch (error) {
      alert(error.response?.data?.message || "Join failed");
    }
  };

  const handleLeave = async (id) => {
    try {
      await rsvpLeave(id);
      loadEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Leave failed");
    }
  };

  return (
    <div>
      <h2>Upcoming Events</h2>
      <Link to="/create">Create Event</Link>

      {events.map((event) => (
        <div key={event._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p><b>Location:</b> {event.location}</p>
          <p>
            <b>Seats:</b> {event.attendeesCount}/{event.capacity}
          </p>

          <button onClick={() => handleJoin(event._id)}>Join</button>
          <button onClick={() => handleLeave(event._id)}>Leave</button>
        </div>
      ))}
    </div>
  );
}

