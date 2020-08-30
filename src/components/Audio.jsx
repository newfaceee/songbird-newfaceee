import React from "react";

//icons
import playIcon from "../assets/img/play-button.svg";
import pauseIcon from "../assets/img/pause-button.svg";

import { AudioStatus } from "../constants";
import { transformDuration } from "../utils";
import { useSelector } from "react-redux";

// props: audioSrc,
const Audio = ({ audioSrc }) => {
  //useContext
  const isRoundWon = useSelector(({ isRoundWon }) => isRoundWon);

  // useState
  const [duration, setDuration] = React.useState("loading...");
  const [audioStatus, setAudioStatus] = React.useState(AudioStatus.PAUSE);
  const [rangeValue, setRangeValue] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [volume, setVolume] = React.useState(100);

  // refs
  const audioRef = React.useRef(null);
  const timebarRef = React.useRef(null);
  const volumeRef = React.useRef(null);

  // event handlers
  const playButtonClickHandler = () => {
    switch (audioStatus) {
      case AudioStatus.PLAY:
        audioRef.current.pause();
        setAudioStatus(AudioStatus.PAUSE);
        return;
      case AudioStatus.PAUSE:
        audioRef.current.play();
        setAudioStatus(AudioStatus.PLAY);
        return;
      default:
        audioRef.current.pause();
        setAudioStatus(AudioStatus.PAUSE);
    }
  };

  const timeChangeHandler = (evt) => {
    setCurrentTime(evt.target.currentTime);
    setRangeValue(evt.target.currentTime);
  };

  const volumeChangeHandler = (evt) => {
    setVolume(evt.target.value);
    audioRef.current.volume = volume / 100;
  };

  const timebarChangeHandler = (evt) => {
    setRangeValue(evt.target.value);
  };

  React.useEffect(() => {
    const percentage = (rangeValue * 100) / duration;
    timebarRef.current.style.background = `rgba(0, 0, 0, 0)
    linear-gradient(
      to right,
      rgb(0, 188, 140) 0%,
      rgb(61, 133, 140) ${percentage}%,
      rgb(115, 115, 115) ${percentage}%,
      rgb(115, 115, 115) 100%
    )
    repeat scroll 0% 0%`;
  }, [rangeValue, duration]);

  React.useEffect(() => {
    volumeRef.current.style.background = `rgba(0, 0, 0, 0)
    linear-gradient(
      to right,
      rgb(0, 188, 140) 0%,
      rgb(61, 133, 140) ${volume}%,
      rgb(115, 115, 115) ${volume}%,
      rgb(115, 115, 115) 100%
    )
    repeat scroll 0% 0%`;
  }, [volume]);

  React.useEffect(() => {
    if (audioRef.current && isRoundWon) {
      audioRef.current.pause();
      setAudioStatus(AudioStatus.PAUSE);
    }
  }, [isRoundWon]);

  return (
    <React.Fragment>
      {audioSrc && (
        <audio
          onLoadedMetadata={(e) => {
            setDuration(e.target.duration);
            setCurrentTime(e.target.currentTime);
          }}
          onTimeUpdate={timeChangeHandler}
          ref={audioRef}
          src={audioSrc}
        ></audio>
      )}
      <div className="audio__controls">
        <div
          onClick={playButtonClickHandler}
          className="audio__playback-button"
        >
          <img
            className="audio__playback-button--image"
            width="15"
            height="15"
            src={audioStatus === AudioStatus.PAUSE ? playIcon : pauseIcon}
            alt="control button"
          />
        </div>
        <div className="audio__timebar">
          <div className="controls">
            <input
              type="range"
              value={rangeValue}
              min="0"
              max={Math.floor(isNaN(duration) ? 0 : duration)}
              ref={timebarRef}
              className="audio__timebar__bar"
              onChange={timebarChangeHandler}
            />
            <input
              type="range"
              className="audio__volume"
              value={volume}
              max="100"
              ref={volumeRef}
              onChange={volumeChangeHandler}
            />
          </div>

          <div className="audio__details">
            <p className="audio__current-time">
              {transformDuration(currentTime)}
            </p>
            <p className="audio__duration">
              {isNaN(duration) ? "...loading" : transformDuration(duration)}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Audio;
