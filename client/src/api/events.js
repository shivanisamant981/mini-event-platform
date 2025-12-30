import API from "./axios";

export const fetchEvents = () => API.get("/event");
export const createEvent = (data) => API.post("/event", data);
export const rsvpJoin = (eventId) => API.post(`/event/${eventId}/rsvp`);
export const rsvpLeave = (eventId) => API.delete(`/event/${eventId}/rsvp`);
export const deleteEvent = (id) => API.delete(`/event/${id}`);
