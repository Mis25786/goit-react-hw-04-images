import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'components/Modal';

import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ tags, webformatURL, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(({ showModal }) => ({ showModal: !showModal }));
  };

  return (
    <li className={css['ImageGalleryItem']}>
      <img
        src={webformatURL}
        alt={tags}
        className={css['ImageGalleryItem-image']}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal onCloseModal={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
