import dotenv from "dotenv";

dotenv.config();

const args = process.argv;
const SHOPIFY_GRAPHQL_URL =
  `https://${process.env.STORE_HANDLE}.myshopify.com/admin/api/2024-10/graphql.json`;
const SHOPIFY_ADMIN_TOKEN = process.env.STORE_API_TOKEN;

(async () => {
  try {
    const nameIndex = args.indexOf("-name");
    if (nameIndex == -1 || !args[nameIndex + 1]) {
        console.error("No product name provided");
        return;
    }

    const data = {
      query: `
        query {
          products(first: 50) {
            edges {
              node {
                id
                title
                variants(first: 250) {
                  edges {
                    node {
                      id
                      title
                      price
                    }
                  }
                }
              }
            }
          }
        }
      `,
    };

    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.errors) {
      console.error("Error:", result.errors);
      return;
    }

    let products = result.data.products.edges;

    let variantData = [];
    products.forEach((product) => {
      const { id, title, variants } = product.node;
      if(title.toLowerCase().includes(args[nameIndex + 1])) {
        variants.edges.forEach((variant) => {
          const { id: variantId, title: variantTitle, price } = variant.node;
          variantData.push({title, variantTitle, price });
        });
      }      
    });

    if(variantData.length === 0) {
      console.error("Error: No products found");
      return;
    }

    variantData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    variantData.forEach((variant) => {
      console.log(`${variant.title} - ${variant.variantTitle} - $${variant.price}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
