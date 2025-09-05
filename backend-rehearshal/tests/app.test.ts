import request from "supertest";
import app from "../src/app";
import {Wallet} from "ethers";

describe("Backend API", () => {
  it("verify message signature", async () => {
    const wallet = Wallet.createRandom();
    // 2. Define a message
    const message = "Hello Decentralized Masters!";
    // 3. Sign the message
    const signature = await wallet.signMessage(message);

    const res = await request(app).post("/verify-signature").send({message, signature});
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("isValid");
    expect(res.body.isValid).toBe(true);
  });
});
