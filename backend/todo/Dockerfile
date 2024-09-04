FROM maven:3.9.8-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-jre-alpine
COPY --from=build /target/todo-0.0.1-SNAPSHOT.jar todo.jar
EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "todo.jar" ]