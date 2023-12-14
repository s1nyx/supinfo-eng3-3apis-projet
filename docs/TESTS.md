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

Mettre à jour un utilisateur
```bash
curl -X PATCH localhost:3000/users/<ID> \
     -H "Content-Type: application/json" \
     -d '{"email": "newemail@example.com", "username": "newUsername"}'
```

Supprimer un utilisateur
```bash
curl -X DELETE localhost:3000/users/<ID>
```

S'inscrire
```bash
curl -X POST localhost:3000/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email": "email@example.com", "username": "exemple1", "password": "yourPassword"}'
```

Se connecter
```bash
curl -X POST localhost:3000/auth/signin \
     -H "Content-Type: application/json" \
     -d '{"email": "email@example.com", "password": "yourPassword"}'
```

Se déconnecter
```bash
curl -X POST localhost:3000/auth/signout
```