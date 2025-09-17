# 🗳️ Real-Time Polling Application API

A powerful backend service for a **real-time polling application** built with **Node.js**, **Express.js**, **PostgreSQL**, **Prisma ORM**, and **WebSockets (Socket.IO)**.  
It enables users to create polls, vote on options, and receive instant live vote updates.

---

## 🚀 Features

- 🔐 **User Management** – Secure creation & retrieval of users  
- 📋 **Poll Management** – Create and fetch polls with multiple options  
- 🗳️ **Voting System** – Cast votes on poll options efficiently  
- ⚡ **Live Results** – Real-time vote count updates through WebSockets  
- 🛠️ **RESTful API** – Clean, modular, and maintainable endpoints  
- 🗄️ **PostgreSQL + Prisma** – Robust database schema with complex relationships  

---

## 🛠️ Tech Stack

| Layer                   | Technology             |
|-------------------------|------------------------|
| Backend Framework       | Node.js + Express.js   |
| Database                | PostgreSQL            |
| ORM                     | Prisma                |
| Real-time Communication | Socket.IO (WebSockets) |

---

## 🗃️ Database Schema (Prisma Models)

- 👤 **User**  
  - One user can create many polls  
  - Many users can vote on many poll options  

- 📊 **Poll**  
  - One poll has multiple poll options  

- 🔘 **PollOption**  
  - Belongs to exactly one poll  

- 🗳️ **Vote**  
  - Join table powering the many-to-many user-option votes relationship  

---

## 📡 API Endpoints

| Method | Endpoint         | Description                     |
|--------|-----------------|---------------------------------|
| POST   | `/api/users`    | Create a new user               |
| GET    | `/api/users`    | Retrieve all users              |
| POST   | `/api/polls`    | Create a new poll with options  |
| GET    | `/api/polls`    | Retrieve all polls              |
| GET    | `/api/polls/:id`| Retrieve a specific poll        |
| POST   | `/api/votes`    | Submit a vote for a poll option |

---

## 🔴 WebSocket Events (Socket.IO)

| Event Name    | Trigger                            | Payload Example                       |
|---------------|-----------------------------------|---------------------------------------|
| `join_poll`   | Client subscribes to a poll       | `{ pollId: "123" }`                   |
| `vote_cast`   | User votes on a poll option       | `{ pollId: "123", optionId: "456" }`  |
| `poll_update` | Server broadcasts updated results | `{ pollId: "123", results: [...] }`   |

---

## 🏗️ Project Structure
/prisma
└── schema.prisma
/src
/controllers
/routes
/sockets
index.js
.env
README.md
package.json

## ⚙️ How to Run the Project

### 1️⃣ Prerequisites

- Node.js (v14+ recommended)  
- PostgreSQL (installed & running)

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
3️⃣ Install Dependencies
npm install

4️⃣ Configure .env

Create a .env file in the root with your PostgreSQL connection string:

DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

5️⃣ Setup Prisma & Database

Generate the Prisma client and run initial migration:

npx prisma generate
npx prisma migrate dev --name init

6️⃣ Start the Server
npm start


By default the API runs at:

http://localhost:3000/

🔧 Testing the API

Use Postman or curl:

Create User
POST /api/users
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com",
  "passwordHash": "securehash"
}

Create Poll
POST /api/polls
Content-Type: application/json

{
  "question": "What is your favorite color?",
  "isPublished": true,
  "creatorId": 1,
  "options": ["Red", "Blue", "Green"]
}

🕸️ Real-Time Usage with WebSockets

Emit join_poll with { pollId } from the client to subscribe.

When a vote is cast, server broadcasts poll_update to all subscribed clients with the latest results.

⚖️ License

Released under the MIT License.
