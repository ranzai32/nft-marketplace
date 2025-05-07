---
sidebar_position: 1
---

# SmartContract Guide

This guide will walk you through creating the necessary API credentials and finding your dedicated gateway URL on Pinata for storing your NFT assets and metadata on IPFS.

For more info you can check official Pinata documentation: `https://docs.pinata.cloud/quickstart`

## Prerequisites

* A Pinata account. If you don't have one, sign up at [https://www.pinata.cloud/](https://www.pinata.cloud/).

## Step 1: Creating a Pinata API Key

Pinata API Keys are used to authenticate your application when interacting with the Pinata API (e.g., for uploading files). It's recommended to use a JWT (JSON Web Token) for better security.

1.  **Log In to Pinata:** Go to [pinata.cloud](https://www.pinata.cloud/) and log in to your account.
2.  **Navigate to API Keys:** Once logged in, click on your profile icon or name in the top right corner, and select "API Keys" from the dropdown menu.
3.  **Create New Key:**
    * Click the "+ New Key" button.
    * **Admin Permissions:** For simplicity during development, you can initially toggle "Admin" permissions ON. This grants all permissions.
        * **For more granular control (recommended for production):** Keep "Admin" OFF. You will then need to specify permissions for different endpoints. For this NFT marketplace project, you primarily need:
            * **Files (Pinning Services):** Enable **Write** (to allow `pinFileToIPFS` and `pinJSONToIPFS`). You can optionally enable Read if you plan to manage pins via the API.
            * Other sections like "Groups," "Gateways," "Analytics," "Legacy Endpoints," and "Data" can usually be left with "None" or "Read" permissions unless you have specific needs for them.
    * **Key Name:** Give your key a descriptive name, for example, "Artify NFT Marketplace Key" or "My NFT Project Key".
    * Click the "Create Key" button.
4.  **Copy Your Credentials:**
    * A pop-up window will appear showing your:
        * **API Key**
        * **API Secret**
        * **JWT (Recommended)**
    * **Important:** Copy all three of these values immediately and store them securely (e.g., in a password manager or a secure note). **The API Secret and JWT will only be shown once.** If you lose them, you'll need to generate a new key.
    * For this project, we primarily use the **JWT**.

## Step 2: Finding Your Dedicated Gateway URL

Pinata provides a dedicated IPFS gateway for your account, which is generally faster and more reliable for accessing your pinned content than public gateways.

1.  **Navigate to Gateways:** In your Pinata dashboard, look for a section or tab named "Gateways" in the left-hand sidebar.
2.  **Identify Your Gateway:** You should see a list of your available gateways. Usually, Pinata creates a default dedicated gateway for you when you sign up.
    * The URL will look something like: `your-unique-gateway-name.mypinata.cloud` (e.g., `aquamarine-known-mastodon-402.mypinata.cloud`).
3.  **Copy the Gateway URL:** Copy this full URL. This is the URL you will use to access your IPFS content (e.g., `https://your-gateway-name.mypinata.cloud/ipfs/<YOUR_CONTENT_CID>`).

## Step 3: Using Credentials in Your Project

You will use these credentials in your Next.js application's environment variables.

1.  **Create `.env.local` file:** In the root directory of your Next.js project, create a file named `.env.local` (if it doesn't already exist).
2.  **Add Variables:** Add the following lines to your `.env.local` file, replacing the placeholder values with your actual Pinata JWT and Gateway URL:

    ```env
    NEXT_PUBLIC_PINATA_JWT=PASTE_YOUR_PINATA_JWT_HERE
    NEXT_PUBLIC_PINATA_GATEWAY_URL=[https://your-gateway-name.mypinata.cloud](https://your-gateway-name.mypinata.cloud)

    # You can also store these if you plan to use API Key/Secret method for some reason
    # NEXT_PUBLIC_PINATA_API_KEY=PASTE_YOUR_PINATA_API_KEY_HERE
    # NEXT_PUBLIC_PINATA_SECRET_API_KEY=PASTE_YOUR_PINATA_SECRET_API_KEY_HERE
    ```

3.  **Add to `.gitignore`:** Ensure that `.env.local` is listed in your project's `.gitignore` file to prevent your secret keys from being committed to version control.
    ```
    # .gitignore
    .env.local
    ```
4.  **Restart Your Development Server:** After creating or modifying the `.env.local` file, you **must** restart your Next.js development server for the changes to take effect:
    ```bash
    npm run dev
    ```

Your application should now be configured to use your Pinata account for IPFS operations using the JWT for authentication and your dedicated gateway for accessing content.