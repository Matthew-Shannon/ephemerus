# Ephemerus

Procedural generated text & image based role playing game using ChatGPT & DallE.

Player input -> ChatGPT (text) -> DallE (image)

## Installation
### Clone repo
```bash
git clone https://github.com/Matthew-Shannon/ephemerus.git && cd ephemerus
```

### Install depenencies
```bash
npm --prefix client install && npm --prefix server install
```

### Setup Client Env

```bash
nano ./client/.env

Paste the following:
REACT_APP_BASE_URL="http://localhost"
PORT=80
```

### Setup Server Env
```bash 
nano ./server/.env

Paste the following:
BASE_URL="http://localhost"
OPEN_AI_KEY="api key goes here"
```

## How to Use?
```bash
npm run start
``` 

## Contribute
mshannon93@gmail.com

## Credits
Matthew Shannon

## License
MIT License
