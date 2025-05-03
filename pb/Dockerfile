FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY pocketbase /app/pocketbase
COPY pb_data /app/pb_data

EXPOSE 8090

ENTRYPOINT ["/app/pocketbase", "serve", "--http=0.0.0.0:8090"]
