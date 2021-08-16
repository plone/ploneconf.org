FROM node:14

# Create app directory
WORKDIR /usr/src/app


LABEL maintainer="Plone Foundation <conf@plone.org>" \
      org.label-schema.name="plone" \
      org.label-schema.description="Plone Conference 2021 frontend." \
      org.label-schema.vendor="Plone Foundation" \
      org.label-schema.docker.cmd="docker run -d -p 3000:3000 plone/ploneconf-frontend:latest"


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json yarn.lock  ./
RUN yarn install

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
