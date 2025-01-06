import { useEffect, useRef, useState } from "react";
import CryptoData from "./Components/CryptoData/CryptoData";
import Navbar from "./Components/Navbar/Navbar";
import Pagination from "./Components/Pagination/Pagination";
import ReCAPTCHA from "react-google-recaptcha";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import axios from "axios";
import "./App.css";
import Footer from "./Components/Footer/Footer";

const App = () => {

  const [crypto, setCrypto] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [cryptonite, setCryptonite] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const cryptoOrderRef = useRef({});
  const searchDebounceRef = useRef(null);


  useEffect(() => {
    async function fetchCrypto() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setItemsPerPage(10)
        setCrypto(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    if (recaptchaVerified) {
      fetchCrypto();
    }
  }, [recaptchaVerified]);


  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentData = filteredData.slice(start, end);

    setCryptonite(cryptoOrderRef.current[currentPage] || currentData);
  }, [filteredData, currentPage, itemsPerPage]);


  const searchValuefn = (value) => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      const filtered = crypto.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(value ? filtered : crypto);
      setCurrentPage(1);
    }, 300);
  };



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
    console.log("reCAPTCHA success:", value);
    setRecaptchaVerified(true);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setCryptonite((cryptonite) => {
      const startIndex = cryptonite.findIndex((item) => item.id === active.id);
      const endIndex = cryptonite.findIndex((item) => item.id === over.id);
      cryptoOrderRef.current[currentPage] = arrayMove(cryptonite, startIndex, endIndex);
      return cryptoOrderRef.current[currentPage];
    });
  };



  return (
    <div className="container">
      {!recaptchaVerified && (
        <div className="recaptcha-container">
          <ReCAPTCHA
            sitekey="6Lf8XqcqAAAAANCc22ZVJnFg3dpkRMO5x0e2S4WX"
            onChange={handleRecaptcha}
          />
        </div>
      )}
      {recaptchaVerified && (
        <>
          <Navbar sortByfn={sortByfn} searchValuefn={searchValuefn} />
          {loading ? <div className="loading">Loading...</div> : null}
          <DndContext
            collisionDetection={closestCorners}
            sensors={sensors}
            onDragEnd={handleDragEnd}
          >
            <CryptoData cryptoData={cryptonite} />
          </DndContext>
          <Pagination
            paginate={(page) => {
              setCurrentPage(page);
            }}
            dataLength={filteredData.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />

          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
