import React, { createContext, useEffect, useState } from 'react';
import Web3 from 'web3';

import contractData from '../contracts/contract-data.json';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [network, setNetwork] = useState('');

  const PatientContractAddress = contractData.patientRegistration.address;
  const DoctorContractAddress = contractData.doctorRegistration.address;
  const DiagnosisContractAddress = contractData.diagnosisRegistration.address;

  const Patient_ABI = contractData.patientRegistration.abi;
  const Doctor_ABI = contractData.doctorRegistration.abi;
  const Diagnosis_ABI = contractData.diagnosisRegistration.abi;

  const Ganache_Address = import.meta.env.VITE_GANACHE_URL || 'http://127.0.0.1:7545';

  useEffect(() => {
    const loadWeb3 = async () => {
      try {
        const provider = new Web3.providers.HttpProvider(Ganache_Address);
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);

        // Get network ID
        const networkId = await web3Instance.eth.net.getId();
        setNetwork(networkId);

        // Set account manually if you're using Ganache's pre-funded accounts
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          console.warn('No accounts found.');
        }

        // Initialize contracts
        const patientContract = new web3Instance.eth.Contract(Patient_ABI, PatientContractAddress);
        const doctorContract = new web3Instance.eth.Contract(Doctor_ABI, DoctorContractAddress);
        const diagnosisContract = new web3Instance.eth.Contract(Diagnosis_ABI, DiagnosisContractAddress);

        setContract({ patient: patientContract, doctor: doctorContract, diagnosis: diagnosisContract });

      } catch (error) {
        console.error('Error loading Web3:', error);
      }
    };

    loadWeb3();
  }, [PatientContractAddress, DoctorContractAddress, DiagnosisContractAddress, Ganache_Address]);

  return (
    <Web3Context.Provider value={{ web3, account, contract, network }}>
      {children}
    </Web3Context.Provider>
  );
};
