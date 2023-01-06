ARG PLONE_VERSION=5.2.6
FROM plone/plone-backend:${PLONE_VERSION}

LABEL maintainer="Plone Foundation <conf@plone.org>" \
      org.label-schema.name="ploneconf-backend" \
      org.label-schema.description="Plone Conference 2020 backend." \
      org.label-schema.vendor="Plone Foundation"

# Add local code
COPY . .
RUN ./bin/pip install --use-deprecated legacy-resolver -r requirements.txt \
    && cp conf/configure.zcml /app/lib/python3.8/site-packages/plone/formwidget/querystring/configure.zcml
