FROM python:3

ENV PYTHONUNBUFFERED 0

RUN apt-get update && apt-get -y install cron && apt-get -y install vim && apt-get update

WORKDIR /app

COPY . /app/

ADD ./requirements.txt /app/

RUN    pip install -r requirements.txt

# COPY cron-time /etc/cron.d/cron-time

# RUN chmod 0644 /etc/cron.d/cron-time

# RUN crontab /etc/cron.d/cron-time

# RUN touch /var/log/cron.log

