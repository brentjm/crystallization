FROM postgres:latest

USER postgres
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgrespassword
ENV POSTGRES_DB crystallization

COPY --chown=postgres:postgres ./create_database.sql /docker-entrypoint-initdb.d/.
# This doesn't work as PostgreSQL create the database only if the directory is empty.
# Instead copy the file after the container is running.
#COPY --chown=postgres:postgres ./pg_hba.conf /var/lib/postgresql/data/.
