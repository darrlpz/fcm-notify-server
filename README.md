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

2. POST /send-underframe-notification
Sends a notification like:

TS#1001 underframe inspection done
by Darryl Lopes at A-2 Pit

Request Body:
json
Copy
Edit
{
  "trainSet": "1001",
  "location": "A-2 Pit",
  "engineers": ["Darryl Lopes"]
}
🚀 Deployment (Render)
Fork or clone this repo

Create a Firebase project → go to Service Accounts

Generate firebase-key.json and place in root

Add it as a Secret File in Render:

Name: firebase-key.json

Value: (paste minified JSON)

Render settings:

Build command: npm install

Start command: npm start

Done! Your app is live at https://your-app.onrender.com

📱 Android Integration (Volley)
kotlin
Copy
Edit
val json = JSONObject().apply {
    put("trainSet", "1001")
    put("location", "A-2 Pit")
    put("engineers", JSONArray(listOf("Darryl Lopes")))
}
val request = JsonObjectRequest(Method.POST, "https://your-app.onrender.com/send-underframe-notification", json,
    { response -> Log.d("FCM", "Success: $response") },
    { error -> Log.e("FCM", "Error: ${error.message}") }
)
Volley.newRequestQueue(context).add(request)
