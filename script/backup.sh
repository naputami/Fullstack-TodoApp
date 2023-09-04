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
