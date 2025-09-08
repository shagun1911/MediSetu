import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Context } from "../context/Web3Context";
import toast, { Toaster } from "react-hot-toast";

const PatientRegistration = () => {
  const { web3, account, contract, network } = useContext(Web3Context);
  const Navigate = useNavigate();

  const [PatientContract, setPatientContract] = useState(null);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [hhNumberError, sethhNumberError] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [gender, setGender] = useState("");
  const [bg, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (account) setWalletAddress(account);
    if (contract?.patient) setPatientContract(contract.patient);
  }, [account, contract]);

  const handleRegister = async () => {
    if (isLoading) return;
    setIsLoading(true);
    // Validate input fields
    if (
      !name ||
      !dateOfBirth ||
      !homeAddress ||
      !hhNumber ||
      !gender ||
      !bg ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      toast.error(
        "You have missing input fields. Please fill in all the required fields."
      );
      setIsLoading(false);
      return;
    }

    if (!PatientContract) {
      alert("Smart contract not loaded yet. Please wait a moment.");
      return;
    }

    if (hhNumber.length !== 6) {
      alert(
        "You have entered a wrong HH Number. Please enter a 6-digit HH Number."
      );
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setPassword("");
      setConfirmPassword("");
      setPasswordError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPassword("");
      setConfirmPasswordError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    } else {
      setEmailError("");
    }

    try {
      const isRegPatient = await PatientContract.methods
        .isRegisteredPatient(hhNumber)
        .call();

      if (isRegPatient) {
        toast.success("Patient already exists");
        setIsLoading(false);
        Navigate("/login");
        return;
      }

      await PatientContract.methods
        .registerPatient(
          walletAddress,
          name,
          dateOfBirth,
          gender,
          bg,
          homeAddress,
          email,
          hhNumber,
          password
        )
        .send({ from: walletAddress, gas: 4000000 });

      toast.success("Patient registered successfully!");

      // Redirect to login page after successful registration
      Navigate("/login");
    } catch (error) {
      let errorMsg = "An error occurred while registering the patient.";
      if (error && error.message) {
        errorMsg += "\n" + error.message;
      }
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };

  const handlehhNumberChange = (e) => {
    const inputhhNumber = e.target.value;
    const phoneRegex = /^\d{6}$/;
    if (phoneRegex.test(inputhhNumber)) {
      sethhNumber(inputhhNumber);
      sethhNumberError("");
    } else {
      sethhNumber(inputhhNumber);
      sethhNumberError("Please enter a 6-digit HH Number.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-right" reverseOrder={false} />
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          {/* ... (loading spinner remains the same) */}
        </div>
      )}
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl text-teal-400 mb-8 font-extrabold text-center tracking-tight">
          Create Your Patient Account
        </h2>
        <form className="bg-gray-800 p-8 rounded-2xl shadow-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-gray-300" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 p-3 w-full text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-300" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                className="mt-2 p-3 w-full text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-bold text-gray-300" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-2 p-3 w-full text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-300" htmlFor="bg">
                Blood Group
              </label>
              <select
                id="bg"
                name="bg"
                required
                value={bg}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="mt-2 p-3 w-full text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-bold text-gray-300" htmlFor="homeAddress">
              Home Address
            </label>
            <input
              type="text"
              id="homeAddress"
              name="homeAddress"
              placeholder="Enter your Permanent Address"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              className="mt-2 p-3 w-full text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold text-gray-300" htmlFor="hhNumber">
                HH Number
              </label>
              <input
                id="hhNumber"
                name="hhNumber"
                type="text"
                required
                placeholder="Enter your HH Number"
                value={hhNumber}
                onChange={handlehhNumberChange}
                className={`mt-2 p-3 w-full text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 transition ${
                  hhNumberError && "border-red-500"
                }`}
              />
              {hhNumberError && (
                <p className="text-red-500 text-sm mt-1">{hhNumberError}</p>
              )}
            </div>
            <div>
              <label className="block font-bold text-gray-300" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your Email-id"
                value={email}
                onChange={handleEmailChange}
                className={`mt-2 p-3 w-full text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 transition ${
                  emailError && "border-red-500"
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div>
              <label className="block font-bold text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your Password"
                value={password}
                onChange={handlePasswordChange}
                className={`mt-2 p-3 w-full text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 transition ${
                  passwordError && "border-red-500"
                }`}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <div>
              <label className="block font-bold text-gray-300" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm your Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`mt-2 p-3 w-full text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 transition ${
                  confirmPasswordError && "border-red-500"
                }`}
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={handleRegister}
              disabled={!contract || isLoading}
              className="w-full md:w-1/2 px-8 py-3 bg-teal-500 text-white font-bold text-lg rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-teal-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
