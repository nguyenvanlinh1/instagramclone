FROM maven:amazoncorretto AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn package -DskipTests

FROM amazoncorretto:23-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]