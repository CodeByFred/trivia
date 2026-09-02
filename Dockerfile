# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy only the pom first so dependency downloads are cached
# across builds when only your source code changes
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests -B

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# Render sets $PORT at runtime — Spring Boot must bind to it
ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]