# MyLotto Experience API
An experimental API using the @lotto-nz/igt-interactive-system library to replicate Mulesoft integration. Includes on-behalf functions to manage player resources without explicit player authentication.

## Technology

* NodeJs
* NestJs
* Bunyan
* Typescript

## On-behalf functions
All on-behalf player functions are mapped to __/api/onbehalf__ + __authenticated path__. For example, to retrieve a player's favourites:

```
GET http://localhost:8080/api/onbehalf/players/1000000481/favourites
```

### Available on-behalf APIs

* GET players/{playerId}/favourites
* GET players/{playerId}/blocked-games
* GET players/{playerId}/limits
* GET players/{playerId}/wallets
* GET players/{playerId}/profiles
* POST players/{playerId}/wagers