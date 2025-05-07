---

sidebar_label: 'Notification.jsx'

title: 'Notification.jsx'
---

# Notification Component Documentation

## Overview

The `Notification` component renders a single notification item inside a notification panel, displaying the notifier’s avatar, name, message text, and timestamp, along with an indication for new notifications.

## Purpose

* Provide a visual list entry for user notifications in the application.
* Display relevant details: sender’s avatar, name, notification message, and time elapsed.
* Highlight unread notifications with a visual indicator.

## File Structure

* **Location:** `components/Notification/Notification.jsx` (or similar path)
* **Styles:** Imports CSS module `Notification.module.css` for layout, spacing, and styling.
* **Dependencies:**

  * `react` for component structure.
  * `next/image` for optimized image rendering.
  * `images` import for avatar assets.

## Component Structure

```jsx
<div className={Style.notification}>
  <p>Notification</p>
  <div className={Style.notification_box}>
    <div className={Style.notification_box_img}>  {/* Avatar container */}
      <Image src={images.user1} alt="profile image" width={50} height={50} />
    </div>
    <div className={Style.notification_box_info}> {/* Textual info */}
      <h4>Daniyar Munsizbaev</h4>          {/* Sender’s name */}
      <p>Be yourself</p>                  {/* Notification message */}
      <small>2 hours ago</small>         {/* Timestamp */}
    </div>
    <span className={Style.notification_box_new}></span> {/* New indicator */}
  </div>
</div>
```

## Props

This component does not receive any props currently; it renders static placeholder data. To integrate dynamically, future versions may accept:

| Prop            | Type  | Description                                                                            |
| --------------- | ----- | -------------------------------------------------------------------------------------- |
| `notifications` | array | List of notification objects with fields `avatar`, `name`, `message`, `time`, `isNew`. |

## Usage Example

```jsx
import Notification from './Notification';

function NotificationList() {
  return (
    <div>
      <Notification />
      {/* Map over an array for multiple items in future */}
    </div>
  );
}
```

---
