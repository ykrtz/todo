ToDo App in Next.js with MongoDB 
=====================================================
<p align="center">
    <a href="https://ibb.co/8DSH55G">
        <img src="https://i.ibb.co/7J6qWWB/asdsad.png"/>
    </a>
</p>

Dieses Projekt ist Bestandteil des Kurses Internet-Technologien (KIB-INET/PIB-INET) im 5. Semester der HTW Saar.
Ziel dieses Gruppenprojektes ist die Entwicklung einer ToDo App basierend auf Next.js mit MongoDB Integration.
Die Hauptfunktionalitäten sind das Erstellen und Speichern von ToDo Listen. 
Beim Speichern wird ein zufälliger Link generiert, welcher die ToDo Liste jederzeit aufrufbar macht.

Using the App
----------------
The ToDo App is deployed on Vercel. You can access the app using the following link:

[ToDo App](https://todo-snowy-tau.vercel.app/)

Features
----------------
- Create, update, and delete tasks
- Organize tasks into different categories based on priority
- Responsive design for desktop
- Save your ToDo Lists 

Developing the App
----------------
Before you start, ensure you have the following prerequisites installed:
- Node.js (version 18.17.0 or later)
- npm (Node Package Manager)

Follow these steps to set up the app locally:

1. Clone the repository to your local machine.
2. Navigate to the `todo` folder.
3. Install the necessary dependencies by running: `npm install`
5. Create a build by running: `npm run build`
6. Run to start the app: `npm run start` 
7. Open your browser and go to page ` http://localhost:3000` 
   
Using Your Own Database
----------------

To configure your MongoDB instance, you need to set the environment variable `MONGODB_URI` with your connection string.
You can set this variable directly in your environment or configure it in the `mongoclient.js` file.

Example configurations:

- For a local MongoDB database:
`const client = new MongoClient("mongodb://localhost:27017")`

- For using your own MongoDB Cluster database:
`const client = new MongoClient("mongodb+srv://username:password@clustername.mongodb.net/?retryWrites=true&w=majority")`

- For using your own MongoDB Cluster database with environment variable:
`const client = new MongoClient("process.env.MONGODB_URI");`
