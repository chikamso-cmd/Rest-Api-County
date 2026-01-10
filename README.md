# REST Countries API with Color Theme Switcher

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b85fed). This web application allows users to browse through countries, view details about them, and toggle between light and dark modes.

- **Live Site**: [https://rest-county-api.netlify.app/](https://rest-county-api.netlify.app/)
- **GitHub Repository**: [https://github.com/chikamso-cmd/Rest-Api-County](https://github.com/chikamso-cmd/Rest-Api-County)

## 📸 Screenshots

*(You can add screenshots of your application here. For example:)*

**Desktop - Light Mode**
![Desktop Light Mode](./design/desktop-preview.jpg)

**Desktop - Dark Mode**
![Desktop Dark Mode](./design/desktop-design-dark.jpg)

## ✨ Features

- **Browse Countries**: See all countries from the API on the homepage with **Infinite Scrolling**.
- **Search & Filter**: Look for specific countries and filter by region.
- **Group by Region**: Toggle a categorized view to see countries organized by their respective regions.
- **Favorites System**: Add countries to your favorites list. Favorites are persisted in `localStorage`.
- **Interactive Map**: View the location of each country and its neighbors on an interactive map (using Leaflet).
- **Detailed History**: Read a brief history of each country fetched dynamically from the Wikipedia API.
- **Enhanced Details**: View comprehensive data including multiple currencies (with symbols), languages, and more.
- **Color Theme Switcher**: Toggle between light and dark mode.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

## 🛠️ Technologies Used

- **React 19**: Modern UI development with hooks.
- **React Router 7**: Robust client-side routing.
- **Tailwind CSS 4**: Utility-first styling for a premium look.
- **Leaflet & React Leaflet**: Interactive mapping capabilities.
- **Wikipedia API**: Dynamic fetching of country historical data.
- **Lucide React**: Clean and consistent iconography.
- **Vite**: Ultra-fast build tool.

## 📂 Project Structure

```
rest-county-api/
├── src/
│   ├── components/
│   │   ├── CountyCard.jsx
│   │   └── CountryMap.jsx
│   ├── context/
│   │   └── FavoritesContext.jsx
│   ├── pages/
│   │   ├── DetailsPage.jsx
│   │   └── HomePage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
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