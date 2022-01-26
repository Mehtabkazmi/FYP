import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App1 = () => {
  
  const commands= [
    {
      command: 'reset',
      callback:({resetTranscript})=>resetTranscript()
    },
    {
      command: 'open *',
      callback: (site)=>{
        window.open('http://' + site);
      }
    },
  ]
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({commands});

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening({continuous:true})}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default App1;