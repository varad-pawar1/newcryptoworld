import { useEffect, useRef, useState } from "react";
import CryptoData from "./Components/CryptoData/CryptoData"; // Importing CryptoData component
import Navbar from "./Components/Navbar/Navbar"; // Importing Navbar component
import Pagination from "./Components/Pagination/Pagination"; // Importing Pagination component
import ReCAPTCHA from "react-google-recaptcha"; // Importing ReCAPTCHA for verification
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core"; // Importing DnD Kit for drag-and-drop functionality
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"; // Importing functions for sorting
import axios from "axios"; // Importing Axios for API requests
import "./App.css"; // Importing CSS for styling
import Footer from "./Components/Footer/Footer";

const App = () => {
  // State variables
  const [crypto, setCrypto] = useState([]); // State for storing cryptocurrency data
  const [currentPage, setCurrentPage] = useState(1); // State for current page number
  const [itemsPerPage, setItemsPerPage] = useState(0); // State for items per page
  const [cryptonite, setCryptonite] = useState([]); // State for cryptonite data (sorted crypto)
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [recaptchaVerified, setRecaptchaVerified] = useState(false); // State for reCAPTCHA verification
  const [filteredData, setFilteredData] = useState([]); // State for filtered cryptocurrency data

  const cryptoOrderRef = useRef({}); // Ref to track the order of cryptocurrencies
  const searchDebounceRef = useRef(null); // Ref for debouncing search input

  // Fetch API data
  useEffect(() => {
    async function fetchCrypto() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setItemsPerPage(10)
        setCrypto(response.data); // Setting the crypto data
        setFilteredData(response.data); // Setting filtered data initially
        setLoading(false); // Set loading to false after data fetch
      } catch (error) {
        console.log(error); // Logging error if any
        setLoading(false); // Set loading to false even if an error occurs
      }
    }

    if (recaptchaVerified) {
      fetchCrypto(); // Fetch cryptocurrency data if reCAPTCHA is verified
    }
  }, [recaptchaVerified]);

  // Pagination logic for the current page
  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage; // Start index for current page
    const end = start + itemsPerPage; // End index for current page
    const currentData = filteredData.slice(start, end); // Slicing data for current page

    setCryptonite(cryptoOrderRef.current[currentPage] || currentData); // Setting sliced or ordered crypto data
  }, [filteredData, currentPage, itemsPerPage]);

  // Handle search input
  const searchValuefn = (value) => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current); // Clearing previous debounce timeout
    }

    searchDebounceRef.current = setTimeout(() => {
      const filtered = crypto.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(value ? filtered : crypto); // Setting filtered data
      setCurrentPage(1); // Resetting page to 1 on search
    }, 300);
  };


  // Handle sorting
  const sortByfn = (value) => {
    if (value) {
      const sortedData = [...filteredData].sort((a, b) => {
        if (value === "current_price") return b.current_price - a.current_price;
        if (value === "id" || value === "symbol" || value === "name") {
          return a[value].localeCompare(b[value]);
        }
        return 0;
      });
      setFilteredData(sortedData);
    } else {
      setFilteredData(crypto);
    }

  };

  const handleRecaptcha = (value) => {
    console.log("reCAPTCHA success:", value); // Logging successful reCAPTCHA verification
    setRecaptchaVerified(true); // Setting reCAPTCHA verification status to true
  };

  const sensors = useSensors(
    useSensor(PointerSensor), // Using Pointer Sensor for drag and drop
    useSensor(TouchSensor), // Using Touch Sensor for drag and drop
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }) // Using Keyboard Sensor for sortable items
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return; // If dragged item and target are the same, do nothing

    setCryptonite((cryptonite) => {
      const startIndex = cryptonite.findIndex((item) => item.id === active.id); // Index of item being dragged
      const endIndex = cryptonite.findIndex((item) => item.id === over.id); // Index of target item
      cryptoOrderRef.current[currentPage] = arrayMove(cryptonite, startIndex, endIndex); // Reordering data and storing in ref
      return cryptoOrderRef.current[currentPage];
    });
  };



  return (
    <div className="container">
      {!recaptchaVerified && (
        <div className="recaptcha-container">
          <ReCAPTCHA
            sitekey="6Lf8XqcqAAAAANCc22ZVJnFg3dpkRMO5x0e2S4WX" // Replace with your own site key
            onChange={handleRecaptcha} // Callback on successful reCAPTCHA
          />
        </div>
      )}
      {recaptchaVerified && (
        <>
          <Navbar sortByfn={sortByfn} searchValuefn={searchValuefn} />
          {loading ? <div className="loading">Loading...</div> : null} {/* Loading spinner */}
          <DndContext
            collisionDetection={closestCorners} // Setting collision detection strategy
            sensors={sensors} // Using defined sensors
            onDragEnd={handleDragEnd} // Handling end of drag event
          >
            <CryptoData cryptoData={cryptonite} /> {/* Crypto data component with drag and drop feature */}
          </DndContext>
          <Pagination
            paginate={(page) => {
              setCurrentPage(page); // Updating current page
            }}
            dataLength={filteredData.length} // Total filtered data length
            itemsPerPage={itemsPerPage} // Number of items per page
            currentPage={currentPage} // Current page number
          />

          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
