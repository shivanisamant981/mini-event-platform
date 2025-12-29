import { useState } from "react";
import { createEvent } from "../api/events";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEvent({
        title,
        description,
        dateTime,
        location,
        capacity,
      });
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        required
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        required
      />

      <button type="submit">Create</button>
    </form>
  );
}

