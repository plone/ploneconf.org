FROM plone/plone-backend:5.2.6

LABEL maintainer="Plone Foundation <conf@plone.org>" \
      org.label-schema.name="plone" \
      org.label-schema.description="Plone Conference 2021 api." \
      org.label-schema.vendor="Plone Foundation" \
      org.label-schema.docker.cmd="docker run -d -p 8080:8080 plone/ploneconf-api:latest"

# Add local code
COPY . ./
RUN ./bin/pip install --use-deprecated legacy-resolver -e "src/ploneconf.core"
