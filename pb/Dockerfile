FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY pocketbase /app/pocketbase
COPY pb_migrations /app/pb_migrations
COPY pb_data /app/pb_data  # Only include if it exists!

EXPOSE 8090

ENTRYPOINT ["/app/pocketbase", "serve", "--http=0.0.0.0:8090"]
