import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [error,setError]=useState('')
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setPrediction(''); // Clear prediction on file change
        setError(''); 
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if(!selectedFile){
            alert("please select a file")
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(formData);
        try {
            console.log("sending to flask server")
            const response = await axios.post('http://localhost:2000/predict',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Cache-Control':'no-cache',
                }
            });
            console.log("received : ",response.data.prediction);
            {console.log("prediction received")}
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Error uploading the image, please try again.');

            if (error.response) {
                console.error('Error response:', error.response.data);
                setError(error.response.data.error || 'An error occurred.');
            }
        }
    };

    return (
        <div>
            
            <input type="file" name="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload and Predict</button>
            
            {<p>Prediction: {prediction}</p>} 
            {error && <p style={{color:'red'}}>Error: {error}</p>} 
            {/* //prediction &&  */}
            
        </div>
    );
};

export default ImageUpload;
