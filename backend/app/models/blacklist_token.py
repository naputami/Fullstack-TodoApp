from app.extention import db

class BlacklistToken(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    jti = db.Column(db.String(36), nullable = False, unique = True)

    def serialize(self):
        return {
            "id": self.id,
            "jti": self.jti
        }