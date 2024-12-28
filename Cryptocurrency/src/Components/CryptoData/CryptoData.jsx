import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable"; // Importing necessary DnD Kit utilities
import CryptoList from "../Crypto-List/CryptoList"; // Importing CryptoList component
import styles from "./CryptoData.module.css"; // Importing CSS module for styling

const CryptoData = ({ cryptoData }) => {
  return (
    <div className={styles.cryptoContainer}> {/* Container for displaying cryptocurrency data */}
      {/* SortableContext provides the drag-and-drop context for sortable items */}
      {/* items={cryptoData} sets the list of sortable items, strategy={rectSortingStrategy} defines how items are arranged */}
      <SortableContext items={cryptoData} strategy={rectSortingStrategy}>
        {cryptoData.map((data) => { // Mapping over the cryptoData array to render each CryptoList component
          return (
            <CryptoList
              key={data.id} // Unique key for each item
              id={data.id} // Unique identifier for sorting
              symbol={data.symbol} // Cryptocurrency symbol
              name={data.name} // Cryptocurrency name
              image={data.image} // Cryptocurrency image
              price={data.current_price} // Current price of the cryptocurrency
            />
          );
        })}
      </SortableContext>
    </div>
  );
};

export default CryptoData; // Exporting CryptoData component
