const express = require('express');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
const solc = require('solc');
const cors = require('cors');


const app = express();
const port = 5000;
app.use(cors());


app.use(bodyParser.json());



const providerTestnet = new ethers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/y-tHEEOpcVyKsSW3AH1HLHHn97E8F0bw');
const providerGoerli = new ethers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/9opda0G1Yts3YkDAKMNNKhdmmNvKhLWI');
const providerSepholi = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/Zxso-MefVcYftbdS3VaKaRAFo9qTOC6R');



async function compileAndDeploySmartContract(smartContractSource, privateKey, network) {
  let provider;

  switch (network) {
    case 'sepholia':
      provider = providerSepholi;
      break; 
    case 'mumbai':
      provider = providerTestnet;
      break;
    case 'goerli':
      provider = providerGoerli;
      break;
    default:
      throw new Error('Invalid network');
  }

  const wallet = new ethers.Wallet(privateKey, provider);

  // Compile the smart contract source code
  const input = {
    language: 'Solidity',
    sources: {
      'SmartContract.sol': {
        content: smartContractSource,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode'],
        },
      },
    },
  };

  // Check for errors during compilation
  const output = JSON.parse(solc.compile(JSON.stringify(input)));

  if (output.errors) {
    console.error('Compilation Errors:', output.errors);
    throw new Error('Smart contract compilation failed. Check the console for details.');
  }

  // Find the contract data in the output
  const contractInfo = Object.values(output.contracts['SmartContract.sol'])[0];
  const contractABI = contractInfo.abi;
  const contractBytecode = contractInfo.evm.bytecode.object;

  // Deploy the smart contract
  const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

  // Check if the smart contract has constructor arguments
  const constructorArgs = contractInfo.evm.deployedBytecode?.sourceMap
    ? ethers.utils.defaultAbiCoder.decode(
        contractInfo.abi.filter((item) => item.type === 'constructor')[0].inputs,
        ethers.utils.hexDataSlice(
          contractInfo.evm.deployedBytecode.object,
          contractInfo.evm.deployedBytecode.object.length - 4
        )
      )
    : [];

  const deployTransaction = await (constructorArgs.length
    ? contractFactory.getDeployTransaction(...constructorArgs)
    : contractFactory.getDeployTransaction());

  const deployedContractTransaction = await wallet.sendTransaction(deployTransaction);

  // Wait for the transaction to be mined
  const transactionReceipt = await deployedContractTransaction.wait();

  // Extract the contract address from the transaction receipt
  const contractAddress = transactionReceipt.contractAddress;

  console.log('Smart contract deployed successfully. Contract address:', contractAddress);

  return {
    message: 'Smart contract deployed successfully',
    contractAddress: contractAddress,
  };
}

app.post('/deploy', async (req, res) => {
  try {
    const { smartContractSource, privateKey, network } = req.body;

    if (!smartContractSource || !privateKey || !network) {
      return res.status(400).json({ error: 'Smart contract source code, private key, and network are required.' });
    }

    const deployedContractAddress = await compileAndDeploySmartContract(
      smartContractSource,
      privateKey,
      network.toLowerCase()
    );

    res.status(200).json({
      message: 'Smart contract deployed successfully',
      deployedContractAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
