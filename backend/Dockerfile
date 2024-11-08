FROM ubuntu:latest
LABEL authors="mozgosup"

ENTRYPOINT ["top", "-b"]

# Use an official JDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the project's JAR file into the container
COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port on which the app runs
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
