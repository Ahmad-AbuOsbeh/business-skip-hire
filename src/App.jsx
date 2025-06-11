import React from 'react';
import StatusBar from './components/StatusBar/StatusBar';
import SkipSelector from './components/SkipSelector/SkipSelector';
import './index.css';

function App() {
  const currentStepIndex = 2;

  return (
    <div className="container">
      <StatusBar currentStepIndex={currentStepIndex} />
      <SkipSelector />
    </div>
  );
}

export default App;