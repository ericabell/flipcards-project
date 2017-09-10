# Flipcard - a flashcard study app
Application that can quiz a user on different cards that they
create. Login is required to use the site and HTTP Basic Auth is
used to secure the API.

### Features:
1. User can create multiple decks for different subjects.
2. Each deck can be marked public or private.
3. User can create/edit/delete cards within a deck.
4. User can get quizzed with random cards from a deck.
5. User can rate their ease at answering and system tracks each card's history.

### API:
1. Registration can be done through the API.
2. All routes are secured with HTTP Basic Auth.
3. User can create a deck.
4. User can create, edit, and delete cards from a deck.

### API Documentation:
1. POST `/api/user`

```curl -H "Content-Type: application/json" -X POST -d '{"username":"dummy", "password":"dummy", "name": "Joe Quiz"}' http://localhost:3000/api/user```

Example response:
```{"__v":0,"username":"dummy","passwordHash":"$2a$08$vEy64gzGXx8LU6xzRUEg9ua0h80YcMxg2I01TK0K.yBuoj8yyqZ9G","name":"Joe Quiz","_id":"59b58f384f85066c3b4b7e20"}```

2. POST `/api/deck`

```curl -H "Content-Type: application/json" -X POST -d '{"deck-name":"New deck", "acccess": "public"}' -u user:pass http://localhost:3000/api/deck```

Example Response:
```{"__v":0,"description":"New deck","owner":"eabell","public":true,"_id":"59b590204f85066c3b4b7e22","cards":[]}```

3. GET `/api/deck`

```curl -v -u user:pass http://localhost:3000/api/deck```

Example Response:
```[{"_id":"59b58c706bc3fe69c5db1126","description":"Calculus","owner":"eabell","public":true,"__v":0,"cards":[{"back":"the back","front":"the front","_id":"59b58c786bc3fe69c5db1127","history":[]}]},{"_id":"59b590204f85066c3b4b7e22","description":"New desk","owner":"eabell","public":false,"__v":0,"cards":[]}]```

4. POST `/api/card`

```curl -H "Content-Type: application/json" -X POST -d '{"deckId": "59b58c706bc3fe69c5db1126", "front": "the front", "back": "the back"}' -u user:pass http://localhost:3000/api/card```

Example Response:
```{"_id":"59b58c706bc3fe69c5db1126","description":"Calculus","owner":"eabell","public":true,"__v":0,"cards":[{"back":"the back","front":"the front","_id":"59b58c786bc3fe69c5db1127","history":[]}]}```

5. PUT `/api/card`

```curl -H "Content-Type: application/json" -X PUT -d '{"deckId": "59b58c706bc3fe69c5db1126", "cardId": "59b58c786bc3fe69c5db1127", "front": "the NEW front", "back": "the NEW back"}' -u user:pass http://localhost:3000/api/card```

Example Response:
```{"_id":"59b58c706bc3fe69c5db1126","description":"Calculus","owner":"eabell","public":true,"__v":0,"cards":[{"back":"the NEW NEW back","front":"the NEW front","_id":"59b58c786bc3fe69c5db1127","history":[]},{"back":"the back","front":"the front","_id":"59b590c14f85066c3b4b7e23","history":[]}]}```

6. DELETE `/api/card`

```curl -H "Content-Type: application/json" -X DELETE -d '{"deckId": "59b58c706bc3fe69c5db1126", "cardId": "59b58c786bc3fe69c5db1127"}' -u user:pass http://localhost:3000/api/card```

```{"_id":"59b58c706bc3fe69c5db1126","description":"Calculus","owner":"eabell","public":true,"__v":1,"cards":[{"back":"the back","front":"the front","_id":"59b590c14f85066c3b4b7e23","history":[]}]}```
