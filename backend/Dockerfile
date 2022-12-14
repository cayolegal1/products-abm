FROM python:3.8-slim as base_backend

# libpq-dev and python3-dev help with psycopg2
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3-dev libpq-dev gcc curl binutils libproj-dev gdal-bin \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*
  # You can add additional steps to the build by appending commands down here using the
  # format `&& <command>`. Remember to add a `\` at the end of LOC 12.
  # WARNING: Changes to this file may cause unexpected behaviors when building the app.
  # Change it at your own risk.

WORKDIR /opt/webapp
COPY Pipfile* /opt/webapp/

RUN pip3 install --no-cache-dir -q 'pipenv==2020.11.15'
RUN pipenv install --deploy --system

FROM base_backend as release

COPY --from=base_backend /root/.local /root/.local

RUN true
COPY . /opt/webapp
RUN true

WORKDIR /opt/webapp
ENV PATH=/root/.local/bin:$PATH
ARG SECRET_KEY

RUN python3 manage.py collectstatic --no-input
# Run the image as a non-root user
RUN adduser --disabled-password --gecos "" django
USER django
CMD waitress-serve --port=$PORT base.wsgi:application
