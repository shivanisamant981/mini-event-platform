 I will guide you step wise step

# Mini Event Platform – MERN Stack

## 📌 Project Overview
The **Mini Event Platform** is a full-stack web application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
It allows users to create events, view upcoming events, and RSVP to events while strictly enforcing event capacity and handling concurrency to prevent overbooking.

---

## 🧑‍💻 Steps to Run the Project Locally

## list of environment variable for the backend

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


### Prerequisites
Make sure the following are installed on your system:
- Node.js (v18 or above)
- npm
- Git
- MongoDB Atlas account (or local MongoDB)

---

### Step 1: Clone the Repository
```bash
git clone <your-github-repository-url>
cd Mini-Event-Platform
cd server
npm install



## 🛠 Tech Stack
### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- dotenv

---

## ✨ Features Implemented

### 🔐 User Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes using auth middleware

### 📅 Event Management
- Create events (title, description, date & time, location, capacity)
- View all upcoming events
- Delete events (only by the creator)
- Events sorted by date & time
- Display event creator’s name

### 🎟 RSVP System (Critical Logic)
- Users can join and leave events
- Capacity enforcement (no overbooking)
- One RSVP per user per event
- Concurrency-safe RSVP handling
- Real-time seat availability display

### 🎨 Frontend UI
- Fully responsive UI (desktop, tablet, mobile)
- Clean and modern design using Tailwind CSS
- Event cards with creator name, date, location, and capacity
- Logged-in user name displayed on top
- Confirmation before deleting events

---

## ⚙️ RSVP Capacity & Concurrency Handling (Important)

To prevent **race conditions and overbooking**, the RSVP logic is handled **atomically at the database level** using MongoDB.

### Strategy Used
- `findOneAndUpdate`
- MongoDB `$expr` operator
- Atomic update operators (`$inc`, `$push`, `$pull`)

### RSVP Join Logic (Simplified)
```js
Event.findOneAndUpdate(
  {
    _id: eventId,
    $expr: { $lt: ["$attendeesCount", "$capacity"] },
    attendees: { $ne: userId },
  },
  {
    $inc: { attendeesCount: 1 },
    $push: { attendees: userId },
  },
  { new: true }
);
