FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app/pms-webui

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the entire directory into the container
COPY . .

# WORKDIR /app/pms-webui

# Install the app's dependencies
RUN npm install --force

# Build the app
# RUN ng build

# This assumes the "demoSSR:server" script exists in your package.json
# RUN npm run demoSSR:server

# RUN ng build
# RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --configuration=${CONFIGURATION}

# RUN npm run build:ssr


# Start the server
CMD npm run serve:ssr

# Expose the port
EXPOSE 4200