import { useSortable } from "@dnd-kit/sortable"; // Importing useSortable hook for drag-and-drop functionality
import styles from "./CryptoList.module.css"; // Importing CSS module for styling
import { CSS } from "@dnd-kit/utilities"; // Importing utilities for handling CSS transformations

const CryptoList = ({ id, symbol, name, image, price }) => {
  // useSortable hook for drag-and-drop feature
  let { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id }); // Initializing sortable functionality with the unique id

  // Set style for the drag-and-drop transformation
  const style = {
    transition, // Adding smooth transition effect
    transform: CSS.Transform.toString(transform), // Converting transform object to CSS string
  };

  return (
    <div
      className={styles.cryptoCard} // Applying styles for the crypto card
      {...attributes} // Spread attributes for accessibility and behavior
      {...listeners} // Spread listeners for drag-and-drop actions
      ref={setNodeRef} // Setting reference for drag-and-drop handling
      style={style} // Applying the calculated style
    >
      {/* Assigning values to each crypto card */}
      <img src={image} alt={name} /> {/* Displaying cryptocurrency image */}
      <h2>{name}</h2> {/* Displaying cryptocurrency name */}
      <h3>{symbol}</h3> {/* Displaying cryptocurrency symbol */}
      <h3>$ {price}</h3> {/* Displaying cryptocurrency price */}
    </div>
  );
};

export default CryptoList; // Exporting CryptoList component
