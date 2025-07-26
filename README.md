Sure! Here’s the content formatted as a README.md file:

# 📘 Bookmark Management API

A secure and fully-featured REST API built with **NestJS**, **Prisma**, and **MySQL** for managing users and their bookmarks.

---

## 🔥 Features

- ✅ **Authentication**
  - User Registration & Login
  - JWT-based Auth
  - Password Change

- 📚 **Bookmark Management**
  - Create, Read, Update, Delete Bookmarks
  - Paginated List with Sorting & Filtering
  - Join with User Information

- 🛡️ **Security & Validation**
  - DTO Validation via `class-validator`
  - Protected Routes using `JWT`
  - Secure Password Handling

---

## 📦 Tech Stack

- [NestJS](https://nestjs.com/)  
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [JWT](https://jwt.io/)
- [Class Validator](https://github.com/typestack/class-validator)

---

## ⚙️ Environment Setup

Create a `.env` file in the project root:

```env
DATABASE_URL="mysql://<username>:<password>@localhost:3306/<dbname>"
JWT_SECRET="<your_jwt_secret>"
JWT_EXPIRES_IN="1d"

Replace <username>, <password>, and <dbname> with your MySQL credentials.

⸻

🚀 Getting Started

1. Clone the Repository

git clone https://github.com/The-Indian-Programmer/nest-js-crud-application.git
cd nest-js-crud-application

2. Install Dependencies

npm install

3. Set Up the Database (MySQL)

npx prisma migrate dev --name init
npx prisma generate

Optional: Seed data with npx prisma db seed if you have a seed script.

4. Run the Development Server

npm run start:dev


⸻

📁 Folder Structure

src/
├── auth/
│   ├── dto/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── jwt.guard.ts
├── bookmarks/
│   ├── dto/
│   ├── bookmarks.controller.ts
│   └── bookmarks.service.ts
├── prisma/
│   └── prisma.service.ts
├── common/
│   └── decorators/
├── main.ts


⸻

📚 API Endpoints

✅ Auth Routes

Method	Endpoint	Description
POST	/auth/sign-up	Register a new user
POST	/auth/sign-in	Login user, returns token
PATCH	/auth/me	Change user password

📘 Bookmark Routes (JWT Protected)

Method	Endpoint	Description
POST	/bookmarks	Create a new bookmark
GET	/bookmarks	List bookmarks with pagination
GET	/bookmarks/:id	Get bookmark by ID
PATCH	/bookmarks/:id	Update bookmark
DELETE	/bookmarks/:id	Delete bookmark

Query Params for Listing:

GET /bookmarks?page=1&limit=10&order=desc&order_by=created_at


⸻

🛠️ Prisma Commands

Command	Description
npx prisma migrate dev	Apply DB migrations
npx prisma generate	Generate Prisma client
npx prisma studio	GUI to inspect database
npx prisma db push	Push schema to database (optional)


⸻

🧪 Test with Postman

You can import a Postman collection manually or use Swagger for interactive API testing.

⸻

🧰 Useful Scripts

Script	Purpose
npm run start:dev	Run app in development mode
npm run build	Compile project


⸻

👨‍💻 Author

Sumit Kosta – Full Stack Developer

⸻