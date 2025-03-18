
import { motion } from 'framer-motion';
import "./imageGallery.scss";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <motion.div className='carousel'>
      <motion.div
        drag='x'
        dragConstraints={{ right: 0 }}
        className="innerCarousel">
        {images.map(image => {
          return (
            <motion.div className="item" key={image}>
              <img src={image} alt={""} />
            </motion.div>)
        })}
      </motion.div>
    </motion.div>
  )
}

export default ImageGallery