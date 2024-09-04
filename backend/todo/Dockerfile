FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/todo-0.0.1-SNAPSHOT.jar /app/todo-app.jar

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "todo.jar" ]