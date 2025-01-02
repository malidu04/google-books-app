import React, { useState } from "react";
import Modal from "./Modal";

const Card = ({ book }) => {
  const [show, setShow] = useState(false);
  const [bookItem, setItem] = useState(null);

  return (
    <>
      <div className="card-container">
        {book.map((item, index) => {
          const thumbnail = item.volumeInfo.imageLinks?.smallThumbnail;
          const amount = item.saleInfo.listPrice?.amount;

          // Only render cards with valid thumbnail and amount
          if (thumbnail && amount) {
            return (
              <div
                className="card"
                key={index} // Use a unique key for each item
                onClick={() => {
                  setShow(true);
                  setItem(item);
                }}
              >
                <img src={thumbnail} alt="Book Thumbnail" />
                <div className="bottom">
                  <h3 className="title">{item.volumeInfo.title}</h3>
                  <p className="amount">&#8377;{amount}</p>
                </div>
              </div>
            );
          }

          return null; // Explicitly return null for invalid items
        })}
      </div>

      {/* Modal is rendered once and controlled via state */}
      {show && <Modal show={show} item={bookItem} onClose={() => setShow(false)} />}
    </>
  );
};

export default Card;
