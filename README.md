# Fitness Microservices — AI-Powered Fitness Platform

A full-stack fitness platform built using **React, Spring Boot Microservices, Microsoft SQL Server, and AI-powered fitness recommendations**. The project demonstrates microservices architecture, asynchronous messaging, centralized authentication, and service discovery.
### AI-Powered Fitness Recommendations

- Integrated the **Google Gemini API** to generate AI-powered fitness recommendations.
- Analyzes user activity data to provide personalized workout suggestions and fitness insights.
- Uses a microservices architecture with RabbitMQ for asynchronous communication between the Activity Service and AI Service.
- Helps deliver scalable, intelligent, and personalized fitness guidance.

## Key Features

- **Microservices Architecture** — Independent services for user management, activity tracking, and AI recommendations.
- **AI-Powered Recommendations** — A dedicated AI service processes fitness activity information.
- **Asynchronous Messaging** — RabbitMQ transfers activity messages from the Activity Service to the AI Service.
- **API Gateway** — Centralized entry point for frontend API requests.
- **Authentication and Authorization** — Keycloak, OAuth 2.0, OpenID Connect, and JWT.
- **Service Discovery** — Eureka Server.
- **Centralized Configuration** — Spring Cloud Config Server.
- **Database Persistence** — Microsoft SQL Server.
- **Modern Frontend** — React, Vite, Axios, and CSS.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, JavaScript, Vite, Axios, CSS |
| Backend | Java, Spring Boot, Spring Web |
| Microservices | Spring Cloud Gateway, Eureka, Config Server |
| Security | Keycloak, OAuth 2.0, OpenID Connect, JWT |
| Messaging | RabbitMQ |
| Database | Microsoft SQL Server |
| Development Tools | Eclipse IDE, Node.js, npm, Postman |

## Architecture

```text
                  React Frontend
                        |
                        v
                   API Gateway
                        |
              +---------+----------+
              |                    |
              v                    v
         User Service        Activity Service
              |                    |
              v                    v
         SQL Server             RabbitMQ
                                   |
                                   v
                               AI Service
                                   |
                                   v
                       Fitness Recommendations

Supporting Services:
Keycloak | Eureka Server | Config Server
```

## Microservices

| Service | Responsibility |
|---|---|
| [userservice](https://github.com/arbaj-silar/fitness-microservices/tree/main/userservice) | User and profile management |
| [activityservice](https://github.com/arbaj-silar/fitness-microservices/tree/main/activityservice) | Fitness activity management and message publishing |
| [aiservice](https://github.com/arbaj-silar/fitness-microservices/tree/main/aiservice) | AI-based fitness recommendation processing |
| [apigateway](https://github.com/arbaj-silar/fitness-microservices/tree/main/apigateway) | API routing |
| [configserver](https://github.com/arbaj-silar/fitness-microservices/tree/main/configserver) | Centralized configuration |
| [eurekaserver](https://github.com/arbaj-silar/fitness-microservices/tree/main/eurekaserver) | Service registration and discovery |
| [fitness-app-frontend](https://github.com/arbaj-silar/fitness-microservices/tree/main/fitness-app-frontend) | React user interface |

## AI Recommendation Workflow

1. The user submits fitness activity data through the React frontend.
2. The API Gateway routes the request to the Activity Service.
3. The Activity Service validates and stores activity data in Microsoft SQL Server.
4. The Activity Service publishes a message to RabbitMQ.
5. The AI Service consumes the message and processes the activity information.
6. The generated recommendation is returned or retrieved through the mechanism implemented by the application.

RabbitMQ decouples activity processing from recommendation generation, allowing the services to communicate asynchronously.

## Run Locally

### Prerequisites

- Java and Maven
- Node.js and npm
- Microsoft SQL Server
- Keycloak
- RabbitMQ
- Eclipse IDE
- Postman

### Startup Steps

1. Start Microsoft SQL Server and configure the database.
2. Start Keycloak and configure the required realm, clients, and roles.
3. Start RabbitMQ.
4. Start Eureka Server and Config Server.
5. Start User Service, Activity Service, and AI Service.
6. Start API Gateway.
7. Start the frontend.

From the frontend directory, run:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. For Spring Boot services, run the main application class in Eclipse or use `mvn spring-boot:run` from the service directory.

## Configuration

Configure the Microsoft SQL Server datasource in the relevant service configuration. Example:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=FitnessDB;encrypt=true;trustServerCertificate=true
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Update the database name and connection settings for your environment.

Configure the frontend API base URL, Keycloak issuer, and RabbitMQ connection settings according to your project's configuration files.

**Security:** Never commit database passwords, Keycloak client secrets, API keys, access tokens, or private environment files to GitHub. Use environment variables for secrets.

## Troubleshooting

| Issue | What to Check |
|---|---|
| API request fails | API Gateway URL and backend service status |
| `401 Unauthorized` | Keycloak token, issuer URL, and authentication |
| `403 Forbidden` | User roles and backend authorization |
| Service not registered | Eureka connection and service configuration |
| AI recommendation not processed | RabbitMQ connection, queues, exchanges, and routing keys |
| Database connection fails | SQL Server status, port, credentials, and JDBC driver |

## Project Goal

This project demonstrates practical implementation of **microservices, asynchronous communication, AI integration, secure authentication, and relational database persistence** in a full-stack application.

---

*Project documentation for recruiters and developers. Service ports and implementation details should be verified against the current source code.*
