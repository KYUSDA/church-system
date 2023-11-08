import WSPGallery from "./Gallery.jsx";
import image1 from "../../assets/Adventist melody.JPG";
import image2 from "../../assets/Alo.JPG";
import image3 from "../../assets/communication.JPG";
import image4 from "../../assets/kyusdachurch.jpg";
import image5 from "../../assets/masterguide.JPG";
import image6 from "../../assets/pastorkyusda.jpeg";
import image7 from "../../assets/FootWashing.JPG";
import image8 from "../../assets/mission4.jpeg";
import image9 from "../../assets/member6.jpeg";
import image10 from "../../assets/member7.jpeg";
import image11 from "../../assets/kyusda pic.JPG";
import image12 from "../../assets/gachia team.JPG";
import image13 from "../../assets/music 2.JPG";
import image14 from "../../assets/chris.JPG";
import image15 from "../../assets/marionteam.JPG";
import image16 from "../../assets/alo2.JPG";
import image17 from "../../assets/Aloamo.JPG";
import image18 from "../../assets/Gordonteam.JPG";
import image19 from "../../assets/vickyteam.JPG";
// import './App.css';

function Kyusda() {
  const galleryImages = [
    {
      img: image1,
    },
    {
      img: image2,
    },
    {
      img: image3,
    },
    {
      img: image4,
    },
    {
      img: image5,
    },
    {
      img: image13,
    },
    {
      img: image7,
    },
    {
      img: image8,
    },
    {
      img: image9,
    },
    {
      img: image10,
    },
    {
      img: image11,
    },
    {
      img: image12,
    },
    {
      img: image6,
    },
    {
      img: image14,
    },
    {
      img: image15,
    },
    {
      img: image16,
    },
    {
      img: image17,
    },
    {
      img: image18,
    },
    {
      img: image19,
    },
  ];

  return (
    <div className="App" style={{ margin: "150px auto" }}>
      <br />
      <div>
        <p style={{ textAlign: "center" }}>KYUSDA GALLERY</p>
      </div>
      <br />
      <br />
      <WSPGallery galleryImages={galleryImages} />

      <br />
      <br />
      <div></div>
    </div>
  );
}

export default Kyusda;
