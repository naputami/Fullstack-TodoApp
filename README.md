# PacToDo App: A Full Stack Simple Todo App
## Background
PacToDo App is a task and project management application that simplifies the organization of tasks and projects. Users can easily add, edit, and delete both projects and tasks. The app is seamlessly connected to a relational database, ensuring the safe and organized storage of user data.
### Features
- User Registration: Sign up and create an account to access personalized task and project management.  
- Login and Logout: Securely log in to your account and log out when you're done, ensuring the privacy of your data.  
- Task Handling: Easily add, edit, or remove tasks.
- Task Completion: Mark tasks as done when they're finished.
- Task Organization: Categorize tasks into different projects.
- Project Handling: Create, edit, or delete projects.
- Filtering: Find tasks quickly by project

## Requirements
- Front end: React.js, CSS Tailwind, Axios, Daisy UI  
- Back end: Flask, Flask-Migrate, Flask-SQLAlchemy, Flask-Cors, Flask-JWT-Extended, PostgreSQL
- Container: Docker

## App Development
### Flow chart
#### Account Registration
![Flow chart registration](./readmeimg/PacTodo_Register.png "Flow chart registration")
#### Login
![Flow chart login](/readmeimg/PacToDo_Login.png "Flow chart login")
#### Projects
![Flow chart projects](/readmeimg/PacToDo_Projects.png "Flow chart projects")
#### Tasks
![Flow chart tasks](/readmeimg/PacToDo_Tasks.png "Flow chart tasks")

### ERD
![ERD of PacToDo App](/readmeimg/TodoERD.png "ERD of PacToDo App")
### Module/Function
#### Flask
|Module   |Description   |
|---|---|
|app|containing database models, endpoint logic, and static files from React build |
|config.py|containing configuration for SQAlchemy and JWT Token   |
|run.py   |containing code for running the Flask app   |

#### React
The following are functions for the main features.
| Function  |Description   |
|---|---|
|fetchProjects()  | fetching projects from project endpoint  |
|fetchTasks()   |fetching tasks from task endpoint   |
|handleRegis(data)   | sending user data from registration form to registration endpoint  |
|handlelogin(data)   | sending user data from login form to login endpoint, and saving access and refresh token to local storage    |
|handlelogout()   | sending logout request to logout end point, remove user data from state and local storage  |
|handleAddProject(data)   |sending new project data from user to project endpoint  |
|handleDeleteProject(data)   |sending request for deleting certain project to project endpoint   |
|handleEditProject(data)   |sending edited project data from user to project endpoint   |
|handleAddTask(data)   |sending new task data from user to task endpoint   |
|handleDeleteTask(data)  | sending request for deleting certain task to task endpoint  |
|handleUpdateTask(data)   |sending updated task data from user to task endpoint   |

### Test Cases
#### Account Registration
![Account registration](./readmeimg/testcase_register.gif "Account registration")
#### Login
![Test case login successful](./readmeimg/testcase_login.gif "Test case login successful")
#### Add project
![Test case add project](./readmeimg/testcase_add_project.gif "Test case add project")
#### Edit Project
![Test case edit project](./readmeimg/testcase_edit_project.gif "Test case edit project")
#### Delete project
![Test case delete project](./readmeimg/testcase_delete_project.gif "Test case delete project")
#### Add task
![Test case add task](./readmeimg/testcase_add_task.gif "Test case add task")
#### Mark task as done
![Test case mark task as done](./readmeimg/testcase_mark_as_done_task.gif "Test case mark task as done")
#### Edit task
![Test case edit task](./readmeimg/testcase_edit_task.gif "Test case edit task")
##### Filter task by project
![Test case filter task](./readmeimg/testcase_filter_task.gif "Test case filter task")
#### Delete task
![Test case delete task](./readmeimg/testcase_delete_task.gif "Test case delete task")
#### Logout
![Test case logout](./readmeimg/testcase_logout.gif "Test case logout")

## Deployment Using Docker
To ensure that the app can run seamlessly on various servers, i utilized Docker for deployment. Docker provides an isolated environment for the app, enhancing portability and security.  
### Building Container Using Docker Compose
Before building the Docker image, I build the React code using the `npm run build`. The static files from the building process then is served

I used Dockerfile to build image for Flask app.
```
FROM python:3.10
COPY . /app
WORKDIR /app
RUN pip install -r requirement.txt
EXPOSE 5000
CMD ["python","run.py"]
```
The Flask and PostgreSQL containers are built using Docker Compose with the following configurations.
```
version: '3'
services:
    flaskapp:
      build:
        context: ./flask
        dockerfile: Dockerfile
      container_name: todo_flask
      environment:
      - SQLALCHEMY_DATABASE_URI=${SQLALCHEMY_DATABASE_URI}
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
      ports:
        - 5000:5000
      depends_on: 
        - postgres
      networks:
        - mynetworks
    
    postgres:
      image: postgres:latest
      container_name: todo_postgres
      ports:
        - 5439:5432
      environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
      volumes:
        - postgres-volume:/var/lib/postgresql/data
        - ./postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
      networks: 
        - mynetworks

networks:
  mynetworks:
volumes:
  postgres-volume:

```
Environment variables are imported from a .env file for security reasons.
### Back Up Database and Scheduling with Cron
We can back up the database by running the `backup.sh` script in the Linux terminal.
```
#!/bin/bash

source $(realpath ~/backup/config.txt)

current_datetime=$(date +"%y%m%d_%H%M%S")

container_name="todo_postgres"

backup_dir="$(realpath ~/backup/todo_postgres)"

db_user=$POSTGRES_USER

backup_file="$backup_dir/backup_$current_datetime.sql"


docker exec -i $container_name pg_dumpall -U $db_user > $backup_file

if [ $? -eq 0 ]; then
    echo "Database backup successful. Backup saved as $backup_file"
else
    echo "Database backup failed."
fi
```
The `config.txt` file contains the values of the `POSTGRES_USER` variable. I sourced it into the script so that the variables are only available while the script is running.  
To enable automatic backups, I have configured a cron service schedule to back up the database daily at 9 AM.
![Cron scheduling](./readmeimg/crontab.jpg "Cron scheduling")  
If the backup process is successs, the backup files are saved as SQL file in the `backup_dir`. You can check example of the backup files in [this folder](/backup-database)
### Restore Database
We can use backup file to restore database by running `restore.sh` in the Linux terminal.
```
#!/bin/bash

source $(realpath ~/backup/config.txt)

db_name=$POSTGRES_DB

db_user=$POSTGRES_USER

CONTAINER_NAME="todo_postgres"

read -p "Enter the path to the backup file: " BACKUP_FILE

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file does not exist."
    exit 1
fi

docker cp $BACKUP_FILE $CONTAINER_NAME:/backup-file.sql

docker exec -it $CONTAINER_NAME bash -c "psql -U $db_user -d $db_name -f /backup-file.sql"

if [ $? -eq 0 ]; then
    echo "Backup restore completed successfully."
else
    echo "Backup restore failed."
fi
```
The `config.txt` file contains the values of the `POSTGRES_USER` and `POSTGRES_DB` variables. I sourced it into the script so that the variables are only available while the script is running.  
We can input the path of the backup file we want to use to restore the database. If the file is available, it will be copied to the PostgreSQL container, and the psql restore command will be executed.
## How to run this app
1. Clone this repository
```
git clone https://github.com/naputami/Fullstack-TodoApp.git
```
2. Create a .env file and set value for SQLALCHEMY_DATABASE_URI, JWT_SECRET_KEY, POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB.
3.  Make sure that you have installed docker desktop and run this command
```
docker compose up
```
4. You can access the application via localhost:5050.
## Conclusion
All of the application's features currently function as expected. However, there are areas that can be enhanced in the future, including:
- Enhancing UI Design for improving intuitiveness and accessibility.
- Enhancing the notification system to make notifications more user-friendly.
- Enhancing the database design to accommodate more detailed user data.
- Adding additional features to enhance UX, such as searching for projects by name and sorting tasks by due date and status.
