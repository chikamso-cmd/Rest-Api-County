# REST Countries API with Color Theme Switcher

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b85fed). This web application allows users to browse through countries, view details about them, and toggle between light and dark modes.

## 📸 Screenshots

*(You can add screenshots of your application here. For example:)*

**Desktop - Light Mode**
![Desktop Light Mode](./design/desktop-preview.jpg)

**Desktop - Dark Mode**
![Desktop Dark Mode](./design/desktop-design-dark.jpg)

## ✨ Features

- **Browse Countries**: See all countries from the API on the homepage.
- **Search**: Look for a specific country using the search bar.
- **Filter by Region**: Filter the displayed countries by their region (Africa, Americas, Asia, Europe, Oceania).
- **Detailed View**: Click on a country to see more details on a separate page.
- **Border Countries**: On the detail page, click on border countries to navigate to their respective detail pages.
- **Color Theme Switcher**: Toggle between light and dark mode for a comfortable viewing experience. The chosen theme is saved in your browser.
- **Responsive Design**: The application is fully responsive and works on various screen sizes, from mobile to desktop.

## 🛠️ Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling client-side routing between the home and detail pages.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: A fast build tool and development server for modern web projects.
- **Lucide React**: A beautiful and consistent icon library.
- **REST Countries API**: To fetch country data.
- **ESLint**: For identifying and reporting on patterns found in ECMAScript/JavaScript code.

## 📂 Project Structure

```
rest-county-api/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── CountyCard.jsx
│   │   └── Main.jsx
│   ├── pages/
│   │   ├── DetailsPage.jsx
│   │   └── HomePage.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (or a similar package manager like Yarn or pnpm) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/rest-countries-api-with-color-theme-switcher.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd rest-countries-api-with-color-theme-switcher
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

To start the development server, run the following command:

```sh
npm run dev
```

This will start the application in development mode. Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to view it in your browser.

## 📜 Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in the development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Runs the linter to check for code quality and style issues.
-   `npm run preview`: Serves the production build locally to preview it.