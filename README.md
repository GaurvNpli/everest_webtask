# Everest Assessment

Full stack project built for the Everest team assessment. Node.js backend, React frontend, and Expo mobile app.

## Folders

| Folder | Stack |
|--------|-------|
| `everest-assessment` | Node.js + Express + MySQL |
| `everest-web` | React + Vite |
| `everest-mobile` | Expo + React Native |

## How to run

**Backend**
```bash
cd everest-assessment
npm install
node index.js
```
Add a `.env` file with your MySQL credentials:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=everest
```

**Frontend**
```bash
cd everest-web
npm install
npm run dev
```

**Mobile**
```bash
cd everest-mobile
npm install
npx expo start
```
Update the IP address in `screens/ServerTime.js` to your local machine IP.

## Database
```bash
Get-Content everest-assessment/setup.sql | mysql -u root -p
```

## Features
- REST API — server time, file upload/download, MySQL CRUD
- React — Calendar, Calculator, Server Time, Files, Users
- Mobile — Calendar, Calculator, Server Time
