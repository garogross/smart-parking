import React, { useState } from 'react';
import ReactHlsPlayer from 'react-hls-player';

import styles from "./VideoPlayer.module.scss"
import { proxy } from '../../../redux/action/fetchTools';

const VideoPlayer = ({isExit}) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const src = `${proxy}/api/stream/${isExit ? "exit" : "entry"}/index.m3u8`

  const toggleIsZoomed = () => setIsZoomed(prevState => !prevState)

  return (
    <div
      className={`${styles['videoPlayer']} ${isZoomed ? styles['videoPlayer_active'] : ""}`}
      onClick={toggleIsZoomed}
    >
      <ReactHlsPlayer
        muted={true}
        src={src}
        autoPlay={true}
        width="100%"
        height="auto"
        className={`${styles['videoPlayer__video']} ${isZoomed ? styles['videoPlayer__video_active'] : ""}`}
      />
    </div>
  );
};

export default VideoPlayer;
