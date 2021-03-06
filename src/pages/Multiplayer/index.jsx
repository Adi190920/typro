import { faCopy, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import TypingLoader from "../../components/TypingLoader";
import configs from "../../config";
import Style from "../Dashboard/dashboard.module.scss";
import MultiplayerStyle from "./multiplayer.module.scss";

const Multiplayer = () => {
  const frontend = "https://typro.rohitchaudhari.me";
  // const frontend = "http://localhost:5000";
  const textAreaRef = React.useRef(null);
  const [loading, setloading] = useState(false);
  const [id, setid] = useState(undefined);
  const [codeSnippetId, setcodeSnippetId] = useState();
  const [language, setLanguage] = useState("C");
  const generateRoomLink = () => {
    let room_id = nanoid(10);
    setloading(true);
    axios
      .post(`${configs.BACKEND_URL}/room/`, { room_id, language })
      .then((res) => {
        setid(room_id);
        setcodeSnippetId(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setloading(false);
      });
  };
  function copyToClipboard(e) {
    navigator.clipboard.writeText(
      `${frontend}/multiplayertyping/${id}/${codeSnippetId}`
    );
    toast.dark("Link copied!");
  }
  return (
    <div className={Style.container}>
      <FontAwesomeIcon icon={faUserFriends} size="5x" />
      <h1 className={Style.title}>Multiplayer mode</h1>
      <p
        className={Style.subtitle}
        style={{
          color: "var(--subtitle-color)",
          fontSize: "18px",
          marginTop: "0",
        }}
      >
        Be competitive! Create a room and share the link to your friends and
        then Battle it out with them and show your typing skills
      </p>
      <Form.Group
        controlId="name"
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <Form.Label style={{ fontSize: "19px", fontWeight: "bold" }}>
          Select preferred language:{""}
        </Form.Label>
        <br></br>
        <Form.Control
          autoFocus
          type="name"
          as="select"
          style={{ width: "90%" }}
          className="main__input"
          placeholder="Enter Name"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option style={{ color: "blue" }}>C</option>
          <option style={{ color: "blue" }}>C++</option>
          <option style={{ color: "blue" }}>Java</option>
          <option style={{ color: "blue" }}>Python</option>
          <option style={{ color: "blue" }}>Javascript</option>
        </Form.Control>
      </Form.Group>
      <button className="main__button" onClick={generateRoomLink}>
        Generate room link
      </button>
      <div className={MultiplayerStyle.link_div}>
        {loading ? (
          <TypingLoader msg={"Generating room id....."} />
        ) : (
          <>
            {id === undefined ? (
              <h2>Click above button to generate room id</h2>
            ) : (
              <>
                <h2>Your room link</h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "var(--card-color)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      display: "block",
                      padding: "0.5rem 1rem",
                    }}
                    ref={textAreaRef}
                  >
                    {frontend}/multiplayertyping/{id}/{codeSnippetId}
                  </span>
                  <div
                    style={{
                      backgroundColor: "#13161e",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "25px",
                    }}
                    onClick={copyToClipboard}
                  >
                    <FontAwesomeIcon
                      icon={faCopy}
                      style={{
                        fontSize: "25px",
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Multiplayer;
