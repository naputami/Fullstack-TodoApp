FROM postgres:latest
COPY init.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_USER=tododb
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=todo_db
EXPOSE 5432