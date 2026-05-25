# everest assessment all task completed

this is my submission for the everest team task. took me a few weeks to get through everything but i managed to finish most of it.

the project has 3 parts — a backend server, a react web app and a mobile app using expo.

---

## folders

- `everest-server` — the backend, built with node.js and express. also has mysql connected to it
- `everest-web` — the frontend in react
- `everest-mobile` — mobile app using expo

---

## how to run

**backend (run this first)**
```bash
cd everest-server
npm install
node index.js
```

you need to create a `.env` file inside everest-server:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=everest
```

**frontend**
```bash
cd everest-web
npm install
npm run dev
```

**mobile**
```bash
cd everest-mobile
npm install
npx expo start
```

note: for the server time screen to work on mobile you have to change the IP in `screens/ServerTime.js` to your own local IP. run `ipconfig` to find it.

---

## database

```bash
Get-Content everest-server/setup.sql | mysql -u root -p
```

this creates the database and users table automatically

---

## whats inside

the backend has endpoints for server time, file upload and download and a users table in mysql

the web app has a calendar, calculator, server time page, file upload/download and a users page that reads and writes to the database

the mobile app has the same stuff but built for phone — calendar, calculator and server time

---

## other tasks

- `everest-server/json-validator` — checks if a json file is valid, run with `node index.js filename.json`
- `everest-server/chinese-converter` — converts simplified chinese to traditional and back
- `everest-server/ip-parser` — takes a list of IPs and groups them by region. note: the original log file url from the task was down so i used sample IPs to test it
 
 
