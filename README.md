![Screenshot 2024-12-29 115334](https://github.com/user-attachments/assets/59eba9e0-827d-42b7-9d65-58673913c311)### Crypto-World

A React-based web application that allows users to explore and track cryptocurrencies. The app fetches real-time data from the CoinGecko API and displays the list of cryptocurrencies, their market cap, and other related information. Users can search, filter, and paginate through the data efficiently.

### Deployed Link: https://newcryptoworld.netlify.app

---

### Features:

1. **Cryptocurrency Data**: Displays the list of cryptocurrencies, fetched from the CoinGecko API.
2. **Search Filter**: Search through the list of cryptocurrencies by name, with a live filter that updates as the user types.
3. **Pagination**: Paginate through the cryptocurrency list to load a smaller subset of items at a time, improving performance and user experience.
4. **Drag and Drop Feature**: Allows users to rearrange items within the current page view using smooth drag-and-drop functionality.
5. **Google reCAPTCHA Integration**: Verifies users before loading items to demonstrate integration with third-party APIs.
6. **Error Handling**: Displays an error message if data fetching fails.
7. **Loading Indicator**: Displays a loading indicator while data is being fetched from the API.

---

### Technologies Used:

- **React**: Frontend framework for building the user interface.
- **Axios**: For making HTTP requests to the CoinGecko API.
- **CSS**: Basic styling for the application layout and UI components.
- **react-dnd**: Library for implementing drag-and-drop functionality.

---

### Installation:

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/varad-pawar1/newcryptoworld.git
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Run the app**:
   ```bash
   npm run dev
   ```

---

### Optimizations:

1. **Performance Optimizations**:  
   - Pagination displays only relevant data for the current page, reducing load times and browser rendering.  
   - Debounced search processes search queries after a short delay, minimizing unnecessary re-renders and API calls.  
   - Efficient data fetching asynchronously retrieves only necessary data from the CoinGecko API, improving load speed.  
   - State management minimizes re-renders by effectively managing state changes.

2. **SEO Optimizations**:
   - Semantic HTML utilizes elements like `<header>`, `<main>`, and `<footer>` for better accessibility and SEO.  
   - Meta tags include essential elements like title, description, and keywords for search engine optimization.  
   - Responsive design ensures mobile-friendliness with media queries.  
   - Clean URLs maintain SEO-friendly and user-friendly structures.  
   - The search filter enhances engagement by showing relevant data directly based on user queries.

---

### Directory Structure:

```
Cryptocurrency/
├── node_modules/          # Node.js dependencies (generated by npm/yarn)
├── dist/                  # Build directory (generated by Vite for production)
├── public/                # Public assets
├── src/                   # Source directory
│   ├── Components/        # Component folder
│   │   ├── Crypto-List/  
│   │   │   ├── CryptoList.jsx
│   │   │   ├── CryptoList.module.css
│   │   ├── CryptoData/
│   │   │   ├── CryptoData.jsx
│   │   │   ├── CryptoData.module.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.module.css
│   │   ├── Pagination/
│   │   │   ├── Pagination.jsx
│   │   │   ├── Pagination.module.css
│   │   ├── Search/
│   │   │   ├── Search.jsx
│   │   │   ├── Search.module.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.css
│   ├── App.css            # Global app styles
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles (for resetting defaults, etc.)
│   ├── main.jsx           # Entry point for the app
├── .gitignore             # Files and directories to ignore in Git
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template for Vite
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Exact dependency tree
├── README.md              # Project documentation
├── vite.config.js         # Vite configuration
```

---

### Key Updates:

1. **Node Modules**: Automatically generated folder for dependencies.
2. **dist/**: The production build folder, created when you build the app.
3. **.gitignore**: Includes common ignores, like node_modules/ and dist/.
4. **eslint.config.js**: Ensures consistent code style and linting.
5. **index.html**: Main template file for Vite.
6. **package-lock.json**: Locks the versions of dependencies for reproducibility.

---

### Future Enhancements:

1. Add more advanced filtering options (e.g., by market cap, volume, etc.).
2. Integrate more detailed views for each cryptocurrency, including historical data and charts.
3. Implement caching to improve data fetching efficiency and reduce the number of API calls.
4. Add a dark mode toggle for better accessibility.

---

### Snapshot:

Below is a snapshot of the application showcasing its UI and features:

![landing-page](https://github.com/user-attachments/assets/b9fa6397-63b2-4ea5-ac4d-d974803c171a)

![main-page](https://github.com/user-attachments/assets/d6e6e244-4906-4e09-878b-d641d639830f)
![dropdown-feature](https://github.com/user-attachments/assets/673b88ff-caac-487d-8f00-539cf8186fe1)


