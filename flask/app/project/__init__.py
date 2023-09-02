from flask import Blueprint
from flask_cors import CORS

projectBp = Blueprint("project", __name__)
CORS(projectBp)
from app.project import routes