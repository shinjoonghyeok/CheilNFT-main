import { useState } from 'react';
import '../assets/style/Style.css'
import plus from '../assets/style/icons/img11.jpg'

function MyPage({ setimg }) {
  const [imageSrc, setImageSrc] = useState('');

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);

        resolve();
      };
    });
  };

  return (
    <div>
      <main >
        <div className='IconPosition'>
          <label for="aa" >
            <img src={plus} className='IconPosition2' />
          </label>
          <input type="file" id="aa" style={{ display: "none" }} onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            setimg(e.target.files[0]);
          }} />
          {imageSrc && <img src={imageSrc} className="container2" alt="preview-img" />}
        </div>
      </main>
    </div>
  );
}

export default MyPage;