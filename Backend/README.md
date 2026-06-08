
# MelodyStream

**MelodyStream** is a robust backend system for a mini music streaming platform that supports **Users** and **Artists** roles. Users can browse music and albums, while artists can register, login, and upload music and album images. Images are hosted securely using **ImageKit Cloud**, and the backend is built with **Node.js**, **Express**, and **MongoDB**, with **JWT authentication** for secure access.

---

## Features

* Users can view available music and albums.
* Artists can register, login, and manage their music and albums.
* Upload and serve music/album images via **ImageKit Cloud**.
* Full **CRUD functionality** for music and albums.
* **JWT Authentication** for secure endpoints.
* RESTful APIs with role-based access control.

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (NoSQL)
* **Authentication:** JWT
* **Image Hosting:** ImageKit Cloud
* **Other:** RESTful APIs, Git, Postman for testing

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Shahanaj24/melodystream-backend.git
```

2. Navigate to the backend folder:

```bash
cd melodystream-backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root folder with the following variables:

```
MONGO_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
CLIENT_URL=http://localhost:5173
```

5. Start the server:

```bash
npm nodemon server.js
```

The server will run on `http://localhost:3000` by default.

---

## API Endpoints

### User Routes

* `GET /music` – Get all music
* `GET /albums` – Get all albums

### Artist Routes

* `POST /artists/register` – Register new artist
* `POST /artists/login` – Artist login
* `POST /artists/music` – Upload music/album
* `POST /artists/upload` – Upload image using **ImageKit Cloud**


---

## Folder Structure

```
melodystream-backend/
│
├─ src/
│  ├─ controllers/       # Request handlers
│  ├─ middleware/        # JWT auth & role checks
│  ├─ models/            # Mongoose models
│  ├─ routes/            # API routes
│  └─ services/          # ImageKit & storage services
│
├─ server.js             # Entry point
├─ package.json
├─ package-lock.json
└─ README.md
```

---

## Technologies Used

* Node.js & Express.js for backend
* MongoDB with Mongoose for database
* JWT Authentication for secure endpoints
* ImageKit Cloud for image hosting
* RESTful APIs
* Postman for API testing


---

## Future Improvements

* Add a **frontend** for users and artists (React or EJS).
* Implement **search and filtering** for music and albums.
* Add **pagination** for large datasets.
* Implement **cloud storage for audio files**.

---

## Author

**Shahanaj Shaikh**





