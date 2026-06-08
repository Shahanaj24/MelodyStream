# 🎵 MelodyStream

MelodyStream is a full-stack music streaming platform that allows users to discover music and artists to manage their content. The application provides secure authentication, music and album management, image uploads through ImageKit, and a modern responsive user interface.

The project is built using the MERN stack and follows a role-based architecture where users and artists have different permissions and capabilities.

---

##  Features

### User Features

* Create an account and log in securely
* Browse available songs and albums
* View detailed song and album information
* Enjoy a responsive and modern music streaming experience

### Artist Features

* Register and log in as an artist
* Upload songs and album artwork
* Create and manage albums
* Update or remove uploaded content
* Access a dedicated artist dashboard

### Authentication & Security

* JWT-based authentication
* Protected routes
* Role-based access control
* Secure API endpoints

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Cloud Services

* ImageKit (Image Hosting)

---

## 📂 Project Structure

```text
MelodyStream/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── Backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Shahanaj24/MelodyStream.git
cd MelodyStream
```

---

## 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=your_url_endpoint

CLIENT_URL=http://localhost:5173
PORT=3000
```

Start the server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

---

##  Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

## 🔌 API Overview

### Authentication

```http
POST /artists/register
POST /artists/login
```

### Music

```http
GET /music
POST /artists/music
PUT /artists/music/:id
DELETE /artists/music/:id
```

### Albums

```http
GET /albums
POST /artists/albums
PUT /artists/albums/:id
DELETE /artists/albums/:id
```

### Image Upload

```http
POST /artists/upload
```

Images are uploaded and managed through ImageKit Cloud.

---

## 📸 Screenshots

Add screenshots of:

* Home Page
* 
* Login Page
* Artist Dashboard
* Music Upload Page
* Albums Page

Example:



##  Future Improvements

* Audio streaming optimization
* Search and filtering functionality
* Playlist creation
* Like and favorite songs
* User profiles
* Music recommendations
* Cloud storage for audio files
* Admin dashboard

---

##  Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 👨‍💻 Developer

**Shahanaj Shaikh**

Passionate about building scalable web applications and creating clean user experiences.

GitHub: https://github.com/Shahanaj24

-
