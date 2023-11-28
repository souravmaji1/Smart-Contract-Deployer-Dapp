'use client'
import React from 'react';

const Box = ({ headline, description, link }) => (
  <div
    style={{
      flex: '0 0 30%',
      padding: '20px',
      margin: '10px',
      border: '2px solid #7042f88b',
      borderRadius: '8px',
      background: 'linear-gradient(45deg, #2a0e61, #010108)',
      color: 'white',
      textAlign: 'center',
    }}
  >
    <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>{headline}</h2>
    <p>{description}</p>
    <button
      style={{
        marginTop: '10px',
        padding: '8px 16px',
        backgroundColor: '#7042f8',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      onClick={() => window.location.href = link}
    >
      Source Code
    </button>
  </div>
);

const AnotherPage = () => {
  return (
    <div className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]" style={{ marginBottom: '90px', marginTop: '230px' }}>
      <h1 style={{ fontSize: '55px', fontWeight: 'bold', marginBottom: '539px', position: 'absolute' }}
        className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[900px] w-auto h-auto"
      >
        <span>
          All Listed
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "}
            Smart Contracts{" "}
          </span>
        </span>
      </h1>
      <div className="flex flex-wrap justify-center">
        <Box
          headline="NFT Marketplace"
          description="NFT Bulk mint and sell, Auction, Buy, View Functions Available"
          link="https://gist.github.com/souravnmaji/5a9d269e3664a94bd0047124a6eb1414" // Specify the actual link here
        />
        <Box
          headline="Ens Domain Selling"
          description="Register and own any ens domain, pay yearly fees etc Available"
          link="https://gist.github.com/souravnmaji/494fad8591c763c40fc767dab395976a" // Specify the actual link here
        />
         <Box
          headline="Airbnb Web3"
          description="List for Rent , Upload any Listing, Buy any Listing etc Available"
          link="https://gist.github.com/souravnmaji/0533ff7e32c2451c9ff0219da155d945" // Specify the actual link here
        />
        <Box
          headline="Betting Contract"
          description="Description for Box 2. Add details about this box."
          link="/ens-domain-selling" // Specify the actual link here
        />
         <Box
          headline="Insurance Web3"
          description="Description for Box 1. Add details about this box."
          link="https://gist.github.com/souravnmaji/a6a5eaae3fb9d933d3fcefd3ea63814d" // Specify the actual link here
        />
        <Box
          headline="Ens Domain Selling"
          description="Description for Box 2. Add details about this box."
          link="/ens-domain-selling" // Specify the actual link here
        />
        {/* Add similar link prop for other boxes */}
      </div>
    </div>
  );
};

export default AnotherPage;
