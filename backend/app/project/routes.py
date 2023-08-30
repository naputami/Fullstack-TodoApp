from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.project import projectBp
from app.extention import db
from app.models.task import Tasks
from app.models.project import Projects


@projectBp.route('', methods=['POST'], strict_slashes=False)
@jwt_required(locations=["headers"])
def create_project():
    data = request.get_json()

    name = data.get("name")
    description = data.get("description")
    user_id = get_jwt_identity()

    new_project = Projects(
        name = name,
        description = description,
        user_id = user_id
    )

    db.session.add(new_project)
    db.session.commit()

    response = jsonify({
        "success": True,
        "message": 'New project created!',
        "data": new_project.serialize()
            
    })

    return response, 200

@projectBp.route('', strict_slashes=False)
@jwt_required(locations=["headers"])
def get_projects():
    current_user = get_jwt_identity()
    
    projects =db.session.query(Projects).filter(Projects.user_id == current_user)

    result = [project.serialize() for project in projects]

    response = jsonify({
        "data": result
    })

    return response, 200

@projectBp.route('/<project_id>', methods=["PUT"], strict_slashes=False)
@jwt_required(locations=["headers"])
def update_project(project_id):
    data = request.get_json()

    current_user = get_jwt_identity()

    project = Projects.query.filter_by(id=project_id).first()

    if not project:
        return jsonify({
        "success": False,
        "message": f'there is no project with id {project_id}'
    }), 404

    if current_user != project.user_id:
        return jsonify({
            "message":'You do not have permission to edit this project'
        }), 403
    
    project.name = data.get("name")
    project.description = data.get("description")
    project.user_id = current_user

    db.session.commit()

    response = jsonify({
            "success": True,
            "message" : f'project with id {project_id} has been changed'
    })

    return response, 200

@projectBp.route('/<project_id>', methods=["DELETE"], strict_slashes=False)
@jwt_required(locations=["headers"])
def delete_project(project_id):
    current_user = get_jwt_identity()

    project = Projects.query.filter_by(id=project_id).first()

    if not project:
        return jsonify({
        "success": False,
        "message": f'there is no project with id {project_id}'
    }), 404

    if current_user != project.user_id:
        return jsonify({
            "message":'You do not have permission to delete this project'
        }), 403
    
    Tasks.query.filter_by(project_id=project_id).delete()
    db.session.delete(project)
    db.session.commit()

    response = jsonify({
                "success": True,
                "message" : f'project with id {project_id} and associated tasks has been deleted'
    })

    return response, 200
