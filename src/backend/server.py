from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from flaskwebgui import FlaskUI, close_application
import cv2
import asyncio
from ultralytics import YOLO
from websockets.exceptions import ConnectionClosed
from fastapi import Request

app = FastAPI()

camera = cv2.VideoCapture(0)
model_path = r"backend/best (2).pt"

# Mount static files and templates
app.mount("/public", StaticFiles(directory="public/"))
templates = Jinja2Templates(directory="templates")

@app.websocket("/ws")
async def get_stream(websocket: WebSocket):
    await websocket.accept()
    model = YOLO(model_path)
    try:
        while True:
            success, frame = camera.read()
            if not success:
                break
            result = model.predict(frame, device=[0])
            frame = result[0].plot()

            ret, buffer = cv2.imencode('.jpg', frame)
            await websocket.send_bytes(buffer.tobytes())
            await asyncio.sleep(0.03)  # Limit to 30 FPS
    except (WebSocketDisconnect, ConnectionClosed):
        print("Client disconnected")
        
@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    FlaskUI(
        server="fastapi",
        server_kwargs={"app": app, "port": 8000, "host": "0.0.0.0"},
        width=800,
        height=600,
    ).run()
