# Use the official Alpine image as a base
FROM alpine:latest

# Install necessary packages
RUN apk --no-cache add ca-certificates

# Set the working directory
WORKDIR /app

# Copy the PocketBase executable into the container
COPY pocketbase /app/pocketbase

# Expose the PocketBase port (default is 8090)
EXPOSE 8090

# Command to start PocketBase
ENTRYPOINT ["/app/pocketbase", "serve", "--http=0.0.0.0:8090"]
