# Evaluate News NLP

Evaluate News NLP is a web application that analyzes news articles using Natural Language Processing (NLP). Users can submit a news article URL, and the app returns insights such as polarity, subjectivity, and relevant text snippets.

## Features

- **URL Submission:** Enter the URL of a news article to analyze.
- **NLP Analysis:** Get polarity, subjectivity, and text snippets from the article.
- **Offline Support:** Access the app even without an internet connection.
- **Responsive Design:** Optimized for various devices using SCSS.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/evaluate-news-nlp.git
   ```
2. **Navigate to the Project Directory**

```bash
   cd evaluate-news-nlp
```

3. **Install Dependencies:**

```bash
   npm install
```

4. **Set Up Environment Variables:**
   Create a .env file in the root directory and add your TextRazor API key:
   API_KEY=9731a21b536f82ddfba105d126077b57bddc7dafef62c60b31e15214

## Usage

## Development

Start the development server with hot reloading:

```bash

npm run start

```

- Access the App: Open http://localhost:3000 in your browser.

## Production

Build the optimized production bundle:

```bash

npm run build

```

**Deploy** : Serve the contents of the dist folder using your preferred hosting service.

**Scripts**

   ```bash
    npm run start
```
: Starts the development server.
```bash
    npm run build
  ```
        Creates a production build in the dist folder.

```bash
 npm run test
```

      Runs unit tests with Jest.
