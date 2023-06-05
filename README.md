# Vue_Chat_backend
This repository contains the backend code for the [Vue_Chat_frontend](https://github.com/AhmedAlEssam/VueChatFrontend  "Could be not uploaded yet") application. The project is built using Node.js, TypeScript, and various libraries. It serves as the server-side component of the Vue_Chat application, providing the necessary APIs for the frontend to communicate with.

## Project Setup

To use this project, please follow the steps below:

1. Clone the repository to your local machine:

```
git clone https://github.com/AhmedAlEssam/Vue_Chat_backend.git
``` 

2. Navigate to the project directory:

```
cd Vue_Chat_backend
```

3. Install the project dependencies using npm:

```
npm install
```

4. Start the backend server:

```
npm run start
```

This will compile the TypeScript code and launch the backend server.

Dependencies
The backend project relies on the following dependencies:

- ``@decorators/express``: A library for using decorators with Express.js.
- ``@types/bcrypt``: Type definitions for the ``bcrypt`` library.
- ``@types/cors``: Type definitions for the ``cors`` library.
- ``@types/express``: Type definitions for the Express.js framework.
- ``@types/jsonwebtoken``: Type definitions for the jsonwebtoken library.
- ``@types/node``: Type definitions for Node.js.
- ``bcrypt``: A library for hashing passwords.
- ``cors``: A middleware for enabling Cross-Origin Resource Sharing.
- ``express``: A web application framework for Node.js.
- ``jsonwebtoken``: A library for generating JSON Web Tokens (JWT).
- ``pg``: A PostgreSQL client library.
- ``reflect-metadata``: A library for adding metadata reflection to TypeScript.
- ``tsc-watch``: A TypeScript compiler watcher.
- ``typeorm``: An Object-Relational Mapping (ORM) library.


These dependencies are automatically installed when running ``npm install``.

## Connecting to the Frontend

To connect the backend server to the frontend, please follow the instructions below:

1. Make sure the Vue_Chat_frontend project is set up and running by following the instructions provided in its readme file.

2. Open the ``src/config.ts`` file in the backend project.

3. Update the ``FRONTEND_URL`` constant to match the URL where the Vue_Chat_frontend server is running. This is necessary to allow CORS requests from the frontend to the backend.

```
// src/config.ts

export const FRONTEND_URL = 'http://localhost:5173'; // Update with the correct frontend server URL
```

Make sure to replace 'http://localhost:5173' with the appropriate URL where the frontend server is running.

4. Save the changes.

With the backend server connected to the frontend, you can now use the Vue_Chat application with full functionality.

## Contributing
If you wish to contribute to this project, please fork the repository, make your changes, and submit a pull request. Your contributions are greatly appreciated!

## License
This project is licensed under the [ISC License](/LICENSE). Feel free to use and modify the codebase according to the terms of the license.
