import { useEffect, useState } from "react";
import { fetchEvents, rsvpJoin, rsvpLeave, deleteEvent } from "../api/events";
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
      loadEvents();
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await deleteEvent(id);
      loadEvents();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Upcoming Events
          </h2>

          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Event
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const isFull = event.attendeesCount >= event.capacity;

            return (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between"
              >
                  <p className="text-xs text-gray-500 mb-1">
                 Created by <span className="font-medium text-gray-700">
                 {event.createdBy?.name || "Unknown"}
               </span>
               </p>



                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {event.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-2">
                    {event.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                     {new Date(event.dateTime).toLocaleString("en-IN", {
                      dateStyle: "medium",
                        timeStyle: "short",
                        })}
                  </p>


                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Location:</span>{" "}
                    {event.location}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                      isFull
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    Seats {event.attendeesCount}/{event.capacity}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleJoin(event._id)}
                      disabled={isFull}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                        isFull
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      }`}
                    >
                      Join
                    </button>

                    <button
                      onClick={() => handleLeave(event._id)}
                      className="flex-1 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
                    >
                      Leave
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="w-full py-2 rounded-lg text-sm font-medium bg-gray-800 text-white hover:bg-black transition"
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
