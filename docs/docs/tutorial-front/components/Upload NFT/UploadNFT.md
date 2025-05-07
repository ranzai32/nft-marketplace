---

sidebar\_label: 'UploadNFT.jsx'
title: 'UploadNFT.jsx'
---

# UploadNFT Component Documentation

## Overview

The `UploadNFT` component provides a comprehensive form-based interface for creating a new NFT. It integrates file upload via the `DropZone` component, collects various metadata fields (name, price, website, description, royalties, size, category, properties), and triggers the NFT creation process through provided callbacks.

## Purpose

* To render and manage all input fields required for minting an NFT.
* To handle file selection and upload to IPFS using the `DropZone` component.
* To collect metadata (name, price, website, description, royalties, file size, category, properties) from the user.
* To call `createNFT` with the assembled data and uploaded image, and navigate on success.

## File Structure

* **Component file**: `UploadNFT.jsx`
* **Styles**:

  * `UploadNFT.module.css` (component-specific layout and styling)
  * `Form.module.css` (shared form input styles from account page)
* **Dependencies**:

  * `react` hooks (useState)
  * `next/image` for optimized images
  * `next/router` for navigation
  * `react-icons` for input adornment icons
  * `DropZone` for IPFS file uploads
  * `Button` component for actions

## Props

| Prop         | Type     | Description                                                        |
| ------------ | -------- | ------------------------------------------------------------------ |
| uploadToIPFS | Function | Callback to upload a selected file to IPFS.                        |
| createNFT    | Function | Callback to mint the NFT on-chain with provided metadata and file. |

## State

| State         | Type      | Initial | Description                                |
| ------------- | --------- | ------- | ------------------------------------------ |
| `price`       | String    | `""`    | Price entered by the user.                 |
| `active`      | Number    | `0`     | Index of the selected collection category. |
| `name`        | String    | `""`    | NFT item name.                             |
| `website`     | String    | `""`    | External link for additional details.      |
| `description` | String    | `""`    | Textual description supporting markdown.   |
| `royalties`   | String    | `""`    | Royalty percentage (e.g., "20%").          |
| `fileSize`    | String    | `""`    | File size label (e.g., "160MB").           |
| `category`    | String    | `0`     | Category label chosen from slider.         |
| `properties`  | String    | `""`    | Additional NFT properties.                 |
| `image`       | File/null | `null`  | Selected file for IPFS upload.             |

## Category Selection

The component maps over a predefined `categoryArray` to render selectable tiles:

```javascript
const categoryArray = [
  { image: images.nft_image_1, category: "Sports" },
  // ... other categories
];
```

Clicking a tile sets `active` and `category` accordingly.

## Actions

* **Upload Button**: Validates that an `image` is selected, assembles `formInput` object, then calls:

  ```javascript
  await createNFT(formInput, image, router);
  ```
* **Review Button**: Present in UI but currently has no handler; reserved for future review flow.

## Example Usage

```jsx
<UploadNFT
  uploadToIPFS={handleUploadToIPFS}
  createNFT={handleCreateNFT}
/>
```

Exported as default from `UploadNFT.jsx`.
