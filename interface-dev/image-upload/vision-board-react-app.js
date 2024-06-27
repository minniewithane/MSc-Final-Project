import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const VisionBoardUploader = () => {
  const [images, setImages] = useState({
    Love: null,
    Work: null,
    Play: null,
    Health: null
  });
  const [currentSection, setCurrentSection] = useState('Love');
  const fileInputRef = useRef(null);

  const sections = ['Love', 'Work', 'Play', 'Health'];

  const sectionPrompts = {
    Love: "How do you envision your ideal relationships and connections? What qualities do you want to cultivate in your personal life? What images represent the love and compassion you aspire to give and receive?",
    Work: "What does your ideal career look like? How do you see yourself growing professionally? What visuals represent your ambitions, achievements, and the impact you want to make in your field?",
    Play: "How do you imagine your perfect leisure time? What hobbies or activities bring you joy and relaxation? What images capture the sense of fun, creativity, and adventure you want in your life?",
    Health: "How do you envision your optimal physical and mental well-being? What lifestyle habits and self-care practices do you want to cultivate? What visuals represent the vitality, energy, and balance you desire in your health?"
  };

  useEffect(() => {
    // Fetch existing images when the component mounts
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/api/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('section', currentSection);

      try {
        await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // Refresh images after successful upload
        fetchImages();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleNext = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">LAIfe-D</h1>
      <div className="flex gap-4">
        <div className="w-1/2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Upload Images</h2>
            <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="block text-sm text-gray-500">Upload Photo</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button onClick={handleUploadClick} className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Upload Photo
            </button>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">UPLOAD YOUR VISION ABOUT {currentSection.toUpperCase()}</h3>
            <p className="text-sm text-gray-600">
              {sectionPrompts[currentSection]}
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Your Vision Board</h2>
            <div className="grid grid-cols-2 gap-2">
              {sections.map((section) => (
                <div key={section} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {images[section] ? (
                    <img src={images[section]} alt={section} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">{section}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <button 
              onClick={handleBack} 
              disabled={sections.indexOf(currentSection) === 0} 
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Back
            </button>
            <button 
              onClick={handleNext} 
              disabled={sections.indexOf(currentSection) === sections.length - 1} 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionBoardUploader;
