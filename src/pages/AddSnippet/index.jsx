import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import config from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const his = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${config.BACKEND_URL}/user/login`, { username, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        toast.dark("Login successful! Redirecting to main page");
        his.replace("/");
      })
      .catch((err) => {
        toast.error("Invalid username or password", { autoClose: 3000 });
      });
  }

  return (
    <div
      style={{
        display: "flex",
        height: "95vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          maxWidth: "40rem",
          width: "90vw",
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ margin: "0", padding: "0", marginBottom: "1.5rem" }}>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
          Add New
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="text">
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Code Snippet:{" "}
            </Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              as="textarea"
              rows="7"
              type="text"
              style={{ width: "90%" }}
              className="main__input"
              placeholder="Place the code snippet here"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            size="lg"
            controlId="text"
            style={{ marginTop: "1rem" }}
          >
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
              Language:{" "}
            </Form.Label>
            <br></br>
            <Form.Control
              
              type="password"
              as='select'
              style={{ width: "90%" }}
              value={password}
              className="main__input"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            >
              <option style={{ color: "black" }}>C</option>
      <option>C++</option>
      <option>Java</option>
      <option>Python</option>
      <option>Javascript</option>
              </Form.Control>
          </Form.Group>
          <Form.Group controlId="text" style={{ marginTop: "1rem" }}>
            <Form.Label style={{ fontSize: "19px", fontWeight: "bold"}}>
              Url:{" "}
            </Form.Label>
            <br></br>
            <Form.Control
              autoFocus
              type="text"
              style={{ width: "90%" }}
              className="main__input"
              placeholder="type the reference url"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            style={{
              marginTop: "1.5rem",
              boxShadow: "none",
              outline: "none",
              border: "none",
              width: "125px",
              padding: "8px 10px",
              cursor: "pointer",
            }}
            disabled={!validateForm()}
            className="main__button"
          >
            Add
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ marginLeft: "10px", fontSize: "18px" }}
            />
          </Button>
          
        </Form>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </div>
  );
}