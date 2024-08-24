Install Dependencies:

npm install
cd frontend
npm install



Environment Variables:
Create a .env file in the root directory and add the following variables:

MONGO_URI=<your_mongodb_connection_string>
Run the Application: npm run dev

Project Structure

frontend: Contains the React application.
backend: Contains the Express server and API routes.
api: Contains Python scripts (detect_fp.py) for fingerprinting detection.
components: React components used in the application.
store: Redux store configuration.

Usage
-Start the Application:
  . Run npm run dev to start both the client and server concurrently.
  . The application will be accessible at http://localhost:3000.

-Browser Fingerprinting Detection:

. Navigate to the detection page.
. Click the "Detect" button to run the fingerprinting detection scripts.
. View the detected scripts displayed on the page.

-AI Chat:
 . Interact with the AI chat component.
 . Enter your queries and receive responses from the integrated AI.

Key Components
Hero Component
Handles the initial user interactions, including the "Detect" and "Ask me" buttons.

ChatAi Component
Provides the AI chat interface, allowing users to interact with the Google Generative AI.

GeneratedScript Component
Displays the detected browser fingerprinting scripts in a styled card component.

API Endpoints
POST /finger-printing: Runs the Python script to detect browser fingerprinting and stores the result in MongoDB.
GET /finger/printing: Fetches all detected browser fingerprinting scripts from MongoDB.

Technical Details
Python Integration: The project uses Python's exec function to run the detect_fp.py script and process the output.
Redux Toolkit: Manages the state of the application and handles API calls using RTK Query.
Flowbite Components: Utilized for modern UI elements and style
