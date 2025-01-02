import React from 'react';

const Modal = ({ show, item, onClose }) => {
  // Return null if show is false (do not render the modal)
  if (!show) {
    return null;
  }

  // Use optional chaining to safely access properties
  let thumbnail = item?.volumeInfo?.imageLinks?.smallThumbnail;

  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}>
            <i className="fas fa-times"></i> {/* Corrected className */}
          </button>
          <div className="inner-box">
            <img src={thumbnail} alt={item?.volumeInfo?.title} />
            <div className="info">
              <h1>{item?.volumeInfo?.title}</h1>
              <h3>{item?.volumeInfo?.authors?.join(', ')}</h3>
              <h4>
                {item?.volumeInfo?.publisher}
                <span>{item?.volumeInfo?.publishedDate}</span>
              </h4>
              <br />
              <a href={item?.volumeInfo?.previewLink}>
                <button>More</button>
              </a>
            </div>
          </div>
          <h4 className="description">{item?.volumeInfo?.description}</h4>
        </div>
      </div>
    </>
  );
};

export default Modal;
