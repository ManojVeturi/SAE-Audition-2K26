import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [submittedData, setSubmittedData] = useState([]);
    const [Namequery, setNamequery] = useState('');
    const [Rollquery, setRollquery] = useState('');
    const [Domainquery, setDomainquery] = useState('');
    const [Genderquery, setGenderquery] = useState('');
    const API_ENDPOINT_URL = import.meta.env.VITE_API_URL;

    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) return null;

            const response = await axios.post(`${API_ENDPOINT_URL}api/token/refresh/`, {
                refresh: refreshToken
            });

            if (response.data.access) {
                localStorage.setItem("accessToken", response.data.access);
                return response.data.access;
            }
            return null;
        } catch (error) {
            console.error("Error refreshing token:", error);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            return null;
        }
    };

    const fetchData = async (retried = false) => {
        const currentToken = localStorage.getItem("accessToken");

        try {
            const response = await axios.get(`${API_ENDPOINT_URL}api/auditionform/`, {
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            setSubmittedData(response.data);

        } catch (error) {
            if (error.response && error.response.status === 401 && !retried) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    fetchData(true);
                } else {
                    navigate("/adminLogin");
                }
            } else {
                console.error('Error fetching data:', error);
                if (retried) navigate("/adminLogin");
            }
        }
    };

    useEffect(() => {
        const validateToken = async () => {
            const currentToken = localStorage.getItem("accessToken");

            if (!currentToken) {
                navigate("/adminLogin");
                return;
            }

            try {
                const response = await axios.get(`${API_ENDPOINT_URL}api/validate-token/`, {
                    headers: { Authorization: `Bearer ${currentToken}` },
                });

                if (response.status === 200) {
                    console.log("Token is valid");
                    fetchData();
                }
            } catch (error) {
                console.log("Token validation failed, trying refresh...");
                const newToken = await refreshAccessToken();
                if (newToken) {
                    fetchData();
                } else {
                    navigate("/adminLogin");
                }
            }
        };

        validateToken();
    }, [navigate]);

    const handledelete = async (id) => {
        const currentToken = localStorage.getItem("accessToken");
        try {
            await axios.delete(`${API_ENDPOINT_URL}api/delete/${id}/`, {
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            fetchData();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    await axios.delete(`${API_ENDPOINT_URL}api/delete/${id}/`, {
                        headers: { Authorization: `Bearer ${newToken}` }
                    });
                    fetchData();
                } else {
                    navigate("/adminLogin");
                }
            }
            console.error('Error deleting record:', error);
        }
    };

    const handleNameSearch = async () => {
        const currentToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`${API_ENDPOINT_URL}api/search/`, {
                params: { Namequery },
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            setSubmittedData(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleRollSearch = async () => {
        const currentToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`${API_ENDPOINT_URL}api/search/`, {
                params: { Rollquery },
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            setSubmittedData(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleDomainSearch = async () => {
        const currentToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`${API_ENDPOINT_URL}api/search/`, {
                params: { Domainquery },
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            setSubmittedData(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleGenderSearch = async () => {
        const currentToken = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`${API_ENDPOINT_URL}api/search/`, {
                params: { Genderquery },
                headers: { Authorization: `Bearer ${currentToken}` }
            });
            setSubmittedData(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleSheet = async () => {
        const scriptURL = import.meta.env.VITE_SCRIPT_URL;
        let successCount = 0;
        let failCount = 0;

        for (const entry of submittedData) {
            const sheetData = {
                name:               entry.name       || "",
                email:              entry.email      || "",
                roll:               entry.roll       || "",
                phone:              entry.phone      || "",
                department:         entry.department || "",
                gender:             entry.gender     || "",
                year:               entry.year       || "",
                domain: Array.isArray(entry.domain)
                    ? entry.domain.join(", ")
                    : entry.domain || "",
                questions_answers:  JSON.stringify(entry.questions_answers  || {}),
                questions_answers2: JSON.stringify(entry.questions_answers2 || {}),
            };

            try {
                const response = await fetch(scriptURL, {
                    method: "POST",
                    body: new URLSearchParams(sheetData),
                });
                const text = await response.text();
                console.log("Sheet response for", entry.name, ":", text);
                successCount++;
            } catch (err) {
                console.error("Sheet error for", entry.name, ":", err);
                failCount++;
            }
        }

        if (failCount === 0) {
            alert(`✅ All ${successCount} records sent to sheet successfully!`);
        } else {
            alert(`⚠️ ${successCount} sent, ${failCount} failed. Check console for details.`);
        }
    };

    return (
        <div className='dashboardcontainer'>
            <div className="dashhead">
                <p style={{ color: "#fff" }}>
                    welcome to <span style={{ color: "#1ced31", fontWeight: "bolder" }}>admin</span> panel
                </p>
            </div>

            <button
                onClick={() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    navigate("/adminLogin");
                }}
            >
                Logout
            </button>

            <div className="searchbars">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Filter by name"
                        value={Namequery}
                        onChange={(e) => setNamequery(e.target.value)}
                    />
                    <button onClick={handleNameSearch}>Filter</button>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search by roll no."
                        value={Rollquery}
                        onChange={(e) => setRollquery(e.target.value)}
                    />
                    <button onClick={handleRollSearch}>Search</button>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Filter by domain"
                        value={Domainquery}
                        onChange={(e) => setDomainquery(e.target.value)}
                    />
                    <button onClick={handleDomainSearch}>Filter</button>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Filter by Gender"
                        value={Genderquery}
                        onChange={(e) => setGenderquery(e.target.value)}
                    />
                    <button onClick={handleGenderSearch}>Filter</button>
                </div>
            </div>

            <div className="datacontain">
                <div className="head-btn">
                    <p><span style={{ fontWeight: "bolder" }}>Number of Data :</span> {submittedData.length}</p>
                    <button onClick={handleSheet}>Generate Sheet</button>
                </div>

                {submittedData.length > 0 ? (
                    <div>
                        {submittedData.map((item, index) => (
                            <div className="data" key={item.id || index}>
                                <h3>{index + 1}.</h3>
                                <div className="info">
                                    <p><span style={{ fontWeight: "bolder" }}>Name : </span>{item.name}</p>
                                    <p><span style={{ fontWeight: "bolder" }}>Email : </span>{item.email}</p>
                                    <p><span style={{ fontWeight: "bolder" }}>Roll : </span>{item.roll}</p>
                                    <p><span style={{ fontWeight: "bolder" }}>Gender : </span>{item.gender}</p>
                                    <p><span style={{ fontWeight: "bolder" }}>Department : </span>{item.department}</p>
                                    <p><span style={{ fontWeight: "bolder" }}>Phone : </span>{item.phone}</p>
                                    <p><span style={{ fontWeight: "bolder" }}>Domain : </span>{item.domain}</p>
                                    {Object.entries(item.questions_answers || {}).map(([question, answer], idx) => (
                                        <p key={idx}>
                                            <strong>{idx + 1}. {question} : </strong>{answer}
                                        </p>
                                    ))}
                                    {Object.entries(item.questions_answers2 || {}).map(([question, answer], idx) => (
                                        <p key={idx}>
                                            <strong>{idx + 4}. {question} : </strong>{answer}
                                        </p>
                                    ))}
                                    <button onClick={() => handledelete(item.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No data submitted yet.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;