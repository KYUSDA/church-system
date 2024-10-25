import images from "./images"
import { AppWrap, MotionWrap } from '../../wrapper';
import { motion } from 'framer-motion';
import "./imageGallery.scss";
function ImageGallery() {
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

export default AppWrap(
  MotionWrap(ImageGallery, ''),
  'gallery',
  'app__primarybg',
);
