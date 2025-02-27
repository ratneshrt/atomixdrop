# AtomixDrop

AtomixDrop is a decentralized peer-to-peer (P2P) file-sharing web application built using Next.js, Tailwind CSS, Socket.IO, and WebRTC. The app enables users to transfer files directly between peers without relying on a central server for file storage.

## Features
- **Instant Room Creation**: A unique room is automatically created when a user visits the app.
- **WebRTC-based P2P File Transfer**: Ensures secure and fast file sharing directly between peers.
- **WebSocket Signaling**: Uses WebSocket for efficient connection establishment between peers.
- **Real-Time File Transfer Progress**: Displays transfer speed and progress in real-time.
- **Simple UI**: Built with Tailwind CSS for a sleek and minimal design.

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Socket.IO for signaling
- **P2P Communication**: WebRTC
- **State Management**: React Hooks
- **Worker Threads**: For handling file transfers efficiently

## Installation
### Prerequisites
- Node.js >= 16
- npm or yarn

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/atomixdrop.git
   cd atomixdrop
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file and add the following:
   ```sh
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works
1. A unique room ID is generated when a user visits the site.
2. The user can share the room link with another peer.
3. When the second user joins, a WebRTC peer-to-peer connection is established.
4. The sender selects a file, and the transfer begins.
5. The recipient can download the received file after the transfer completes.

## License
This project is licensed under the MIT License.

---

Feel free to contribute and enhance AtomixDrop!

