Créer un utilisateur
```bash
 curl -X POST localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"email": "example@example.com", "username": "exampleUser", "password": "examplePassword", "role": "user"}'
```

Récupérer les informations d'un utilisateur
```bash
> curl -X GET localhost:3000/users/<ID>
```