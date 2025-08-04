import React, { useState, useRef, useEffect } from 'react';

const VoiceRecorder = ({ onTranscriptChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    // Check if browser supports necessary APIs
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
      console.error('getUserMedia not supported');
    }
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionStatus('granted');
      return stream;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setPermissionStatus('denied');
      alert('Microphone access is required for voice recording. Please allow microphone access and try again.');
      return null;
    }
  };

  const startRecording = async () => {
    if (!isSupported) {
      alert('Voice recording is not supported in your browser');
      return;
    }

    try {
      const stream = await requestMicrophonePermission();
      if (!stream) return;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        // Here you would typically send the audio to a speech-to-text service
        // For now, we'll just simulate a transcript
        const simulatedTranscript = "This is a simulated transcript. In a real app, you'd send the audio to a speech-to-text service.";
        setTranscript(simulatedTranscript);
        if (onTranscriptChange) {
          onTranscriptChange(simulatedTranscript);
        }
        
        // Stop all tracks to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Failed to start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRecordClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    if (onTranscriptChange) {
      onTranscriptChange('');
    }
  };

  if (!isSupported) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>Voice recording is not supported in your browser.</p>
        <p>Please use a modern browser like Chrome, Firefox, or Safari.</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3>Voice Response</h3>
        {transcript && (
          <button 
            onClick={clearTranscript}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Clear
          </button>
        )}
      </div>

      <textarea
        value={transcript}
        onChange={(e) => {
          setTranscript(e.target.value);
          if (onTranscriptChange) {
            onTranscriptChange(e.target.value);
          }
        }}
        placeholder="Your speech will appear here..."
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          fontSize: '16px',
          fontFamily: 'inherit',
          resize: 'vertical',
          marginBottom: '20px'
        }}
      />

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleRecordClick}
          disabled={permissionStatus === 'denied'}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: 'none',
            background: isRecording ? '#ff4444' : '#4285f4',
            color: 'white',
            fontSize: '32px',
            cursor: permissionStatus === 'denied' ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            transition: 'all 0.3s ease',
            opacity: permissionStatus === 'denied' ? 0.5 : 1
          }}
          onMouseOver={(e) => {
            if (permissionStatus !== 'denied') {
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isRecording ? '⏹️' : '🎤'}
        </button>
        
        <p style={{ marginTop: '15px', color: '#666' }}>
          {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
        </p>
        
        {permissionStatus === 'denied' && (
          <p style={{ color: '#ff4444', fontSize: '14px', marginTop: '10px' }}>
            Microphone access denied. Please refresh and allow microphone access.
          </p>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;