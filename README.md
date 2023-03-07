# Ephemerus

Procedural generated text & image based role playing game using ChatGPT & DallE.

Player input -> ChatGPT (text) -> DallE (image)

## Installation
```bash
git clone https://github.com/Matthew-Shannon/ephemerus.git && cd ephemerus

npm --prefix client install && npm --prefix server install

nano ./client/.env
REACT_APP_BASE_URL="http://localhost"
PORT=80

nano ./server/.env
BASE_URL="http://localhost"
OPEN_AI_KEY="api key goes here"

## How to Use?
Development setup
```bash
npm run start
``` 

## Contribute
mshannon93@gmail.com

## Credits
Matthew Shannon

## License
MIT License
