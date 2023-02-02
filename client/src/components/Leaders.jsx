import React from 'react'
import ibra from '../assets/ibra pic.jpg'
import hannah from '../assets/Hannah pic.jpg';
import salaton from '../assets/Salaton pic.jpg';
import  pstotula from '../assets/pastorkyusda.jpeg';
import eldersam from '../assets/Eldersam.jpg';
import joshua from '../assets/Joshua pic.jpg';
function Leaders() {
  return (
    <div className="container my-24 px-6 mx-auto">
    <section className="mb-32 text-gray-800 text-center">
      <h2 className="text-5xl font-bold mb-10 text-warning "> 
      <span className="text-indigo-600">Meet the</span>Church Leaders</h2>
      <div className="grid md:grid-cols-4 gap-3">
          <div className="mb-6 lg:mb-0">
          <div className="bg-white block rounded-lg shadow-lg">
            <div className="relative overflow-hidden bg-no-repeat  bg-cover">
              <img src={pstotula} className="w-full rounded-t-lg" alt='pastorOtula' style={{height:'350px',width:'350px'}}/>
              <a href="#!">
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"></div>
              </a>
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                style={{ left: 0, bottom: 0 }}>
                <path fill="#fff"
                  d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
              </svg>
            </div>
            <div className="p-6">
              <h5 className="text-lg font-bold mb-4">Pst Nicanor Otula</h5>
              <p className="text-gray-500 mb-4">Pastor</p>
              <ul className="list-inside flex mx-auto justify-center">
                <a href="https://www.linkedin.com/in/samuel-kamotho-03b04b1a0/" target={'_blank'} className="px-2" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 text-blue-600">
                    <path fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-6 lg:mb-0">
          <div className="bg-white block rounded-lg shadow-lg">
            <div className="relative overflow-hidden bg-no-repeat  h-3/5">
              <img src={eldersam} className="w-full rounded-t-lg" alt='eldersam' style={{height:'350px',width:'350px'}}/>
              <a href="#!">
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"></div>
              </a>
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                style={{ left: 0, bottom: 0 }}>
                <path fill="#fff"
                  d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
              </svg>
            </div>
            <div className="p-6">
              <h5 className="text-lg font-bold mb-4">Elder Samuel Omweri</h5>
              <p className="text-gray-500 mb-4">First Elder</p>
              <ul className="list-inside flex mx-auto justify-center">
                <a href="https://www.linkedin.com/in/kevin-comba-gatimu/" target={'_blank'} className="px-2" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 text-blue-600">
                    <path fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6 lg:mb-0">
          <div className="bg-white block rounded-lg shadow-lg">
            <div className="relative overflow-hidden bg-no-repeat bg-cover">
              <img src={ibra} className="w-full rounded-t-lg" alt='ibra' style={{height:'350px',width:'350px'}}/>
              <a href="#!">
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full  h-full overflow-hidden bg-fixed"></div>
              </a>
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                style={{ left: 0, bottom: 0 }}>
                <path fill="#fff"
                  d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,213.3C672,203,768,213,864,202.7C960,192,1056,160,1152,128C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
              </svg>
            </div>
            <div className="p-6">
              <h5 className="text-lg font-bold mb-4">Elder Ibrahim Kimwecha</h5>
              <p className="text-gray-500 mb-4">Elder</p>
              <ul className="list-inside flex mx-auto justify-center">
                <a href="https://www.linkedin.com/in/charity-jelimo-66b128220" target={'_blank'} className="px-2" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 text-blue-600">
                    <path fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6 lg:mb-0">
          <div className="bg-white block rounded-lg shadow-lg">
            <div className="relative overflow-hidden bg-no-repeat  bg-cover">
              <img src={hannah} className="w-full rounded-t-lg" alt='hannah' style={{height:'350px',width:'350px'}}/>
              <a href="#!">
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"></div>
              </a>
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                style={{ left: 0, bottom: 0 }}>
                <path fill="#fff"
                  d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,213.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
              </svg>
            </div>
            <div className="p-6">
              <h5 className="text-lg font-bold mb-4">Hannah  Njoki</h5>
              <p className="text-gray-500 mb-4">ALO Leader</p>
              <ul className="list-inside flex mx-auto justify-center">
                <a href="https://www.linkedin.com/in/denis-wachira/" target={'_blank'} className="px-2" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 text-blue-600">
                    <path fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-6 lg:mb-0">
          <div className="bg-white block rounded-lg shadow-lg">
            <div className="relative overflow-hidden bg-no-repeat  bg-cover">
              <img src={joshua} className="w-full rounded-t-lg" alt='joshua' style={{height:'350px',width:'350px'}}/>
              <a href="#!">
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"></div>
              </a>
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                style={{ left: 0, bottom: 0 }}>
                <path fill="#fff"
                  d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,213.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
              </svg>
            </div>
            <div className="p-6">
              <h5 className="text-lg font-bold mb-4">Joshua Hamisi</h5>
              <p className="text-gray-500 mb-4">Elder</p>
              <ul className="list-inside flex mx-auto justify-center">
                <a href="https://www.linkedin.com/in/denis-wachira/" target={'_blank'} className="px-2" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 text-blue-600">
                    <path fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-6 lg:mb-0">
          <div className="bg-white block rounded-lg shadow-lg">
            <div className="relative overflow-hidden bg-no-repeat  bg-cover">
              <img src={salaton} className="w-full rounded-t-lg" alt='salaton' style={{height:'350px',width:'350px'}}/>
              <a href="#!">
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"></div>
              </a>
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
                style={{ left: 0, bottom: 0 }}>
                <path fill="#fff"
                  d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,213.3C672,203,768,117,864,85.3C960,53,1056,75,1152,69.3C1248,64,1344,32,1392,16L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                </path>
              </svg>
            </div>
            <div className="p-6">
              <h5 className="text-lg font-bold mb-4">Christopher  Salaton</h5>
              <p className="text-gray-500 mb-4">Elder</p>
              <ul className="list-inside flex mx-auto justify-center">
                <a href="https://www.linkedin.com/in/denis-wachira/" target={'_blank'} className="px-2" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 text-blue-600">
                    <path fill="currentColor"
                      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

export default Leaders