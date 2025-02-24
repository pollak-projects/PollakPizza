# 🍕 PollakPizza 🍕

## Csapattagok
- Huszár Imre
- Héja Gábor
- Sztojka Milán László

## 🛠️ Használt technológiák 🛠️
**Nyelvek**
- Vue.js
- Node.js
- CSS/SCSS

## ✨ Design ✨
[Figma - Sztojka Milán](https://www.figma.com/design/3cn4MyvbE0Tu59KtHSmrFr/Untitled?node-id=0-1&t=pQlUZ96SUX6tvnaB-1)

## Telepítési útmutató

### Frontend
1. Navigálj a mappába:
    ```sh
    cd PollakPizza
    ```
2. Inicializáld a projektet:
    ```sh
    npm init -y
    ```
3. Telepítsd a szükséges csomagokat:
    ```sh
    npm install
    ```
4. Indítsd el a weboldalt:
    ```sh
    npm run dev
    ```

### Backend
1. Navigálj a backend mappába:
    ```sh
    cd PollakPizza/backend
    ```
2. Telepítsd a szükséges csomagokat:
    ```sh
    npm install
    ```
3. Indítsd el a backendet:
    ```sh
    node .
    ```

## Projekt struktúra

### Frontend
A frontend Vue.js alapú, és a következő főbb komponensekből áll:

- `HomePage.vue`: A főoldal, ahol a felhasználók megtekinthetik az étlapot és rendelhetnek pizzát.
- `MenuPage.vue`: Az étlap oldal, ahol a felhasználók böngészhetik a pizzák listáját és rendelhetnek.

### Backend
A backend Node.js és Express alapú, és a következő főbb részekből áll:

- `app.js`: Az Express alkalmazás inicializálása és a fő útvonalak beállítása.
- `routes`: Az alkalmazás különböző útvonalai.
  - `auth.js`: Bejelentkezési és regisztrációs útvonalak.
  - `profile.js`: Felhasználói profil útvonalak.
  - `pizzas.js`: Pizzák listájának lekérdezése.
- `controllers`: Az útvonalakhoz tartozó vezérlők.
  - `loginController.js`: Bejelentkezési logika.
  - `registerController.js`: Regisztrációs logika.
- `services`: Az üzleti logika és adatbázis műveletek.
  - `loginService.js`: Bejelentkezési szolgáltatás.
  - `registerService.js`: Regisztrációs szolgáltatás.
- `middleware`: Köztes rétegek, például hitelesítés.
  - `auth.js`: JWT token hitelesítés.
- `models`: Az adatbázis modellek.
  - `db.js`: MySQL adatbázis kapcsolat beállítása.

## Tesztelés
A projekt teszteléséhez a `Jest` és `supertest` könyvtárakat használjuk.

### Tesztfájlok
A tesztfájlok a `tests` mappában találhatók:

- `authRoutes.test.js`: Tesztek a bejelentkezési és regisztrációs útvonalakhoz.
- `profileRoutes.test.js`: Tesztek a felhasználói profil útvonalakhoz.
- `pizzaRoutes.test.js`: Tesztek a pizzák listájának lekérdezéséhez.

### Tesztek futtatása
A tesztek futtatásához használd a következő parancsot a terminálban:
```sh
npm test
```

## Példák

### Bejelentkezés
A bejelentkezési útvonal a `/login` végponton érhető el. A kérésnek tartalmaznia kell az email címet és a jelszót.

Példa kérés:
```json
POST /login
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Regisztráció
A regisztrációs útvonal a `/register` végponton érhető el. A kérésnek tartalmaznia kell a felhasználó nevét, email címét, jelszavát, születési dátumát, címét és telefonszámát.

Példa kérés:
```json
POST /register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "birthdate": "1990-01-01",
  "address": "123 Test St",
  "phonenumber": "1234567890"
}
```

### Profil lekérés
A felhasználói profil lekérdezése a `/profile` végponton érhető el.

Példa kérés:
```json
GET /profile
Authorization: Bearer <token>
```

### Profil frissítése
A felhasználói profil frissítése a `/profile` végponton érhető el. A kérésnek tartalmaznia kell egy érvényes JWT tokent az Authorization fejlécben, valamint a frissítendő adatokat.

Példa kérés:
```json
PUT /profile
Authorization: Bearer <token>
{
  "name": "Updated User",
  "email": "updated@example.com",
  "address": "456 Updated St",
  "phonenumber": "0987654321"
}
```

### Pizzák lekérése
A pizzák listájának lekérdezése a `/pizzas` végponton érhető el.

Példa kérés:
```json
GET /pizzas
```

### Hibakeresés
Ha problémák merülnek fel a tesztek futtatása során, ellenőrizd a következőket:

- Győződj meg róla, hogy az adatbázis elérhető és megfelelően van beállítva.
- Ellenőrizd, hogy a szükséges csomagok telepítve vannak.
- Győződj meg róla, hogy a tesztadatok megfelelően vannak beállítva és tiszták a tesztek futtatása előtt.
