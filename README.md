# DailyTrends API

DailyTrends is an API service built with Node.js, TypeScript, MongoDB, Docker, and Jest. The service provides the top five latest news from the main pages of El País and El Mundo, two popular Spanish newspapers. Besides providing the latest news, DailyTrends offers full CRUD functionality to create, read, update, and delete custom news items.

## Table of Contents

- Technologies Used
- Project Structure
- Installation and Setup
- API Endpoints
- Future Improvements

## Installation and Setup

### Prerequisites

- Node.js (latest LTS version)
- Docker and Docker Compose
- MongoDB (if running locally)
- SuperTest (for integration/API testing)

### Running the Project

1. Clone the Repository.

```bash
git clone git@github.com:miikorz/DailyTrends.git
cd dailytrends
```

2. Run with Docker: Build and start the application and MongoDB container using Docker Compose.

```bash
docker-compose up --build
```

The API will be available at http://localhost:3000.

3. Run Tests: To run tests with Jest:

```bash
npm test
```

## API Endpoints

1. **Create feeds**

- **POST** `/feed`
- **Request Body**:

```json
{
  "title": "Sample News",
  "description": "Detailed description of the news",
  "author": "Author Name",
  "link": "https://example.com",
  "portrait": "https://example.com/image.jpg",
  "newsletter": "El Pais"
}
```

2. **Get news by ID**

- **GET** `/feed/:id`
- **Response**: Returns a JSON object of the news item with the specified ID.

3. **Update feeds by ID**

- **PUT** `/feed/:id`
- **Request Body**: Only the fields to be updated

```json
{
  "title": "Sample News",
  "description": "Detailed description of the news",
  "author": "Author Name",
  "link": "https://example.com",
  "portrait": "https://example.com/image.jpg",
  "newsletter": "El Pais"
}
```

4. **Delete feeds by ID**

- **DELETE** `/feed/:id`

5. **List of feeds**

- **GET** `/feed`
  Fetches the top 5 latest news articles from El País and El Mundo main pages (and the manually ones added) using web scraping and return them along with the manually stored news.

## Future Improvements

In the future, the following improvements could be implemented:

1.  **Authentication and Authorization**:
    Add JWT-based authentication to restrict access to certain endpoints, e.g., allow only authorized users to create, update, or delete news.

2.  **Cache Management**:
    Introduce caching to minimize the frequency of web scraping from external sites and improve response times for frequently accessed endpoints.

3.  **Error Handling and Logging**:
    Implement a global error handler and structured logging for better troubleshooting and monitoring.

4.  **Rate Limiting and Throttling**:
    Limit the number of requests from each user to avoid overloading the scraping functionality and external site requests.

5.  **Data Validation and Sanitization**:
    Use a library like Joi or class-validator to ensure that data input conforms to the expected schema and is secure.

6.  **CI/CD Pipeline**:
    Set up a CI/CD pipeline for automated testing, linting, and deployment of the application on code pushes.

## API DIAGRAM

![alt text](https://github.com/miikorz/DailyTrends/blob/main/diagram-dailytrends.png?raw=true)
