const PatientRegistration = artifacts.require("PatientRegistration");
const DoctorRegistration = artifacts.require("DoctorRegistration");
const DiagnosisRegistration = artifacts.require("DiagnosisRegistration");
const fs = require("fs");
const path = require("path");

module.exports = async function (deployer) {
  await deployer.deploy(PatientRegistration);
  const patientRegistration = await PatientRegistration.deployed();

  await deployer.deploy(DoctorRegistration);
  const doctorRegistration = await DoctorRegistration.deployed();

  await deployer.deploy(DiagnosisRegistration);
  const diagnosisRegistration = await DiagnosisRegistration.deployed();

  const contractData = {
    patientRegistration: {
      address: patientRegistration.address,
      abi: PatientRegistration.abi,
    },
    doctorRegistration: {
      address: doctorRegistration.address,
      abi: DoctorRegistration.abi,
    },
    diagnosisRegistration: {
      address: diagnosisRegistration.address,
      abi: DiagnosisRegistration.abi,
    },
  };

  const dir = path.join(__dirname, "../src/contracts");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(dir, "contract-data.json"),
    JSON.stringify(contractData, null, 2)
  );

  console.log("Contract data saved to src/contracts/contract-data.json");
};
