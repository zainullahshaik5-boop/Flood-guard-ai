from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Flood Guard AI Backend Running"}

@app.get("/api/health")
def health():
    return {"status": "ok"}