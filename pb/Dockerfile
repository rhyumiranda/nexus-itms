# Use the official Alpine image as a base
FROM alpine:latest

# Install necessary packages
RUN apk --no-cache add ca-certificates

# Copy the PocketBase executable into the container
COPY pocketbase /pb/pocketbase

# Expose the PocketBase port (default is 8090)
EXPOSE 8090

# Command to start PocketBase
ENTRYPOINT ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090"]
