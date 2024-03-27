ToDo App in Next.js with MongoDB 
=====================================================

Dieses Projekt ist Bestandteil des Kurses Internet-Technologien (KIB-INET/PIB-INET) im 5. Semester der HTW Saar.
Ziel dieses Gruppenprojektes ist die Entwicklung einer ToDo App basierend auf Next.js mit MongoDB Integration.
Die Hauptfunktionalitäten sind das Erstellen und Speichern von ToDo Listen. 
Beim Speichern wird ein zufälliger Link generiert, welcher die ToDo Liste jederzeit aufrufbar macht.

Developing the App
----------------
- Make sure that you have installed node.js and npm
1. Run "npm install" in the todo folder
2. Run "npm run build" 
3. Run "npm run start" 
4. Open your browser and go to page "http://localhost:3000"
   
Testing Your API
----------------
*   **API Endpoint:** `https://todo-snowy-tau.vercel.app/api/data`
 To test, send a simple POST request with a JSON body to the API endpoint.
Quick Start Guide

   
Using your own DB
----------------
Set the env variable MONGODB_URI to your MongoDB Connection String
or set the Connection String in mongoclient.js
