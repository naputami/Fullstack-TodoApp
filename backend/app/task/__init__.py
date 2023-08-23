from flask import Blueprint
from flask_cors import CORS

taskBp = Blueprint('task', __name__)
CORS(taskBp)
from app.task import routes