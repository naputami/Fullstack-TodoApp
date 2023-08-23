import json

task_data = './data/tasks.json'
user_data = './data/users.json'

def read_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    return data


def id_maker(file_path, json_attr, dict_attr):
    data = read_json(file_path)

    ids = [item[dict_attr] for item in data[json_attr]]

    if len(ids) == 0:
        return 1

    id = max(ids) + 1

    return id

def rewrite_json(file_path, data):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)
    
def find_index(data, json_attr, dict_attr, id):
    index = -1
    for item in data[json_attr]:
        if item[dict_attr] == int(id):
            index = data[json_attr].index(item)
            break
    return index