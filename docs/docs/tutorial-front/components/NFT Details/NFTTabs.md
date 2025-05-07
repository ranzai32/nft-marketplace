---
sidebar_label: 'NFTTabs.jsx'
title: 'NFTDetailsPage.jsx'
---

# NFTTabs Component Documentation

## Overview

The `NFTTabs` component renders a list of related NFT data items in a tab-like layout. Depending on the `type` prop, it supports displaying bids, provenance history, owner information, or generic metadata. If there is no data (i.e., `dataTab` is empty or undefined), the component renders nothing.

## Purpose

* To iterate over an array of data objects (`dataTab`) and render each as a styled box.
* To handle different display modes via the `type` prop:

  * **`bid`**: Show bidder address (with link), amount in ETH, and bid timestamp.
  * **`provenance`**: Show event type, from/to addresses (with links), date, and optional transaction hash link.
  * **`owner`**: Show owner avatar (if available), name (with optional verification icon), and address link.
  * **Default**: Render an image (if present), item name or index, optional icon, and date.
* To shorten long blockchain addresses for readability using a helper function.
* To link addresses and transactions to an external blockchain explorer via the `explorerBaseUrl` prop.

## Props

| Prop              | Type            | Description                                                                           |
| ----------------- | --------------- | ------------------------------------------------------------------------------------- |
| `dataTab`         | `Array<Object>` | Array of data items to display.                                                       |
| `icon`            | `ReactNode`     | Optional icon element (e.g., a checkmark) to display next to names or items.          |
| `type`            | `string`        | Determines the layout: `"bid"`, `"provenance"`, `"owner"`, or other for default case. |
| `explorerBaseUrl` | `string`        | Base URL for blockchain explorer links (e.g., `https://etherscan.io`).                |

## File Structure

This component and its styles are typically organized as:

```
components/
└── NFTTabs/
    ├── NFTTabs.jsx
    └── NFTTabs.module.css
```

```javascript title="components/NFTTabs/NFTTabs.jsx"
import React from 'react';
import Image from 'next/image';
import Style from './NFTTabs.module.css';
import { MdVerified } from 'react-icons/md';

const NFTTabs = ({ dataTab, icon, type, explorerBaseUrl }) => {
  if (!dataTab || dataTab.length === 0) {
    return null;
  }

  const shortenAddress = (address) => {
    if (!address || address.length < 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className={Style.NFTTabs}>
      {dataTab.map((item, index) => (
        <div className={Style.NFTTabs_box} key={index + 1}>
          {type === "bid" ? (
            <div className={Style.NFTTabs_box_info}>
              <span>
                Bidder:{' '}
                <a
                  href={`${explorerBaseUrl}/address/${item.bidder}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.bidder}
                  style={{ color: 'var(--icons-color)', textDecoration: 'underline' }}
                >
                  {shortenAddress(item.bidder)}
                </a>
              </span>
              <span>Amount: {item.amount} ETH</span>
              <small>Date: {item.timestamp}</small>
            </div>
          ) : type === "provenance" ? (
            <div className={Style.NFTTabs_box_info}>
              <span>Event: {item.type}</span>
              <span>
                From:{' '}
                <a
                  href={`${explorerBaseUrl}/address/${item.from}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.from}
                  style={{ color: 'var(--icons-color)', textDecoration: 'underline' }}
                >
                  {shortenAddress(item.from)}
                </a>
              </span>
              <span>
                To:{' '}
                <a
                  href={`${explorerBaseUrl}/address/${item.to}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.to}
                  style={{ color: 'var(--icons-color)', textDecoration: 'underline' }}
                >
                  {shortenAddress(item.to)}
                </a>
              </span>
              <small>Date: {item.date}</small>
              {item.transactionHash && (
                <small>
                  Tx:{' '}
                  <a
                    href={`${explorerBaseUrl}/tx/${item.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.transactionHash}
                    style={{ color: 'var(--icons-color)', textDecoration: 'underline' }}
                  >
                    {shortenAddress(item.transactionHash)}
                  </a>
                </small>
              )}
            </div>
          ) : type === "owner" ? (
            <div className={Style.NFTTabs_box_info} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name || 'Owner'}
                  width={40}
                  height={40}
                  className={Style.NFTTabs_box_img}
                />
              )}
              <div>
                <span>{item.name || 'Owner N/A'} {icon && icon}</span>
                {item.address && (
                  <small>
                    Address:{' '}
                    <a
                      href={`${explorerBaseUrl}/address/${item.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.address}
                      style={{ color: 'var(--icons-color)', textDecoration: 'underline' }}
                    >
                      {shortenAddress(item.address)}
                    </a>
                  </small>
                )}
              </div>
            </div>
          ) : (
            <>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name || 'Profile image'}
                  width={40}
                  height={40}
                  className={Style.NFTTabs_box_img}
                />
              )}
              <div className={Style.NFTTabs_box_info}>
                <span>{item.name || `Item ${index + 1}`}{icon && icon}</span>
                {item.date && <small>{item.date}</small>}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default NFTTabs;
```
