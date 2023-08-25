from app.extention import db
from sqlalchemy import TypeDecorator, Boolean

class LiberalBoolean(TypeDecorator):
    impl = Boolean

    def process_bind_param(self, value, dialect):
        if value is not None:
            if isinstance(value, tuple):
                value = value[0]
            if isinstance(value, bool):
                return value
            value = bool(int(value))
        return value

class Tasks(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100), nullable = False)
    description = db.Column(db.Text)
    due_date = db.Column(db.Date, nullable = False)
    is_done = db.Column(LiberalBoolean, default = False, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    created_at = db.Column(db.DateTime(timezone=True), server_default = db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate = db.func.now())
    user = db.relationship('Users', back_populates='tasks')
    project = db.relationship('Projects', back_populates='tasks')

    def serialize(self): 
        return {
            "id": self.id,
            "title": self.title,
            "description":self.description,
            "due_date": self.due_date,
            "is_done": self.is_done,
            "user": {
                "id": self.user.id,
                "name": self.user.name
            },
            "project": {
                "name": self.project.name,
                "id": self.project.id
            }
        }
    