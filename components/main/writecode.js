'use client';
import { useState } from 'react';
import OpenAI from 'openai';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [chatCompletion, setChatCompletion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const openai = new OpenAI({
        apiKey: '',
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `You are a expert smart contract developer and I want you to write smart contract based on this details  ${userInput}` }],
        model: 'gpt-3.5-turbo', // Adjust the model based on your needs
      });

      setChatCompletion(response.choices[0]?.message?.content || 'No result');
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      setChatCompletion('Error fetching result');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
      style={{ marginBottom: '76px',marginTop:"261px" }}
    >
       <h1 style={{ fontSize: '55px', fontWeight: 'bold', marginBottom: '437px',position:'absolute' }}
       className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[900px] w-auto h-auto"
       >
        <span>
            Generate Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              Smart Contract{" "}
            </span>
            
          </span>
      </h1>  
      <div
        style={{
          padding: '2rem',
          maxWidth: '66rem',
          margin: 'auto',
          border: '2px solid #7042f88b',
          borderRadius: '8px',
          width: '-webkit-fill-available',
          background: 'linear-gradient(45deg, #2a0e61, #010108)',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontSize: '20px',
              color: 'white',
              fontWeight: 'medium',
              marginTop: '10px',
              marginBottom: '15px',
            }}
          >
            Write Your Smart Contract Specification:
          </p>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Type your question or message here..."
            style={{
              width: '100%',
              background: 'white',
              border: '2px solid #ccc',
              borderRadius: '4px',
              padding: '8px',
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '16px',
            width: '100%',
            background: '#4109af',
            cursor: 'pointer',
          }}
        >
          Generate
        </button>

        {/* Display the loader while loading */}
        {isLoading && <div style={{ marginTop: '1.5rem', color: 'white' }}>Loading...</div>}

        {/* Display the result */}
        {!isLoading && (
          <div style={{ marginTop: '1.5rem', color: 'white' }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Result:</p>
            <div
              style={{
                background: 'black',
                color: 'white',
                fontFamily: 'monospace',
                fontSize: '14px',
                border: '2px solid #ccc',
                borderRadius: '4px',
                padding: '8px',
                whiteSpace: 'pre-wrap',
                overflowX: 'auto',
              }}
            >
              {chatCompletion}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
