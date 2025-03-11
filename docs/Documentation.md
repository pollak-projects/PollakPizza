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

## Database
Az adatbázis felépítése:
a. pizzas tábla
A pizzák adatait tárolja.

Oszlop	Típus	       Leírás
id	    INT	Egyedi     pizza azonosító.
name	VARCHAR(255)   A pizza neve (pl. Margherita).
price	INT	           A pizza alapára.
image	VARCHAR(255)   URL útvonal a pizza képéhez.

b. size tábla
A pizzaméreteket és az árnövekményeket tartalmazza.

Oszlop	    Típus	        Leírás
id	        INT	            Egyedi méret azonosító.
size	    INT	            A pizza mérete (pl. 12, 16).
multiPrice	Decimal(10,0)	Méret alapján árnövekmény.

c. toppings tábla
Az elérhető feltéteket és azok többletköltségeit tárolja.

Oszlop	    Típus	     Leírás
id	        INT	         Egyedi feltét azonosító.
name	    VARCHAR(255) A feltét neve (pl. Sajt).
bonusPrice	INT	         A feltétért járó többletköltség.
d. users tábla

A felhasználók adatait tárolja.

Oszlop	                Típus	        Leírás
id	                    INT        	    Egyedi felhasználói azonosító.
name	                VARCHAR(255)	A felhasználó teljes neve.
email	                VARCHAR(255)	A felhasználó email címe.
password	            VARCHAR(255)	A felhasználó jelszava (titkosított).
birthdate	            DATE	        A felhasználó születési dátuma.
address	                VARCHAR(255)	Kiszállítási cím.
admin	                TINYINT	        Admin státuszt jelöl (0/1).
phonenumber	            VARCHAR(50)    	Telefonszám.
resetPasswordToken	    VARCHAR(255)	Jelszó visszaállítási token.
resetPasswordExpires	BIGINT	        A visszaállító token lejárati ideje.

e. orders tábla
A leadott pizzarendeléseket kezeli.

Oszlop	    Típus	        Leírás
id	        INT	            Egyedi rendelési azonosító.
userId	    INT	            Idegen kulcs a users táblára.
pizzaId	    INT	            Idegen kulcs a pizzas táblára.
pizzaNum	INT(11)        	A rendelési pizza darabszáma.
sizeId	    INT	            Idegen kulcs a size táblára.
address	    VARCHAR(255)	A rendelés kiszállítási címe.
userPhone	VARCHAR(50)    	A rendelő telefonszáma.
finalPrice	INT	            A végleges ár.
status	    VARCHAR(50)	    A rendelés státusza (pl. Függőben).

f. orderTops tábla

A rendeléshez tartozó feltéteket tárolja. Sok-sok kapcsolat a orders és a toppings táblák között.

Oszlop	    Típus	Leírás
orderId	    INT	    Idegen kulcs az orders táblára.
toppingId	INT	    Idegen kulcs a toppings táblára.

g. pizzaToppings tábla
A pizzákhoz tartozó feltéteket tartalmazza. Sok-sok kapcsolat a pizzas és a toppings táblák között.

Oszlop	    Típus	Leírás
pizzaId	    INT	    Idegen kulcs a pizzas táblára.
toppingId	INT	    Idegen kulcs a toppings táblára.

2. Kapcsolatok
Egy-sok kapcsolatok:

orders → users

orders → size

orders → pizzas

Több-Többhöz kapcsolatok:

pizzas ↔ toppings a pizzaToppings táblán keresztül.

orders ↔ toppings az orderTops táblán keresztül.

3. Alapértelmezett Adatok
Előre definiált pizzák:

Név	Ár	Kép URL
Margherita	1000	src/assets/image/margareta.jpg
Pepperoni	1200	src/assets/image/pepi.jpg
Hawaii	1300	src/assets/image/hawaii.jpg
Előre definiált feltétek:

Név	Többlet Ár
Sajt	200
Pepperoni	300
Ananász	250
Sonka	300
Pizza-Feltét Kapcsolatok:

Margherita: Sajt.
Pepperoni: Sajt, Pepperoni.
Hawaii: Sajt, Ananász, Sonka.

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
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    token = res.body.token;
  });
```

### Regisztráció
A regisztrációs útvonal a `/register` végponton érhető el. A kérésnek tartalmaznia kell a felhasználó nevét, email címét, jelszavát, születési dátumát, címét és telefonszámát.

Példa kérés:
```json
describe('Profile Routes', () => {
  let token;

  beforeAll(async () => {
    // Regisztráljunk egy új felhasználót a tesztekhez
    await request(app)
      .post('/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        birthdate: '1990-01-01',
        address: '123 Test St',
        phonenumber: '1234567890'
      });
```

### Profil lekérés
A felhasználói profil lekérdezése a `/profile` végponton érhető el.

Példa kérés:
```json
  it('should get user profile', async () => {
    const res = await request(app)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });
```

### Profil frissítése
A felhasználói profil frissítése a `/profile` végponton érhető el. A kérésnek tartalmaznia kell egy érvényes JWT tokent az Authorization fejlécben, valamint a frissítendő adatokat.

Példa kérés:
```json

  it('should update user profile', async () => {
    const res = await request(app)
      .put('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated User',
        email: 'updated@example.com',
        address: '456 Updated St',
        phonenumber: '0987654321'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Profil sikeresen frissítve.');
  });
});
```

### Pizzák lekérése
A pizzák listájának lekérdezése a `/pizzas` végponton érhető el.

Példa kérés:
```json
  it('should get a list of pizzas', async () => {
    const res = await request(app)
      .get('/pizzas');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

```

### Hibakeresés
Ha problémák merülnek fel a tesztek futtatása során, ellenőrizd a következőket:

- Győződj meg róla, hogy az adatbázis elérhető és megfelelően van beállítva.
- Ellenőrizd, hogy a szükséges csomagok telepítve vannak.
- Győződj meg róla, hogy a tesztadatok megfelelően vannak beállítva és tiszták a tesztek futtatása előtt.
