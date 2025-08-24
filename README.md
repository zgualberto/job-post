# Job Post Application

A full-stack job posting platform built with NestJS (backend) and Quasar (frontend). It supports job ad management, moderation, and email notifications.

## Technologies Used

- **Backend Framework:** NestJS
- **Frontend Framework:** Quasar (Vue.js)
- **ORM:** TypeORM
- **Database:** SQLite (default, can be changed)
- **Validation:** class-validator, class-transformer
- **Testing:** Jest
- **Email:** Nodemailer (dev SMTP)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- yarn
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/) (if running on Windows)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd job-post
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd api
   yarn install
   cd ../client
   yarn install
   cd ..
   yarn install # install root dependencies (for concurrently)
   ```

### Running in Development Mode

#### All Services (API, Client, MailDev) with One Command

You can run the backend, frontend, and MailDev SMTP server concurrently using the following command from the project root:

```bash
yarn dev
```

This will start:
- Backend API (`api`): http://localhost:3000
- Frontend (`client`): http://localhost:9000
- MailDev SMTP server: http://localhost:1080

#### Backend (NestJS) Only

1. Start the backend API:
   ```bash
   cd api
   yarn start:dev
   ```
   The API will run on `http://localhost:3000` by default.

#### Frontend (Quasar) Only

1. Start the frontend:
   ```bash
   cd client
   yarn quasar dev
   ```
   The app will run on `http://localhost:9000` by default.

### Database
- The default database is SQLite, located at `api/database.sqlite`.
- You can change the database configuration in `api/src/database/data-source.ts`.

### Essential Seeders
- The backend includes seeders for essential data, such as the admin moderator.
- To seed the moderator table, run:
  ```bash
  cd api
  yarn console seed:moderator
  ```
- This will create an admin moderator with email `admin@example.com` if it does not already exist.
- You can add more seeders in `api/src/database/seeders/` as needed.

### Email (Dev SMTP)
- The backend uses Nodemailer for sending emails.
- **All email notifications are sent through the DEV SMTP server.**
- For development, it uses a local SMTP server (MailDev or MailHog).
- MailDev is started automatically with `yarn dev`.
- Access the MailDev web interface at `http://localhost:1080` to view all email notifications sent by the app.
- Configure SMTP settings in `api/src/mailer/mailer.module.ts` if needed.

### Running Tests

#### Backend
```bash
cd api
yarn test
```

## Additional Notes
- Job ads are fetched from external sources every hour via scheduled tasks (see `api/src/task/mrge-group-gmbh-job-ad-fetch.service.ts`).
- DTO validation is enforced using class-validator.
- Coverage reports are generated in the `api/coverage` directory after running backend tests.
