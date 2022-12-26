import { useState } from 'react';
import axios from 'axios'

import PlainHeader from './PlainHeader'

function FileUploadSingle() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    //   console.log(file)
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();

	formData.append('auctionImage', file);
    // formData.append('fileName',file.name)
    console.log(file.type)
    // 👇 Uploading the file using the fetch API to the server

    axios.post(
        "http://localhost:4000/addAuctionPhoto?auction_id=21",
        formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        }
      );
    }

  return (
    <div>

      <PlainHeader/>  

      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}

export default FileUploadSingle;