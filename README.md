# To run 
* Clone this repository
* install Node.js, npm, Mongodb
* move to movies-list
* run this commands: 
	* npm install
	* npm run server
	* npm run webpack-devserver
* Open http://localhost:8090 in browser

# Description
Application is bulid use Node.js  runtime environment that runs back-end application (via Express).
The Express framework uses to implement a REST API to allow clients to send requests of the MongoDB database. 
It simplifies the routing and processing of requests.
In the /server folder, the code related to the server side of the application, app.js is the main server file.
Here, a express-application was created, сreated routes and the web server was launched.
As database used MongoDB. Mongoose makes it convenient to work with a database.
We create a model of stored data in the database, and it already helps them to typify, validate and create queries.
The database stores movies. A model (scheme) for films was created in server/models/Film.js.
In server/utils/DataBaseUtils.js, setting up the connection and methods for working with the database are stored.
server/utils/Parser.js implements the parser for the loaded text file.
Data comes in json format, so that it's convenient to interact with them using the bodyParser middleware. 
It will be called whenever the request comes - it first converts the data, and then passes control to our handlers.
As an assembly system, the application uses webpack. webpack.config.js - configuration file for webpack.
Loaders are used to perform file conversions. Webpack-dev-server is used to run a development server and track changes to files.
Hot-reload - automatically reloads the browser page when the project files are changed.
Flux architecture consist of:
    Actions - helpers that simplify the transfer of data to the dispatcher. 
			  This is a set of methods that are called from Views to send Actions to the Controller.
			  client/actions/Films.Actions.js
	Dispatcher - is an event-system. He traces events and registers callbacks.
			  client/dispatcher/AppDispatcher.js
    Stores - Containers for application state and logic that have callbacks registered to the dispatcher.
			  client/stores/FilmStore.js
    Controller Views - React Components that grab the state from Stores and pass it down via props to child components.
			   client/components
In client/constants/FilmConstants.js there are constants - types of actions.
The keyMirror library was used to create an object with values identical to its keys.
EventEmitter from NodeJS allows storages to listen and send events,
which in turn allows the presentation components to be updated based on these events.
Storage listens to notifications from AppDispatcher. Based on the received data, the switch operator decides 
whether we can process the Action. If the action has been processed, a "change" event is created, 
and Views subscribed to this event respond to it by updating their state.
The <App /> component is signed for changes to the repository and invokes actions and passes 
the data to all the child components via props.
	


