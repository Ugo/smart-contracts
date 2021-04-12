import Web3 from 'web3';
import Escrow from './contracts/Escrow.json';

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://localhost:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });
};

const getEscrow = async web3 => {
  const networkId = await web3.eth.net.getId();
  const contractDeployment = Escrow.networks[networkId];

  return new web3.eth.Contract(
    Escrow.abi, contractDeployment && contractDeployment.address
  );
};

export { getWeb3, getEscrow }
