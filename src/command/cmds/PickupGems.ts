import { Command } from "../Command";
import { Base } from "../../core/Base";
import { Peer } from "../../core/Peer";
import { ROLE } from "../../Constants";
import { Variant } from "growtopia.js";

export default class PickupGems extends Command {
  constructor(
    public base: Base,
    public peer: Peer,
    public text: string,
    public args: string[]
  ) {
    super(base, peer, text, args);
    this.opt = {
      command: ["pickupgems", "autopickup"],
      description: "Toggle auto pickup gems",
      cooldown: 5,
      ratelimit: 1,
      category: "`oBasic",
      usage: "/pickupgems",
      example: ["/pickupgems"],
      permission: [ROLE.BASIC, ROLE.SUPPORTER, ROLE.DEVELOPER]
    };
  }

  public async execute(): Promise<void> {
    // Toggle auto pickup gems
    this.peer.data.state.autoPickupGems = !this.peer.data.state.autoPickupGems;
    
    // Send message to player
    this.peer.send(
      Variant.from(
        "OnConsoleMessage",
        this.peer.data.state.autoPickupGems 
          ? "`2Auto pickup gems has been enabled`" 
          : "`4Auto pickup gems has been disabled`"
      )
    );

    // Save changes
    await this.peer.saveToCache();
    await this.peer.saveToDatabase();
  }
} 