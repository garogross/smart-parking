module.exports = {
    apps: [
      {
        name: "MongoDB",
        script: "C:\\Program Files\\MongoDB\\Server\\7.0\\bin\\mongod.exe",
        args: "--dbpath C:\\Users\\Сервер АРН\\Mongodb-data",
      },
      {
        name: "FFmpeg-exit",
        script: "ffmpeg",
        args: "-i rtsp://admin:Mos12cow@192.168.1.64:554/ISAPI/Streaming/Channels/101 -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 -hls_flags delete_segments -vcodec copy -y ./public/stream/exit/index.m3u8",
        cwd: "C:\\Users\\Сервер АРН\\Desktop\\smart-parking-main\\server",
      },
      {
        name: "FFmpeg-entry",
        script: "ffmpeg",
        args: "-i rtsp://admin:Mos12cow@192.168.1.125:554/ISAPI/Streaming/Channels/101 -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 -hls_flags delete_segments -vcodec copy -y ./public/stream/entry/index.m3u8",
        cwd: "C:\\Users\\Сервер АРН\\Desktop\\smart-parking-main\\server",
      },
      {
        name: "NodeJS-server",
        script: "server.js",
        cwd: "C:\\Users\\Сервер АРН\\Desktop\\smart-parking-main\\server",
        interpreter: "node",
      },
    ],
  };
  