# Around the U.S.

Around the U.S. is a responsive photo-sharing web application where users can
manage their profile and interact with a collection of place cards. The
interface is connected to a REST API, making the server the source of truth for
profile information, cards, likes, and ownership data.

## Features

- Loads the current user's profile and cards from the server.
- Updates the user's name, description, and profile picture.
- Creates new place cards from validated form data.
- Adds and removes likes while keeping the interface synchronized with the API.
- Allows users to delete their own cards after confirming the action.
- Opens card images in a dedicated preview popup.
- Provides client-side form validation and loading feedback during requests.
- Displays non-blocking error notifications when a request fails.
- Adapts the layout and interface controls for desktop and mobile screens.

## How It Works

When the application starts, it requests the user profile and initial cards
together. The returned data is passed to independent UI classes responsible for
rendering profile information, cards, forms, popups, and notifications.

User actions are coordinated from `scripts/index.js`. The `Api` class performs
the network requests and returns the parsed server responses. The interface is
updated only after a request succeeds, keeping the visible state consistent
with the server. Errors are passed to the notification component so the user
receives feedback without interrupting the page with browser alerts.

## Technologies

- Semantic HTML5
- CSS3, responsive design, and the BEM naming methodology
- JavaScript ES6 modules
- Object-oriented JavaScript and class inheritance
- Fetch API, Promises, and REST API integration
- Client-side form validation
- Git and GitHub

## Project Structure

```text
src/          Main HTML document
blocks/       BEM CSS blocks
components/   Reusable JavaScript classes
scripts/      Application setup, configuration, and UI coordination
pages/        Main CSS entry point
images/       Interface assets
vendor/       Fonts and normalized browser styles
```

## Running the Project Locally

This project does not require installing dependencies or running a build step.
Clone the repository, open it in your editor, and serve the project root with a
local static server such as the VS Code Live Server extension. Then open
`src/index.html` through that server.
