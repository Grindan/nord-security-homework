# NordLayer Frontend Task

Task: Build an application featuring login, logout, and server list pages. This project was developed to meet the specific requirements for NordLayer's frontend assignment.

🔗 **Live Deployment**: [View the live project here](https://grindan.github.io/nord-security-homework).

## 🛠️ Built With:

- **Typescript** - Strongly typed programming language.
- **Next.js (React)** - Framework for building server-side rendered React applications.
- **TailwindCSS** - Utility-first CSS framework.
- **React Context API** - For managing and storing data state.
- **Browser Storage** - Utilizing localStorage for persistence.
- **GitHub Pages** - Used for deploying the application.

## ✨ Features:

- **Single-page Application**: Quick navigation without page reloads.
- **Responsive Design**: Optimized for various screen sizes.
- **Login Logic**: Integrated with the provided API.
- **Token Management**: Tokens are saved across sessions for seamless user experience.
- **Server Fetching**: Retrieves data from the provided API.
- **Data Display**: Shows fetched data in a structured table.
- **Data Sorting**: Ability to sort data in ascending or descending order.
- **Loading States**: Provides feedback while data is being fetched.
- **Logout Logic**: Allows users to safely log out from the application.
- **Documentation**: This README for a quick start!

## 🚀 Future Improvements:

- **Generic Table Component**: Making data display more modular.
- **Enhanced UI**: Implementing a more intuitive design with smoother transitions.
- **Error Pages**: Including a 404 page for non-existent routes.
- **Test Coverage**: Increase unit and integration test coverage to a minimum of 90% for improved reliability.

## 🚀 Getting Started:

1. **Setup**: Install the required dependencies.

   ```
   npm install
   ```

2. **Running Locally**: Start the development server. It will run by default on port 3000.
   ```
   npm run dev
   ```

## 📜 Available Scripts:

To further aid development and testing, several npm scripts are provided:

- **Build the project**:

  ```
  npm run build
  ```

- **Start the project**:

  ```
  npm start
  ```

- **Lint the project**:

  ```
  npm run lint
  ```

- **Run tests in watch mode**:

  ```
  npm run test
  ```

- **Run tests for Continuous Integration**:

  ```
  npm run test:ci
  ```

- **Generate test coverage report**:
  ```
  npm run test:coverage
  ```
