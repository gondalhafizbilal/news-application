## News_Application

A user interface for news aggregator website that pulls articles from various sources and displays them in a clean,
easy-to-read format.

## Stack

1. node
2. react
3. bootstrap

## Description

This is a front-end project developed using React.js for the purpose of creating a news aggregator website. The website pulls articles from various sources and displays them in a clean, easy-to-read format. Users can search for articles by keyword and filter the results by date, category, and source. Additionally, users can customize their news feed by selecting preferred sources, categories, and authors.

## Data sources that are used for news

1. **NewsAPI**: This is a comprehensive API that allows developers to access articles from more than 70,000 news sources, including major newspapers, magazines, and blogs. The API provides access to articles in various languages and categories, and it supports search and filtering.
2. **The Guardian**: This API allows developers to access articles from The Guardian newspaper, one of the most respected news sources in the world. The API provides access to articles in various categories and supports search and filtering.
3. **New York Times**: This API allows developers to access articles from The New York Times, one of the most respected news sources in the world. The API provides access to articles in various categories and supports search and filtering.

## Features

1. Article search and filtering: Users can search for articles by keyword and filter the results by date, category, and source.
2. Personalized news feed: Users can customize their news feed by selecting preferred sources, categories, and authors.
3. Mobile-responsive design: The website is optimized for viewing on mobile devices.

## Prerequisite

1. Install node version > 16
2. Install react version > 18

## Instructions to run app with Docker Containerization

To containerize the Frontend application using Docker, follow these steps:

1. Rename `.env.sample` to `.env`
2. Make sure Docker is installed on your machine.
3. Build the Docker image and run the Docker container by running the following command in the project directory:
   `Docker compose up`
4. Open your web browser and navigate to http://localhost:3000.

## Instructions to run app without containerization

1. Rename `.env.sample` to `.env`
2. Update the API Keys, you just need provide the keys for the api's used.
3. `npm install`
4. `npm start` (to start the app)
5. Open your web browser and navigate to http://localhost:3000

## Assumptions
I have used 3 apis as a source filter. So I can use 3 different apis at the same time. In the articles where no image url was found in any of the apis I used a dummy image.
There was no author field available in **The Guardian** apis so I skipped the author filter when the source **The Guardian** was selected.
