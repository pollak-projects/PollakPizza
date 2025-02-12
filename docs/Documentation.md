🍕 PollakPizza 🍕
Csapattagok
Huszár Imre
Héja Gábor
Sztojka Milán László
🛠️ Használt technológiák 🛠️
Nyelvek

Vue.js
Node.js
CSS/SCSS
✨ Design ✨
Figma - Sztojka Milán

Telepítési útmutató
Frontend
Navigálj a frontend mappába:
Inicializáld a projektet:
Telepítsd a szükséges csomagokat:
Backend
Navigálj a backend mappába:
Telepítsd a szükséges csomagokat:
Projekt struktúra
Frontend
A frontend Vue.js alapú, és a következő főbb komponensekből áll:

HomePage.vue: A főoldal, ahol a felhasználók megtekinthetik az étlapot és rendelhetnek pizzát.
MenuPage.vue: Az étlap oldal, ahol a felhasználók böngészhetik a pizzák listáját és rendelhetnek.
Backend
A backend Node.js és Express alapú, és a következő főbb részekből áll:

app.js: Az Express alkalmazás inicializálása és a fő útvonalak beállítása.
routes: Az alkalmazás különböző útvonalai.
auth.js: Bejelentkezési és regisztrációs útvonalak.
profile.js: Felhasználói profil útvonalak.
pizzas.js: Pizzák listájának lekérdezése.
controllers: Az útvonalakhoz tartozó vezérlők.
loginController.js: Bejelentkezési logika.
registerController.js: Regisztrációs logika.
services: Az üzleti logika és adatbázis műveletek.
loginService.js: Bejelentkezési szolgáltatás.
registerService.js: Regisztrációs szolgáltatás.
middleware: Köztes rétegek, például hitelesítés.
auth.js: JWT token hitelesítés.
models: Az adatbázis modellek.
db.js: MySQL adatbázis kapcsolat beállítása.
Tesztelés
A projekt teszteléséhez a Jest és supertest könyvtárakat használjuk.

Tesztfájlok
A tesztfájlok a tests mappában találhatók:

authRoutes.test.js: Tesztek a bejelentkezési és regisztrációs útvonalakhoz.
profileRoutes.test.js: Tesztek a felhasználói profil útvonalakhoz.
pizzaRoutes.test.js: Tesztek a pizzák listájának lekérdezéséhez.
Tesztek futtatása
A tesztek futtatásához használd a következő parancsot a terminálban:

Példák
Bejelentkezés
A bejelentkezési útvonal a /login végponton érhető el. A kérésnek tartalmaznia kell az email címet és a jelszót.

Példa kérés:

Regisztráció
A regisztrációs útvonal a /register végponton érhető el. A kérésnek tartalmaznia kell a felhasználó nevét, email címét, jelszavát, születési dátumát, címét és telefonszámát.

Példa kérés:

Profil lekérése
A felhasználói profil lekérdezése a /profile végponton érhető el. A kérésnek tartalmaznia kell egy érvényes JWT tokent az Authorization fejlécben.

Példa kérés:

Profil frissítése
A felhasználói profil frissítése a /profile végponton érhető el. A kérésnek tartalmaznia kell egy érvényes JWT tokent az Authorization fejlécben, valamint a frissítendő adatokat.

Példa kérés:

Pizzák lekérése
A pizzák listájának lekérdezése a /pizzas végponton érhető el.

Példa kérés:

Hibakeresés
Ha problémák merülnek fel a tesztek futtatása során, ellenőrizd a következőket:

Győződj meg róla, hogy az adatbázis elérhető és megfelelően van beállítva.
Ellenőrizd, hogy a szükséges csomagok telepítve vannak.
Győződj meg róla, hogy a tesztadatok megfelelően vannak beállítva és tiszták a tesztek futtatása előtt.
Kapcsolat
Ha bármilyen kérdésed vagy problémád van a projekttel kapcsolatban, kérlek, vedd fel a kapcsolatot a csapattagokkal.
