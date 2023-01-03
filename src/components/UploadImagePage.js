import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'

import PlainHeader from './PlainHeader'
import HeaderLinks from './HeaderLinks'


function FileUploadSingle() {

  const location = useLocation()
  const navigate = useNavigate()
  // console.log('Inside fileupload codeblack', location.state.auction_id)

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
        "http://localhost:4000/addAuctionPhoto?auction_id="+location.state.auction_id,    // post image file to correct auction 
        formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            }
        }
      ).then(response => {
        console.log(response.data);
        // console.log('The auction ID is '+ response.data[2])
  
        const redirectPath = location.state?.path || '/Profile'  //define where to navigate to after image upload
        navigate(redirectPath, {replace: true}) 
      
      })   
    }

  return (
    <>
      <HeaderLinks linkName='Home' linkTo='/'/>
      <PlainHeader/>  

      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </>
  );
}

export default FileUploadSingle;