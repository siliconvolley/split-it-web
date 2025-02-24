import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';

function UploadImage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadedImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImage(file);
      await extractTextWithTesseract(file);
    }
  };

  const extractTextWithTesseract = async (imageFile) => {
    setIsLoading(true);
    const worker = await createWorker('eng');

    try {
      const imageUrl = URL.createObjectURL(imageFile);
      const { data } = await worker.recognize(imageUrl);
      setExtractedText(data.text);
    } catch (error) {
      console.error('❌ OCR Error:', error);
      setExtractedText('Error extracting text ❌');
    } finally {
      await worker.terminate();
      setIsLoading(false);
    }
  };

  return (
    <div className="place-items-center min-h-screen">
      <button 
        className="bg-neutral-800 text-white text-center font-bold px-16 py-3 my-8 rounded-lg"
        onClick={() => document.getElementById('file-upload-input').click()}
      >
        <input 
          id='file-upload-input' 
          type="file" 
          className='hidden' 
          onChange={handleUploadedImage} 
          accept="image/*"
        />
        Upload Image
      </button>

      {uploadedImage && <img src={URL.createObjectURL(uploadedImage)} alt='thumbnail' className='w-[32rem] my-4' />}

      <h1 className='text-2xl font-bold underline mt-8'>Extracted Text:</h1>
      {isLoading ? (
        <p className='my-4 w-[80vw]'>Extracting text... Please wait.</p>
      ) : (
        extractedText && <p className='my-4 w-[90vw]'>{extractedText}</p>
      )}
    </div>
  );
}

export default UploadImage;
