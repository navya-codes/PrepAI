import React, { useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Play, Pause } from 'lucide-react';

const VoiceRecorder = ({ onTranscript, isListening, onToggleListening }) => {
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript + ' ');
        onTranscript(transcript + finalTranscript + ' ');
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognitionRef.current.start();
  }, [transcript, onTranscript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
    onToggleListening();
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleToggle}
        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-primary-500 hover:bg-primary-600 text-white'
        }`}
      >
        {isListening ? (
          <>
            <MicOff className="h-5 w-5" />
            <span>Stop Recording</span>
          </>
        ) : (
          <>
            <Mic className="h-5 w-5" />
            <span>Start Recording</span>
          </>
        )}
      </button>

      {transcript && (
        <div className="card">
          <h3 className="text-lg font-semibold text-primary-500 mb-2">Current Response:</h3>
          <p className="text-gray-300">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;