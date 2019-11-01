FROM python:3.5-stretch

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libatlas-base-dev \
        python-dev \
        gfortran \
        pkg-config \
        libfreetype6-dev \
    && apt-get clean

RUN pip install jupyter \
    && useradd -ms /bin/bash brent \
    && mkdir /home/brent/.jupyter \
    && mkdir /home/brent/calculations

COPY jupyter_notebook_config.py /home/brent/.jupyter/.
RUN chown -R brent:brent /home/brent/.jupyter

USER brent

CMD jupyter notebook \
        --notebook-dir='/home/brent/calculations' \
        --ip='0.0.0.0' \
        --port=8888  \
        --no-browser \
