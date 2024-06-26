# Tech Assignment

## Assignment description
For this assignment the project contains 2 folder. The app-ui which contains the UI for interaction with the user and for presentation of some result data. The app-server contains the REST Api and the WebSocket server.

For this assignment you have to make requests to the REST Api synchronously and asynchronously and show the results in the ***Console*** component and also make some async requests to the WebSocket server and display the results also in the ***Console*** component. You will have to create the Api and WebSocket endpoints yourself.

To accomplish the above requirements you have to showcase the use of promises and observables.
You can add any controls or components you deem necessary for interaction with the application in any component of the UI except of the ***Console*** component.

Another requirement is, you have to make use of the ***Shared*** folder for shared resources or schemas or data.

## Assignment resolution
I've decided to implement an user chat simulation for this assignment. You can create users with some basic data, list and delete them. When you have at least one user and you start the chat, the users will send random messages in intervals of three seconds.

> [Server docs](app-server/README.md)

> [UI app docs](app-ui/README.md)

You can check the HTTP endpoints documentation by running the server and accessing the base path: http://localhost:3000/.

## To Run the project
### To Run the server
Navigate to *app-server* folder
> Run **yarn install** to install required modules
> Run **yarn start** to start the server
### To Run the UI
Navigate to *app-ui* folder
>Run **yarn install** to install required modules
>Run **yarn run electron** to start the UI
