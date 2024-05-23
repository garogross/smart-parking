// src/components/VideoPlayer.jsx
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import {baseUrl, getLiveStreamUrl, proxy} from "../../../redux/action/fetchTools";

const VideoPlayer = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const player = videojs(videoRef.current, {
            controls: true,
            autoplay: true,
            sources: [{
                src: `${proxy}${baseUrl}${getLiveStreamUrl}`,
                type: 'video/mp4'
            }]
        });

        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} className="video-js vjs-default-skin" width="600" height="300" />
        </div>
    );
};

export default VideoPlayer;
