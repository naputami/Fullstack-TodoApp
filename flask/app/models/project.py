from app.extention import db


class Projects(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=db.func.now())
    user = db.relationship('Users', back_populates='projects')
    tasks = db.relationship('Tasks', back_populates= 'project')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "user": {
                "id": self.user.id,
                "name": self.user.name
            }
        }
