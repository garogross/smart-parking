import {catchAsync} from "../utils/catchAsync.js";
import { spawn } from 'child_process';

export const getLiveStream = catchAsync(async (req,res,next) => {
    const rtspUrl = `rtsp://${process.env.CAMERA1_IP}/Streaming/Channels/101`;
    res.setHeader('Content-Type', 'video/mp4');


    const ffmpeg = spawn('ffmpeg', [
        '-i', rtspUrl,
        '-f', 'mp4',
        '-movflags', 'frag_keyframe+empty_moov',
        '-vf', 'scale=w=1280:h=720:force_original_aspect_ratio=decrease',
        '-c:v', 'libx264',
        '-b:v', '1M',
        '-maxrate', '1M',
        '-bufsize', '2M',
        '-r', '30',
        '-g', '60',
        '-f', 'mp4',
        'pipe:1'
    ]);

    ffmpeg.stdout.pipe(res);

    ffmpeg.on('close', (code) => {
        console.log(`FFmpeg process closed with code ${code}`);
        res.end();
    });

    res.on('close', () => {
        ffmpeg.kill('SIGKILL');
    });
})