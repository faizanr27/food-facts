
## Food Facts App
This web application allows users to search for product details using the OpenFoodFacts API and provides a paginated view of product lists. It displays detailed information about each product, such as ingredients, nutrition facts, and labels.
The app allows users to search, sort, and filter products by category.
## Features

- **Product Search**: Search for products using keywords.
- **Product Sort**: Sort products by name, category, or other criteria.
- **Category Filter**: Filter products based on selected categories.
- **Pagination**: Navigate through the list of products.
- **Product Details**: View detailed information about each product, including ingredients, nutrition facts, and labels.



## Technologies Used
- **Frontend**: React, Tailwind CSS
- **API**: OpenFoodFacts
## Installation


1. **Clone the repository:**

```bash
git clone https://github.com/faizanr27/food-facts.git

```
2. Navigate into the project directory:
```bash
cd food-facts

```

3. Install dependencies:
```bash
npm install
```
4. Run the development server:
```bash
npm run dev
```
## Folder Structure
```
.
├── src
│   ├── components
|   |   ├── Navbar.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Pagination.jsx
|   |   ├── ProductList.jsx
│   │   
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md

```
## Usage

### Fetch Product Details

- Enter a valid product ID in the URL to view details. The ProductDetails component fetches data from the OpenFoodFacts API and displays it in a user-friendly layout.

### Pagination
- The Pagination component allows users to navigate through multiple pages of product data. The current page is highlighted, and clicking on a page number will fetch data for that page.

## API Reference

This app uses the OpenFoodFacts API for fetching product details. You can find more details about the API at OpenFoodFacts API Documentation.

## Contributing

We welcome contributions! Please follow these steps:

 1. Fork the repository
 2. Create a new branch: `git checkout -b feature-branch-name`
 3. Make your changes and commit them: `git commit -m 'Add some feature'`
 4. Push to the branch: `git push origin feature-branch-name`
 5. Submit a pull request
## Contact

For questions or feedback, please open an issue on the GitHub repository.

---

Happy coding!
## Acknowledgements

- [OpenFoodFacts API](https://openfoodfacts.org/)

## Problems Faced and Solutions

### Pagination and State Management

- Problem: Managing state for the current page, sorting, and category filtering caused inconsistencies in rendering the correct set of products.
- Solution: Utilized React's useState and useEffect hooks to maintain a consistent state across these features. Ensured that state changes triggered appropriate data fetching and updates, allowing smooth transitions between pages and accurate filtering/sorting.
## Time Taken to Complete the Assignment
The assignment was completed between September 19 and September 22.