# N-Word-Counter
A Simple N Word counter bot in JavaScript.

### Commands:
  - .help
  - .counter [member]
  
### Listeners:
  - Message listener that checks if a message contains "nigger" or "nigga". If it does itll either A: Add the member to the stats file and set their count as 1, or add to their current count if they already exist.

### Library:
  - Alongside my decision to make a Java Spigot Utility Library for Minecraft development, I'm considering making a JavaScript Discord Utils Library as well, and it will contain features of my Utils class in this bot, and more. You should be able to install it using `npm install DiscordUtils.js` when it releases, if I can reserve that repository name.

### This is how the stats are stored:

```json
{
  "Members": {
    "ID-Of-Member-Here": {
      "Server-Name": [
        0,
        0
      ]
    }
  }
}
```
