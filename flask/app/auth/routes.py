from flask import request, jsonify
from app.extention import db, jwt
from app.models.user import Users
from app.models.blacklist_token import BlacklistToken
from app.auth import authBp
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt, get_jwt_identity


@authBp.route("/register", methods = ['POST'], strict_slashes = False)
def registration():
    data = request.get_json()
    name = data.get('name', None)
    email = data.get('email', None)
    password = generate_password_hash(data.get('password', None))

    if not name or not email or not password:
        return jsonify({
            "message": "Name or email or password is required"
        }), 400
    
    try:
        db.session.add(Users(
            name=name,
            password=password,
            email=email
        ))
        db.session.commit()
    except IntegrityError:
        return jsonify({
            "message": f'Email {email} is already registered.'
        }), 422
    
    return jsonify({
        "message": "Registration user is completed"
    }), 200


@authBp.route("/login", methods = ['POST'], strict_slashes = False)
def login():
    data = request.get_json()

    email = data.get('email', None)
    password = data.get('password', None)

    if not email or not password:
        return jsonify({
            "message": "Email or password is required"
        }), 400
    
    user = Users.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({
            "message": 'Email or password is invalid'
        }), 400
    
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return jsonify({
        "message": "Login success",
        "access token": access_token,
        "refresh token": refresh_token
    }), 200

@authBp.route("/refresh", methods = ['POST'], strict_slashes = False)
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = {
        'access token': create_access_token(identity=current_user)
    }
    return jsonify(access_token), 200

@authBp.route("/logout", methods=['POST'], strict_slashes = False)
@jwt_required(locations=["headers"])
def logout():
    raw_jwt = get_jwt()

    jti = raw_jwt.get('jti')
    token = BlacklistToken(jti = jti)
    
    db.session.add(token)
    db.session.commit()
    return jsonify(message = "logout successfully"), 200

@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]
    token = BlacklistToken.query.filter_by(jti=jti).first()
    return token is not None