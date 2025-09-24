# Aura POS - Minimalist Point of Sale System

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zawminhtutx/Aura_POS)

> A visually stunning, minimalist, and modern web-based Point of Sale (POS) system designed for retail environments. Built on Cloudflare's edge network, it offers a lightning-fast and intuitive interface for processing sales.

Aura POS is a web-based Point of Sale (POS) system designed for modern retail. It features a dual-panel UI for an efficient workflow: one panel for managing the current transaction (cart) and another for browsing and selecting products. The system includes integrated barcode scanning capabilities using the device's camera, real-time cart updates, and a streamlined checkout process. The design prioritizes clarity, ease of use, and aesthetic elegance, making it a joy for cashiers to use on desktops or tablets.

## ✨ Key Features

- **Dual-Panel UI:** Efficiently manage the transaction cart and browse the product catalog simultaneously.
- **Real-Time Cart:** Instantly add, remove, and update item quantities with immediate feedback.
- **Product Catalog:** Search and browse products with a clean, responsive grid layout.
- **Barcode Scanning:** Use the device's camera to quickly scan and add products to the cart.
- **Modern & Minimalist Design:** A clean, intuitive interface built with `shadcn/ui` and Tailwind CSS.
- **Edge-Powered:** Built on Cloudflare Workers and Durable Objects for exceptional performance and reliability.
- **Responsive Perfection:** Flawless user experience across desktops, tablets, and mobile devices.

## 🚀 Technology Stack

- **Frontend:** React, Vite, TypeScript, Zustand
- **UI:** Tailwind CSS, shadcn/ui, Framer Motion, Lucide React
- **Backend:** Hono on Cloudflare Workers
- **Storage:** Cloudflare Durable Objects
- **Package Manager:** Bun

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Bun](https://bun.sh/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd aura-pos
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```sh
    bun install
    ```

## 💻 Development

To run the application in a local development environment, use the following command. This will start the Vite development server for the frontend and a local Wrangler server for the backend API.

```sh
bun dev
```

The frontend will be accessible at `http://localhost:3000` (or another port if 3000 is in use), and it will automatically proxy API requests to the Cloudflare Worker running locally.

## 🚀 Deployment

This project is configured for seamless deployment to Cloudflare's global network.

1.  **Login to Wrangler:**
    If you haven't already, authenticate Wrangler with your Cloudflare account.
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script, which will build the frontend application and deploy both the static assets and the worker.
    ```sh
    bun deploy
    ```

Alternatively, you can deploy your own version of this project with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/zawminhtutx/Aura_POS)

## 📂 Project Structure

The codebase is organized into three main directories:

-   `src/`: Contains the frontend React application, including pages, components, stores (Zustand), and hooks.
-   `worker/`: Contains the Hono backend application that runs on Cloudflare Workers, including API routes and entity definitions for Durable Objects.
-   `shared/`: Contains TypeScript types and mock data shared between the frontend and the backend to ensure type safety.

## 🤝 Contributing

Contributions are welcome! If you have a suggestion or find a bug, please open an issue to discuss it first.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.