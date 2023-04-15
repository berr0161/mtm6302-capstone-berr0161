# mtm6302-capstone-berr0161
Name Cesar Luis Berrio Ojeda
Student number - 041049262
Proyect- Pokédex

Part-2
I wanted to do a easy to guide design. I was inspired by the pokedex of the game pokemon platinum for nintendo 3Ds. Using a game emulator for the pc I was able to acces it. I also used gradients so it looked more modern and dynamic. The buttons were also inspired in the simple design the used on the Gameboy games with red pokemon.

Part-3

First a created an HTML and css to achieve my prototype. I wanted to work on the javascript on the javascript file to bring the pokemons form the api rather than doing 1 by one in HTML. I wanted to take the challenge for this page specificly and eventually in Capstone project part 4, use java script to bring the information of the pokemons on the second page and use the other elements we have learned such as the addEventListener.

For the Javascript file, I created a function that brings me the first 20 pokemons directly from the poke api, and then on the HTML push I specified all the information I wanted from the poke api based on my design, which is the pokemon number, pokemon name, pokemon image, and the type. This funcion will create kind of a container of each pokemon (the first 20) with the elements I mentioned previously, and then I edited in the Css. I wanted to add the 0 number before each pokemon nomber, I did some research on my own and I found out about a function that could add a number if 0 based on an if and else.

One of the challenges I faced was doing the pokemon statistics on the second page, I didn't really now how to create it in html or css, neither javascript. I started watching youtube tutorials about people creating progress bars with JavaScript, and that helped me create me a funcion with a for,if and else based on the number of bars I wanted to be in a certain color, and eveuntually added a height in css becuase there is no content so with the height they won't dissapear

Another Challenge that I faced was puting the background Color, which in my design is a gradient. However, for some reason it was overlapping, compared when I put a solid color, it worked normal, so I decided to leave a solid color for now. Something really curuios is that the gradients did work on the other parts of my design, like the little containers.

Once I had everything in my html and the javascript that brings me the stats and the pokemons, I started styling for mobile placing everything in A column. Eventually adding media queries, another challenge was that on the second page I placed the pokemon number on top of the container info, So I decided to put it under the pokemon image and eventually work with grid areas so it was easier to asign which area was gonna by occpied by each element.


Part 4

Part 4 was a step by step process which took me a lot of time looking for the specific code I wanted to add from the pokeapi, based on my design.

The first Step I took was to add a button of "Load more" and add an event listener to bring 20 more pokemons every time I cliked on the button.

Eventually I got into the process of getting into clikcing the image of the pokemon so it "clears" my page, and It shows what I had previously on a javascript file named detail-pokemon.js which showed all the pokemon data. Also I transfered that code to main.js, as well as connecting that to the poke api , adding an event listener to each image so they showed specifically the data and evolutions from each pokemon.

Another step I took is add a "Back button" with an event listener, of the pourpose of "cleaning" pokedex-container and bringing back the content of the getPokemon function (So the page doesn't reload)

During the process of creating the evolutions I realized that there were pokemons that have either 2 or 1 or none evolutions, so I created an async function (getEvolutions) that works the following way:

- If the pokemons doesn't have evolutions, don't run anythiing
- If the pokemon has 1 or more evolutions bring 1 or 2 evoultions

All this based on the evolution chain on the poke api and the lenght

Then I started to polish the detial-pokemon.js code I previouly moveD. Whioch was the longest procees. I did if else for the blue and white bars. An "if" for the weakneses and a "for" for the types. I think  the statistics bars were the longest and more complicated process of this proyect. I wasn't really sure how I was going to achive it, Knowing that the pokemon statstics have an infinite amount of variations. For this I did and if else, saying "if i < refStat, bring me the full bar" but "else, just bring me the class with bar" Also play with some math with a giant number (150) to try to cover a general number for all pokemons

After all this I got into the process of the Local Storage, wich I was really lucky I piced up pokeball images the same size becuase now it looks really nice. So I added the pokeballs images and add an if else to show the image of the closed pokeball when the open pokeball was cliked, and also to either removed or adding it to the local storage 

Agter all of this it was more of finishing some details lyke styling the buttons their padding, also adding the color to the pokemon types that I was missing (becuase on part-3 I just added the styles for the first 20)

This was a really long part of the project. It took me a whole day to finish my whole javascript, transfering everything I had form detail-pokemon.js, creating the buttons to clean the pages so It didin't reload. As I said, the hardest part for me was the bars, and maybe the local storage becuase I noticed that everytime I cliked on the pokeball, I was able to save the pokemon multiple times, but eventually I went back to the lessons and figure it out.





