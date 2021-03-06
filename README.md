# Hearo

### By Team Marvel

[Open App](https://marvel-hearo.herokuapp.com/)

---

How to get started:

Once the repository is cloned and opened in a terminal,

1. Install dependencies for both client and server
   1. To install server dependencies from root folder, run `cd server`, then `npm run install`
   2. To install client dependencies from root folder, run `cd client`, then `npm run install`
2. [Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/), if needed.
3. Run server to ensure everything is working.
   1. From root folder, `cd server`, then `npm run dev`

To Deploy the application:

1. Heroku cli and Docker to be installed
2. Build the React App and move it to the server folder
   1. change directory to the client folder (`cd client`)
   2. run `npm run build`
3. Change directory to the server folder (`cd ../server`)  
4. heroku login
5. heroku container:login (requires you to login to docker)
6. heroku heroku container:push web -a marvel-hearo (creates docker image and pushes it to heroku)
7. heroku container:release web -a marvel-hearo (deploys docker image)
