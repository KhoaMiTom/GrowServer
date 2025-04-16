import { Base } from "../core/Base";
import { Peer } from "../core/Peer";
import { Webhook } from "../utils/Webhook";

export class DisconnectListener {
  constructor(public base: Base) {}

  public run(netID: number): void {
    const peer = new Peer(this.base, netID);
    const username = peer.data?.tankIDName;
    const ip = peer.data?.ip || "unknown";

    if (username) {
      // Send logout webhook
      Webhook.sendConnectionEvent(username, "logout", ip);
    }

    peer.disconnect();
  }
}
