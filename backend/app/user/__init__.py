from flask import Blueprint
from flask_cors import CORS

userBp = Blueprint("user", __name__)
CORS(userBp)
from app.user import routes