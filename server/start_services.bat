@REM @echo off
@REM echo Starting MongoDB...
@REM "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\Users\Сервер АРН\Mongodb-data"

@REM echo Starting FFmpeg exit...
@REM cd C:\Users\Сервер АРН\Desktop\smart-parking-main\server\
@REM start cmd /k "ffmpeg -i rtsp://admin:Mos12cow@192.168.1.64:554/ISAPI/Streaming/Channels/101 -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 -hls_flags delete_segments -vcodec copy -y ./public/stream/exit/index.m3u8"

@REM echo Starting FFmpeg exit...
@REM start cmd /k "ffmpeg -i rtsp://admin:Mos12cow@192.168.1.125:554/ISAPI/Streaming/Channels/101 -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 -hls_flags delete_segments -vcodec copy -y ./public/stream/entry/index.m3u8"
@REM echo Starting Node.js server...
@REM start cmd /k "npm start"


@REM echo All services started.

@echo off
echo Starting services with PM2...

:: Start MongoDB, FFmpeg, and Node.js server using PM2
start cmd /k "pm2 start  ecosystem.config.cjs"

echo All services started with PM2.
pause