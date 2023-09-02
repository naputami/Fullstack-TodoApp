FROM python:3.10
COPY . /app
WORKDIR /app
RUN pip install -r requirement.txt
EXPOSE 5000
CMD ["python","run.py"]