---
sidebar\_label: 'DropZone.jsx'
title: 'DropZone.jsx'
---

# DropZone Component Documentation

## Overview

The `DropZone` component provides an interactive drag-and-drop interface for uploading image files (PNG/JPEG) to IPFS. It displays upload instructions, shows a preview of the uploaded image, and renders metadata fields for review once a file is selected.

## Purpose

* To allow users to drag-and-drop or click to select an image file within a styled drop zone.
* To handle file validation (type and size) via `react-dropzone`.
* To upload the selected file to IPFS using the provided `uploadToIPFS` callback.
* To render a preview of the uploaded image along with associated NFT metadata (name, website, description, royalties, file size, category, and properties).

## Props

| Prop           | Type     | Description                                                                      |
| -------------- | -------- | -------------------------------------------------------------------------------- |
| `title`        | `string` | Primary instruction text displayed inside the drop zone.                         |
| `heading`      | `string` | Secondary heading text shown below the upload icon.                              |
| `subHeading`   | `string` | Additional descriptive text beneath the heading.                                 |
| `name`         | `string` | NFT name to display in the preview pane.                                         |
| `website`      | `string` | URL or name of the associated website, shown in the preview.                     |
| `description`  | `string` | Text description of the NFT, rendered in the preview section.                    |
| `royalties`    | `string` | Royalty details to display (e.g., "2.5%").                                       |
| `fileSize`     | `string` | File size information (e.g., "4.2 MB").                                          |
| `category`     | `string` | Category label for the NFT (e.g., "Art", "Collectible").                         |
| `properties`   | `string` | Comma-separated list of custom properties or attributes.                         |
| `setImage`     | `func`   | Callback function to update parent state with the uploaded image URL.            |
| `uploadToIPFS` | `func`   | Async function that handles uploading the file to IPFS and returns the file URL. |

## File Structure

The component resides at:

```
DropZone/DropZone.jsx
DropZone/DropZone.module.css
```

## Usage Example

```javascript title="DropZone.jsx"
import React, { useState } from 'react';
import DropZone from './DropZone';

const CreateNFT = () => {
  const [imageURL, setImageURL] = useState('');

  const uploadToIPFS = async (file) => {
    // Implementation for IPFS upload
    const url = await someIPFSUploadService(file);
    return url;
  };

  return (
    <DropZone
      title="Upload your NFT image"
      heading="Drag & Drop or Click to Upload"
      subHeading="PNG, JPG up to 5MB"
      name="My First NFT"
      website="example.com"
      description="This NFT represents..."
      royalties="2.5%"
      fileSize=""
      category="Art"
      properties="Rare, Limited Edition"
      setImage={setImageURL}
      uploadToIPFS={uploadToIPFS}
    />
  );
};

export default CreateNFT;
```

If no file has been uploaded yet, only the drop zone is rendered. Once a file is dropped and successfully uploaded, the preview pane appears showing the image and metadata.
