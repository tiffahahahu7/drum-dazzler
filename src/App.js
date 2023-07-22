import { useState, useEffect } from "react";

function App() {
  const [audioClip, setAudioClip] = useState("Click or press, start to play!")
  const [pressedButton, setPressedButton] = useState(null)

  const buttons = [
    { id: "heater1", key: "Q", src: "/audios/Heater-1.mp3"},
    { id: "heater2", key: "W", src: "/audios/Heater-2.mp3"},
    { id: "heater3", key: "E", src: "/audios/Heater-3.mp3"},
    { id: "heater4", key: "A", src: "/audios/Heater-4.mp3"},
    { id: "clap", key: "S", src: "/audios/Clap.mp3"},
    { id: "open-hh", key: "D", src: "/audios/Open_HH.mp3"},
    { id: "kick-n-hat", key: "Z", src: "/audios/Kick_n_Hat.mp3"},
    { id: "kick", key: "X", src: "/audios/KICK.mp3", label: "X" },
    { id: "close-hh", key: "C", src: "/audios/Closed_HH.mp3"},
  ]

  function playAudio(key) {
    document.getElementById(key).play();
  }

  function displayAudio(id){
    setAudioClip(id)
  }

  function handleButtonClick(button) {
      setPressedButton(button.id)
      playAudio(button.key)
      displayAudio(button.id)
      setTimeout(() => {
        setPressedButton(null)
      }, 250)
  }

  function handleKeyDown(event) {
    const button = buttons.find((btn) => btn.key === event.key.toUpperCase())
    if (button) {
      playAudio(button.key)
      displayAudio(button.id)
      setPressedButton(button.id)
    }
  }

  function handleKeyUp(event) {
    setPressedButton(null)
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const qweButtons = buttons.slice(0, 3)
  const asdButtons = buttons.slice(3, 6)
  const zxcButtons = buttons.slice(6, 9)

  return (
    <div id="drum-machine" className="container py-5 d-flex flex-column align-items-center vh-100">
      <h1 className="text-center py-5 text-light fst-italic">Drum Dazzler</h1>
      <div className="pad-container">
            <div className="row">
              <div className="col d-flex justify-content-center">
                {qweButtons.map((button) => (
                  <button
                    key={button.id}
                    id={button.id}
                    className={`drum-pad btn btn-lg px-5 py-3 m-2 ${
                      pressedButton == button.id ? "btn-warning" : "btn-dark"
                    }`}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button.key}
                    <audio id={button.key} className="clip" src={button.src} />
                  </button>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center">
                {asdButtons.map((button) => (
                  <button
                    key={button.id}
                    id={button.id}
                    className={`drum-pad btn btn-lg px-5 py-3 m-2 ${
                      pressedButton == button.id ? "btn-warning" : "btn-dark"
                    }`}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button.key}
                    <audio id={button.key} className="clip" src={button.src} />
                  </button>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center">
                {zxcButtons.map((button) => (
                  <button
                    key={button.id}
                    id={button.id}
                    className={`drum-pad btn btn-lg px-5 py-3 m-2 ${
                      pressedButton == button.id ? "btn-warning" : "btn-dark"
                    }`}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button.key}
                    <audio id={button.key} className="clip" src={button.src} />
                  </button>
                ))}
              </div>
            </div>
      </div>
      <div id="display" className="lead mt-5 text-center px-5 py-3 bg-warning rounded-pill">
        {audioClip} 
      </div>
    </div>
  )
}

export default App;
