import consola from "consola";

export class ErrorLogger {
  private static WEBHOOK_URL = "https://discord.com/api/webhooks/1361686434217463818/d7x8rFFwfKOkt6rkcA5WG9GxRhoOYeoW5-WnMKFc9jxHwIMdrM2Zigo9Tus0Iq392GQH";

  public static async logError(error: Error, context?: string) {
    try {
      const errorMessage = {
        embeds: [{
          title: "Error Occurred",
          description: "```" + error.stack + "```",
          color: 0xFF0000,
          fields: [
            {
              name: "Error Type",
              value: error.name,
              inline: true
            },
            {
              name: "Context",
              value: context || "No context provided",
              inline: true
            }
          ],
          timestamp: new Date().toISOString()
        }]
      };

      // Log to console
      consola.error(`[${context}] ${error.message}`);
      
      // Send to Discord webhook
      const response = await fetch(this.WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(errorMessage)
      });

      if (!response.ok) {
        consola.error("Failed to send error to Discord webhook:", await response.text());
      }
    } catch (webhookError) {
      consola.error("Failed to log error:", webhookError);
    }
  }
} 