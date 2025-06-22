# FCM Notify Server

A simple Node.js + Express server to send push notifications via **Firebase Cloud Messaging (FCM v1 API)**.  
Used with Android apps to notify users when inspections are submitted.

---

## 🔔 Features

- Sends FCM push notifications using Firebase Admin SDK
- Securely handles notification logic — no server keys in your Android app
- Supports:
  - ✅ Mainline Inspection Notification
  - ✅ Underframe Inspection Notification
- Deployable on **Render** (Free plan supported)

---

## 📦 API Endpoints

### 1. POST `/send-notification`

Sends a notification like:
> TS#1001 inspection done  
> by Peter Charles, Kevin Pinto on UP Line

#### Request Body:
```json
{
  "trainSet": "1001",
  "line": "UP",
  "engineers": ["Peter Charles", "Kevin Pinto"]
}
