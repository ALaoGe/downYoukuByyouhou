for %%a in (".\file\*.mp4") do ffmpeg -i "%%a"   -vcodec copy -acodec copy -f mpegts ".\ts\%%~na.ts"
