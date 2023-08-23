from flask import request, jsonify
from app.user import userBp
from app.extention import db
from app.models.user import Users
from app.models.task import Tasks
from app.models.project import Projects


@userBp.route('', methods=['POST'], strict_slashes=False)
def create_user():
    data = request.get_json()

    new_user = Users(
        name = data.get("name"),
        email= data.get("email"),
        password = data.get("password")
    )

    db.session.add(new_user)
    db.session.commit()

    response = jsonify({
        "success": True,
        "message": 'New user created!',
        "data": new_user.serialize()
    })

    return response, 200

@userBp.route('', strict_slashes=False)
def get_users():
    limit = request.args.get('limit', 10)
    if type(limit) is not int:
        return jsonify({'message': 'invalid parameter'}), 400
    
    users = db.session.execute(db.select(Users).limit(limit)).scalars()

    result = [user.serialize() for user in users]

    response = jsonify({
        "success": True,
        "data": result
    })

    return response, 200


@userBp.route('/<user_id>', methods=["PUT"], strict_slashes=False)
def update_user(user_id):
    data = request.get_json()

    user = Users.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({
            "error": "user not found"
        }), 404
    
    if not data.get("name") or not data.get("email") or not data.get("password"):
        return jsonify({'message': 'incomplete data'}), 400
    
    user.name = data.get("name")
    user.email = data.get("email")
    user.password = data.get("password")
    db.session.commit()

    response = jsonify({
        "success": True,
        "message": f'data of user with id {user_id} is successfully updated'
    })

    return response, 200

@userBp.route('/<user_id>', methods=["DELETE"], strict_slashes=False)
def delete_user(user_id):
    user = Users.query.filter_by(id=user_id).first()
    
    if not user:
        return jsonify({
            "error": "user not found"
        }), 404
    
    tasks = Tasks.query.filter_by(user_id=user_id)
    projects = Projects.query.filter_by(user_id=user_id)
    db.session.delete(tasks)
    db.session.delete(projects)
    db.session.delete(user)
    db.session.commit()

    response = jsonify({
        "success": True,
         "message": f'user with id {user_id} is successfully deleted'
    })

    return response, 200

