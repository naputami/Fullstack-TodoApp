from flask import Flask
from config import Config
from app.extention import db, migrate, jwt
from app.task import taskBp
from app.project import projectBp
from app.auth import authBp

def create_app(config_class = Config):

    app = Flask(__name__)
    
    app.config.from_object(config_class)

    db.init_app(app)        
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_blueprint(taskBp, url_prefix='/api/tasks')
    app.register_blueprint(projectBp, url_prefix='/api/projects')
    app.register_blueprint(authBp, url_prefix='/api/auth')

    return app

