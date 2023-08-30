from app.extention import db

class Users(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    email = db.Column(db.String(124), unique = True, nullable = False)
    password = db.Column(db.String(1024), nullable = False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=db.func.now())
    tasks = db.relationship('Tasks', back_populates='user')
    projects = db.relationship('Projects', back_populates='user')

    def serialize(self): 
        return {
            "id": self.id,
            "name": self.name,
            "email":self.email
        }