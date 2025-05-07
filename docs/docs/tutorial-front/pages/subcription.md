---

sidebar_label: 'subscription.js'
title: 'subscription.js'
---

# Subscription Page Documentation

## Overview

The `subscription` component renders the Subscription page, displaying a set of pricing plans for users to choose from. It composes a container layout and maps over a predefined array of plan objects, delegating the rendering of each plan card to the `Subscription` sub-component.

## Purpose

* Provide a clear pricing structure for different subscription tiers.
* Highlight the most popular plan visually.
* List included services and display brief plan descriptions.
* Facilitate reuse by passing data into the `Subscription` component.

## File Structure

* **Location:** `pages/subscription.js` (or similar)
* **Styles:** Imports CSS module `subscription.module.css` for layout and styling.
* **Dependencies:**

  * `React` for component creation.
  * `Subscription` component for individual plan cards.

## Data Model

```js
const subscriptionArray = [
  {
    plan: "STARTER",
    price: "$5/mo",
    popular: "",
    service: [
      "Automated Reporting",
      "Faster Processing",
      "Customizations"
    ],
    info: "Literally you probably haven't heard of them jean shorts."
  },
  {
    plan: "BASIC",
    price: "$15/mo",
    popular: "POPULAR",
    service: [
      "Everything in Starter",
      "100 Builds",
      "Progress Reports",
      "Premium Support"
    ],
    info: "Literally you probably haven't heard of them jean shorts."
  },
  {
    plan: "PLUS",
    price: "$25/mo",
    popular: "",
    service: [
      "Everything in Basic",
      "Unlimited Builds",
      "Advanced Analytics",
      "Company Evaluations"
    ],
    info: "Literally you probably haven't heard of them jean shorts."
  }
];
```

Each object includes:

* `plan` (string): The name of the subscription tier.
* `price` (string): The recurring cost.
* `popular` (string): Label for the most popular plan.
* `service` (array of strings): List of features included.
* `info` (string): Brief descriptive text.

## Rendering Logic

1. **Container Layout**

   * `<div>` with root class `subscription` that centers content.
   * Nested `<div>` `subscription_box` to group info and plan cards.

2. **Header Section** (`subscription_box_info`)

   * `<h1>` displays the page title “Subscription”.
   * `<p>` shows a subtitle or descriptive caption.

3. **Plan Cards Section** (`subscription_box_box`)

   * Maps over `subscriptionArray`.
   * For each element, renders `<Subscription element={element} index={index} key={index} />`.
   * `Subscription` handles individual card layout and styling based on `element.popular`.

## Usage Example

```jsx
import React from 'react';
import SubscriptionPage from './subscription';

function App() {
  return <SubscriptionPage />;
}

export default App;
```

This will render the subscription page with three plan cards, including the “BASIC” plan marked as popular.
