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
