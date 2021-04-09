# A little game

## Deployment

    python -m SimpleHTTPServer

open browser with http://localhost:8000/index.html

## Architectur

some rules on data-flow

* game-objects are created only within data.js

* game-objects fire events when created, changed, deleted. game.js subscribes to this events and calls the corresponding UI objects

* UI objects which represent game-objects get their game-object via constructor

* UI objects hold their children

* new UI objects are created via their parent