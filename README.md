# fruit-app

Hello! This is my implementation of the Take Home exercise!

The deployed website can be visited here:
[fruit-app](https://kaitosugimura.github.io/fruit-app/)

## Cors error

To combat the CORS error, I first tried by creating a proxy server to fetch the API that way. But since I realized the server to server was not working either. I default back to fallback data.

Upon errors, the website will show an error message with stub data.

## Website functionality

![alt text](Readme_images/LeftSideTopBar.png)

The image above shows the navigation bar on the left side of the screen. From left to right, here's what each one does:

- **First Drop Down:** Pick how you want to group the fruits.
- **Second Drop Down:** Pick your color theme (Dark Theme recommended!).
- **First Button:** Shows the fruits as a list.
- **Second Button:** Shows the fruits as a table.
  <br/>
  <br/>

![alt text](Readme_images/RightSideSettingsPanel.png)

The image above shows the settings panel that pops up when you click the "Settings" button. Here's what each row does:

- **Show Chart:** Toggle the pie chart on or off.
- **Graph by:** Choose whether to graph by total calories (quantity × calories per fruit) or just by quantity.
- **Chart Color:** Dynamic gives you a nice spread of colors that adjusts as you add more fruit types. Unique gives each fruit its own permanent color that won't change.
