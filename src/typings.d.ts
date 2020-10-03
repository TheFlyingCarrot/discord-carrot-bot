import Discord from "./internal";

declare module "*.json" {
  const value: any;
  export default value;
}

interface ExtendedClient extends Discord.Client {
  commands?: Discord.Collection<any, any>;
  debugging?: boolean;
}

/* declare module "discord.js" {
  export interface Message {
    // as is
  }
} */
