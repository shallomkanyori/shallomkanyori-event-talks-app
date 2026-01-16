# Tech Talks Event Website

This project is a single-page website for a one-day technical event. It displays a schedule of talks and allows users to filter them by category.

## Project Structure

- **/src**: Contains the source files (HTML, CSS, JavaScript, and JSON data).
- **/dist**: Contains the final, compiled `index.html` file (after running the build script).
- `build.js`: A Node.js script to compile the source files into a single serverless HTML file.
- `.gitignore`: Specifies files to be ignored by Git.

## How to Build and Run

1.  **Install Dependencies**: This project requires Node.js to run the build script. No other dependencies are needed.

2.  **Build the Website**: Run the build script from the root of the project to generate the final `index.html` file in the `dist` folder.
    ```bash
    node build.js
    ```

3.  **Run the Website**:
    - Navigate to the `dist` directory:
      ```bash
      cd dist
      ```
    - Start a simple web server. For example, using Python:
      ```bash
      python3 -m http.server
      ```
    - Open your browser and go to `http://localhost:8000`.

## Features

- **Full-day schedule**: Displays all talks with their timings.
- **Dynamic search**: Filter talks by category in real-time.
- **Serverless**: The final output is a single HTML file that can be hosted on any static web host.
