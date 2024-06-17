from typing import Union
from fastapi import FastAPI

from Bill import Bill

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
