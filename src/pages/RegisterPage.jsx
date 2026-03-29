import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faIdBadge, faPhone, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import "./RegisterPage.css";
import LoadingOverlay from "../components/Loading/LoadingOverlay";

const RegisterPage = () => {
  const API_ENDPOINT_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserDataContext);
  const EmailFromLS = localStorage.getItem("email");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || EmailFromLS || "",
    roll: "",
    phone: "",
    department: "",
    gender: "",
    year: "",
    domain: [],
    questions_answers: {},
    questions_answers2: {},
  });
  const [steperrors, setStepErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const questions = [
    "What motivates you to join SAE?",
    "Enter Your Club preferences.",
  ];

  const departmentOptions = [
    { value: "BT",     label: "BT" },
    { value: "CSE",    label: "CSE" },
    { value: "CE",     label: "CE" },
    { value: "CHE",    label: "CHE" },
    { value: "ECE",    label: "ECE" },
    { value: "EE",     label: "EE" },
    { value: "ME",     label: "ME" },
    { value: "MME",    label: "MME" },
    { value: "MnC",    label: "MnC" },
    { value: "Others", label: "Others" },
  ];

  const genderOptions = [
    { value: "Male",   label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const yearOptions = [
    { value: "First",  label: "1st Year" },
    { value: "Second", label: "2nd Year" },
  ];

  const domainOptionsByYear = {
    First: [
      { value: "Automobiles", label: "Automobiles" },
      { value: "Robotics", label: "Robotics" },
      { value: "Event Management", label: "Event Management" },
      { value: "Web Development", label: "Web Development" },
      { value: "GFX & VFX & Photography ,", label: "GFX & VFX & Photography" },
    ],
    Second: [
      { value: "Automobiles", label: "Automobiles" },
      { value: "Robotics", label: "Robotics" },
      { value: "Event Management", label: "Event Management" },
      { value: "Web Development", label: "Web Development" },
      { value: "GFX & VFX & Photography ,", label: "GFX & VFX & Photography" },
    ],
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.roll) newErrors.roll = "Roll number is required.";
    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.gender) newErrors.gender = "Gender selection is required.";
    if (!formData.year) newErrors.year = "Year selection is required.";
    if (!formData.domain.length) newErrors.domain = "At least one domain is required.";
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    questions.forEach((question) => {
      if (!formData.questions_answers[question] || formData.questions_answers[question].trim() === "") {
        newErrors[question] = "This answer is required.";
      }
    });
    return newErrors;
  };

  const nextStep = () => {
    let newErrors = {};
    if (step === 1) newErrors = validateStep1();
    if (step === 2) newErrors = validateStep2();

    if (Object.keys(newErrors).length > 0) {
      setStepErrors(newErrors);
    } else {
      setStepErrors({});
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, gender: selectedOption ? selectedOption.value : "" }));
  };

  const handleDepartmentChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, department: selectedOption ? selectedOption.value : "" }));
  };

  const handleYearChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      year: selectedOption ? selectedOption.value : "",
      domain: [],
    }));
  };

  const getDomainOptions = () => {
    return formData.year ? domainOptionsByYear[formData.year] : [];
  };

  const handleDomainChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({ ...prev, domain: selectedValues }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email } = formData;

    // ✅ STEP 3 FIX: remove unwanted field
    const { questions_answers2, ...cleanData } = formData;

    const audition_url = API_ENDPOINT_URL + "api/auditionform/";
    const scriptURL = import.meta.env.VITE_SCRIPT_URL;
    const send_email_url = API_ENDPOINT_URL + "api/send-email-to-user/";

    try {
      console.log("DATA BEING SENT:", cleanData); // ✅ debug

      // 1. Submit to Django backend
      const response = await axios.post(audition_url, cleanData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {

        // 2. Send to Google Sheet (optional)
        try {
          const sheetData = {
            name:               formData.name       || "",
            email:              formData.email      || "",
            roll:               formData.roll       || "",
            phone:              formData.phone      || "",
            department:         formData.department || "",
            gender:             formData.gender     || "",
            year:               formData.year       || "",
            domain: Array.isArray(formData.domain)
              ? formData.domain.join(", ")
              : formData.domain || "",
            questions_answers:  JSON.stringify(formData.questions_answers || {}),
            questions_answers2: JSON.stringify(formData.questions_answers2 || {}),
          };

          await fetch(scriptURL, {
            method: "POST",
            body: new URLSearchParams(sheetData),
          });
        } catch (sheetErr) {
          console.log("Google Sheet failed:", sheetErr);
        }

        // 3. Send confirmation email
        try {
          await fetch(send_email_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
        } catch (emailErr) {
          console.log("Email failed:", emailErr);
        }

        navigate("/formSubmitted");
      }

    } catch (err) {
      console.error("Main submission error:", err);

      // ✅ SHOW REAL BACKEND ERROR
      console.log("Backend error:", err.response?.data);

      setError(
        err.response?.data?.email?.[0] ||
        err.response?.data?.roll?.[0] ||
        err.response?.data?.error ||
        "You have already submitted the form."
      );
    } finally {
      setLoading(false);
    }
  };

  switch (step) {
    case 1:
      return (
        <div className="formroot">
          <div className="fcontainer">
            <div className="formcontainer">
              <form>
                <h1 style={{ color: "#fff" }}>
                  <span style={{ color: "red" }}>Audition</span> Form
                </h1>
                <div style={{ position: "relative" }} className="userinput">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#fff" }}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{ paddingLeft: "35px" }}
                  />
                </div>
                <div style={{ position: "relative" }} className="userinput">
                  <FontAwesomeIcon
                    icon={faIdBadge}
                    style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#fff" }}
                  />
                  <input
                    type="text"
                    name="roll"
                    placeholder="Enter Your Roll No."
                    value={formData.roll}
                    onChange={handleInputChange}
                    required
                    style={{ paddingLeft: "35px" }}
                  />
                </div>
                <div style={{ position: "relative" }} className="userinput">
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#fff" }}
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Your Phone No."
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{ paddingLeft: "35px" }}
                  />
                </div>
                <Select
                  className="departmentoption"
                  options={departmentOptions}
                  onChange={handleDepartmentChange}
                  placeholder="Select Department"
                />
                <Select
                  className="genderoption"
                  options={genderOptions}
                  onChange={handleGenderChange}
                  placeholder="Select Gender"
                />
                <Select
                  className="yearoption"
                  options={yearOptions}
                  onChange={handleYearChange}
                  placeholder="Select Year"
                />
                <Select
                  className="domainoption"
                  options={getDomainOptions()}
                  isMulti
                  onChange={handleDomainChange}
                  value={getDomainOptions().filter((option) =>
                    formData.domain.includes(option.value)
                  )}
                  placeholder="Select Domains"
                />
              </form>
              <div className="fbtn">
                <button type="button" onClick={nextStep}>Next</button>
                {Object.values(steperrors).length > 0 && (
                  <p style={{ color: "red" }}>{Object.values(steperrors)}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="qmain">
          <div className="qcontainer">
            <div className="qcontain">
              {questions.map((question, index) => (
                <div key={index} className="question-block">
                  <div className="ques">
                    <h1>{question}</h1>
                  </div>
                  <textarea
                    name={`question_${index}`}
                    placeholder="Enter Your Answer..."
                    value={formData.questions_answers[question] || ""}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        questions_answers: {
                          ...prevData.questions_answers,
                          [question]: e.target.value,
                        },
                      }))
                    }
                  ></textarea>
                </div>
              ))}
            </div>
            <div className="button-container">
              <button type="button" onClick={prevStep} className="btn">Back</button>
              <button type="button" onClick={nextStep} className="btn">Next</button>
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="formreview">
          {loading && <LoadingOverlay />}
          <form className="finalview">
            <div className="details">
              <h2>
                <span style={{ textTransform: "uppercase", color: "red" }}>Final Step</span> : Review Details
              </h2>
              <p style={{ textTransform: "uppercase" }}><strong>Name  :  </strong>{formData.name}</p>
              <p><strong>Email  :  </strong>{formData.email}</p>
              <p><strong>Roll  :  </strong>{formData.roll}</p>
              <p><strong>Phone  :  </strong>{formData.phone}</p>
              <p><strong>Department  :  </strong>{formData.department}</p>
              <p><strong>Year  :  </strong>{formData.year}</p>
              <p><strong>Domain  :  </strong>{formData.domain}</p>
            </div>
            <div className="button-container">
              <button type="button" onClick={prevStep} className="btn">Back</button>
              <button type="submit" onClick={handleSubmit} className="btn">Submit</button>
            </div>
          </form>
          {successMessage && <p style={{ color: "#fff" }}>{successMessage}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      );

    default:
      return <h2>Invalid Step</h2>;
  }
};

export default RegisterPage;