import React, { useState, useRef } from 'react';
import { Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => ({ ...prev, [currentSection]: e.target.result }));
      };
      reader.readAsDataURL(file);
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
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Upload Images</h2>
              <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg">
                <div className="text-center">
                  <Upload size={48} className="mx-auto text-gray-400" />
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
              <Button onClick={handleUploadClick} className="mt-2 w-full">Upload Photo</Button>
            </CardContent>
          </Card>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">UPLOAD YOUR VISION ABOUT {currentSection.toUpperCase()}</h3>
            <p className="text-sm text-gray-600">
              {sectionPrompts[currentSection]}
            </p>
          </div>
        </div>
        <div className="w-1/2">
          <Card>
            <CardContent className="p-4">
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
            </CardContent>
          </Card>
          <div className="flex justify-between mt-2">
            <Button onClick={handleBack} disabled={sections.indexOf(currentSection) === 0} className="w-1/3">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNext} disabled={sections.indexOf(currentSection) === sections.length - 1} className="w-1/3">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionBoardUploader;
