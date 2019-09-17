FROM python:3.5-stretch

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libatlas-base-dev \
        python-dev \
        gfortran \
        pkg-config \
        libfreetype6-dev \
    && apt-get clean

RUN pip install jupyter

#CMD ["/bin/bash", "-c", "sleep 10000"]
CMD jupyter notebook \
#        --notebook-dir=/opt/notebooks \
        --ip='0.0.0.0' \
        --port=8888  \
        --no-browser \
        --allow-root
