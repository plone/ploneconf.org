ARG PLONE_VERSION=6.0.1
FROM plone/plone-backend:${PLONE_VERSION}

LABEL maintainer="Plone Foundation <conf@plone.org>" \
      org.label-schema.name="ploneconf-backend" \
      org.label-schema.description="Plone Conference 2023 backend." \
      org.label-schema.vendor="Plone Foundation"

# Add local code
COPY . .
RUN ./bin/pip install -r requirements.txt
