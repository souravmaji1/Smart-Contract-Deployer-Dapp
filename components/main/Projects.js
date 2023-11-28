import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [smartContractSource, setSmartContractSource] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [contractName, setContractName] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyContract = async () => {
    try {
      setLoading(true);

      // Verify the smart contract on PolygonScan
      const verifyResponse = await axios.post('https://api.polygonscan.com/api', {
        apikey: 'YOUR_POLYGONSCAN_API_KEY',
        module: 'contract',
        action: 'verifysourcecode',
        sourceCode: smartContractSource,
        contractaddress: contractAddress,
        codeformat: 'solidity-single-file',
        contractname: contractName, // Use the provided contract name
        compilerversion: 'v0.7.6+commit.7338295f', // Replace with your compiler version
        optimizationused: 1, // Replace with 0 or 1 based on your optimization
        runs: 200, // Replace with the number of runs if optimization was used
        // Add other parameters as needed
      });

      console.log('Verification response:', verifyResponse.data);

      // Display verification status to users
      setVerificationStatus('Smart contract verification request submitted. Check the status on PolygonScan.');

    } catch (error) {
      console.error('Error verifying contract:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '20px', color: 'white', fontWeight: 'medium', marginTop: '10px', marginBottom: '15px' }}>
          Contract Address:
        </p>
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="Enter the contract address..."
          style={{
            width: '100%',
            background: 'white',
            border: '2px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '20px', color: 'white', fontWeight: 'medium', marginTop: '10px', marginBottom: '15px' }}>
          Contract Name:
        </p>
        <input
          type="text"
          value={contractName}
          onChange={(e) => setContractName(e.target.value)}
          placeholder="Enter the contract name..."
          style={{
            width: '100%',
            background: 'white',
            border: '2px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '20px', color: 'white', fontWeight: 'medium', marginTop: '10px', marginBottom: '15px' }}>
          Smart Contract Source Code:
        </p>
        <textarea
          rows="8"
          value={smartContractSource}
          onChange={(e) => setSmartContractSource(e.target.value)}
          placeholder="Enter your smart contract source code here..."
          style={{
            width: '100%',
            background: 'white',
            border: '2px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
          }}
        />
      </div>

      {verificationStatus && (
        <div style={{ marginTop: '1rem', color: 'white' }}>
          <p>{verificationStatus}</p>
        </div>
      )}

      {/* Add a button for users to trigger contract verification */}
      <button
        onClick={verifyContract}
        style={{
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '16px',
          width: '100%',
          background: '#4109af',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: '1rem',
        }}
        disabled={loading || !contractAddress || !contractName || !smartContractSource}
      >
        {loading ? 'Verifying...' : 'Verify Contract on PolygonScan'}
      </button>
    </div>
  );
}
