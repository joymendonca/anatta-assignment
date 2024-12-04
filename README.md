
# Anatta Assignment

A simple Node.js application to search for products and get its prices.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/joymendonca/anatta-assignment.git
   ```
2. Navigate to the project directory:
   ```bash
   cd anatta-assignment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following variables to the `.env` file:
   ```env
   STORE_HANDLE=
   STORE_API_TOKEN=
   ```
3. Refer to the `.env.example` file for an example configuration.

## Usage

To run the application, use the following command:
```bash
node app.js -name <product_name>
```

### Example:
To search for a product name with the keyword `shirt`:
```bash
node app.js -name shirt
```

Replace `<product_name>` with the desired product name keyword.

## Notes

- Ensure that the `.env` file is properly configured before running the application.
- The `STORE_HANDLE` and `STORE_API_TOKEN` are required for the application to connect to the store's API.
- The `.env.example` file provides a sample template for your environment variables.

