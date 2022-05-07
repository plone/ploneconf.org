ARG PLONE_VERSION=6.0.0a4
FROM plone/plone-backend:${PLONE_VERSION}

LABEL maintainer="Plone Foundation <conf@plone.org>" \
      org.label-schema.name="plone" \
      org.label-schema.description="Plone Conference 2022 backend." \
      org.label-schema.vendor="Plone Foundation"

# Add local code
COPY . .
RUN ./bin/pip install -r requirements.txt
