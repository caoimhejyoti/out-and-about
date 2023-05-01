import React from "react";
import github from "../../assets/github.png";

const Footer = () => {
  const container = {
    justifyContent: "center",
  };
  const styleObj = {
    width: "150px",
    color: "white",
    target: "_blank",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };
  const githubStyle = {
    marginRight: "10px",
    width: "20px",
    height: "20px",
  };

  return (
    <footer className="w-100 mt-auto flex-row" style={container}>
      <a
        href="https://github.com/caoimhejyoti"
        target="_blank"
        style={styleObj}
        rel="noreferrer"
      >
        <img style={githubStyle} src={github} alt="github" />
        <h6>Caoimhe</h6>
      </a>
      <a
        href="https://github.com/HarryWard-15"
        target="_blank"
        style={styleObj}
        rel="noreferrer"
      >
        <img style={githubStyle} src={github} alt="github" />
        <h6>Harry</h6>
      </a>
      <a
        href="https://github.com/JoeVictor"
        target="_blank"
        style={styleObj}
        rel="noreferrer"
      >
        <img style={githubStyle} src={github} alt="github" />
        <h6>Joe</h6>
      </a>
      <a
        href="https://github.com/stephaneeh"
        target="_blank"
        style={styleObj}
        rel="noreferrer"
      >
        <img style={githubStyle} src={github} alt="github" />
        <h6>Steph</h6>
      </a>
    </footer>
  );
};

export default Footer;
