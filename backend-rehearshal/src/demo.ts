import fetch from "node-fetch";
import { Wallet } from "ethers";

async function demo() {
  // 1. Create a random wallet
  const wallet = Wallet.createRandom();

  // 2. Define a message
  const message = "Hello Decentralized Masters!";

  // 3. Sign the message
  const signature = await wallet.signMessage(message);

  console.log("Message:", message);
  console.log("Signature:", signature);
  console.log("Wallet Address:", wallet.address);

  // 4. Send to backend
  const res = await fetch("http://localhost:5001/verify-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, signature }),
  });

  const data = await res.json();
  console.log("Backend response:", data);
}

demo();