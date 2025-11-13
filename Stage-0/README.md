# Stage-0 Backend Course

This project is a simple Node.js application using Express and a PostgreSQL database. It provides an API to add students to a database.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Database Configuration:**
    The application uses `pg-promise` to connect to a PostgreSQL database. The connection string is hardcoded in `main.js`. 

    ```javascript
    const db = pgp(
      "postgresql://neondb_owner:npg_vWfO7jkbw9Yh@ep-crimson-frog-ag1szc6z-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    );
    ```

    Ensure your database is running and accessible with this connection string.

## Running the Application

To start the server, run the following command:

```bash
node main.js
```

The server will start on `http://localhost:3000`.

## API Endpoints

### `GET /`

-   **Description:** A simple health check endpoint.
-   **Response:**
    -   `200 OK`: with the text `Hello World!`.

### `POST /v1/student`

-   **Description:** Adds a new student to the database.
-   **Request Body:** A JSON object with the following properties:
    -   `Name` (string, required)
    -   `LastName` (string, required)
    -   `TelegramUsername` (string, required)
    -   `GithubUsername` (string, required)
    -   `Idea` (string, required)
-   **Example Request:**
    ```json
    {
      "Name": "Charaf Eddine",
      "LastName": "Belhadj",
      "TelegramUsername": "mr_ton618",
      "GithubUsername": "CharafEB",
      "Idea": "I just love how software works"
    }
    ```
-   **Responses:**
    -   `201 Created`: If the student is created successfully. The response body will include a success message and the created student's data.
    -   `400 Bad Request`: If any of the fields are not strings or are empty.
    -   `500 Internal Server Error`: If there is a problem with the database operation.
