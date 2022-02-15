# 1. Passwords

### Database

Type: MariaDB

- Name: HotelHowest
- Password: FrameworksIsCool25

Type: MongoDB

- No credentials necessary

### Users application

Person 1:

- Type: admin
- Name: Howest
- Email: admin@hotmail.com
- Password: 4dminHotelHowest2021

Person 2:

- Type: user
- Name: Deleu
- Email: thibeau.deleu@hotmail.com
- Password: VromanLaboranteHowest1996

Person 3:

- Type: user
- Name: Van Houtte
- Email: tibo.van.houtte@hotmail.be
- Password: Vanh0utteh0westk0rtrijk

# 2. Werkverdeling

### Deleu Thibeau

- Front-End
- Back-End

### Van Houtte Tibo

- Front-End
- Back-End

Gelijkaardige verdeling tussen front- en backend voor beide partijen. Maar als er een hoofdverantwoordelijke moet worden gesteld, dan is Thibeau Deleu de hoofdverantwoordelijke voor de Back-End en Tibo van Houtte de hoofdverantwoordelijke voor de Front-End.

# 3. Milestones

### week 11/10 - 17/10:

- Design (geschatte tijd: 5-8u)
  - [x] Main page
  - [x] Login page
  - [x] About page
  - [x] Rooms page
  - [x] Users/Admin pagex

- Projectdossier aanvullen (geschatte tijd: 1-2u)
  - [x] Readme

- Time tracking tool definiëren (geschatte tijd: 1-2u)
  - [x] Toggl (https://track.toggl.com/reports/summary/2572264)

### week 18/10 - 24/10

- Front-End (geschatte tijd max 4u)

  - Setup (geschatte tijd: 1-2u)
    - [x] Tailwind
    - [x] Prettier
    - [x] Nvmrc
    - [x] Env files
    - [x] Tsconfig
    - [x] Package.json
    - [x] Folder structuur
    - [x] Naming conventions bepalen
    - [x] Typografie

  - Navigation (geschatte tijd: 1-2u)
    - [x] Home page
    - [x] Rooms page
    - [x] Rooms detail page
    - [x] About page
    - [x] Login / user / Admin page => Zelfde pagina
    - [x] Styling according to design

- Back-End (geschatte tijd max 2u)

  - Setup (geschatte tijd: 30min)
    - [x] Package.json
    - [x] Server folder
    - [x] App.ts
    - [x] Nvmrc
    - [x] Prettier
    - [x] Env files

  - Database (geschatte tijd: 1u)

    - [x] Structure entities: Concept (draw.io)
    - [x] Docker-compose
    - [x] Setup mariadb
    - [x] Implement entities (with relations)

  - Adminer opzetten (geschatte tijd: 30min)
    - [x] localhost:9999

### week 25/10 - 31/10

- Front-End (geschatte tijd max 2u)

  - Mainpage (geschatte tijd: 1-2u)
    - [x] Input fields (dates, numbers)
    - [x] Styling according to design

- Back-End (geschatte tijd max 2u)
 
  - API opzetten (geschatte tijd: 1-2u)
    - [x] Controllers
    - [x] Seeders
    - [x] Middleware
    - [x] Routes (GET, POST, DEL, PUT)
          Database
    - [x] Fill DB with some test data

### week 01/11 - 07/11

- Front-End (geschatte tijd max 11u)

  - Mainpage (geschatte tijd: 1-2u)
    - [x] Input validation
    - [x] Dateselectors => filtering rooms on room page (DB QUERY)

  - About page (geschatte tijd: 1-2u)
    - [x] Styling according to design

  - Rooms page (geschatte tijd: 2-3u)
    - [x] Styling according to design
    - [x] Keeping track of available rooms (DB QUERY)

  - Rooms detail page (geschatte tijd: 1-2u)
    - [x] Styling according to design

  - Login/User/Admin page (geschatte tijd: 1-2u)
    - [x] Styling according to design

- Back-End (geschatte tijd max 1u)

  - API opzetten (geschatte tijd: 30min)
    - [x] Cors


### week 08/11 - 14/11

- Front-End (geschatte tijd max 12u)

  - Rooms page (geschatte tijd: 1-2u)
    - [x] Keeping track of available rooms (DB QUERY)

  - Rooms detail page (geschatte tijd: 3-4u)
    - [x] Review functionality (POST DB)
    - [x] Book room functionality (UPDATE DB)
    - [x] Review functionality (POST DB)

  - [x] Error logging (geschatte tijd: 1-2u)

  - Rooms detail page (geschatte tijd: 1-2u)
    - [x] Styling according to design

  - [x] Input validation (geschatte tijd: 1-2u)

- Back-End (geschatte tijd max 7u)

  - [x] Realtime communication (geschatte tijd: 5-6u)
  - [x] Statuscodes (geschatte tijd: 1u)

### week 15/11 - 21/11

- Front-End (geschatte tijd: 7u)

  - [x] Ghost, Skeletons en/of loading states (geschatte tijd: 2-3u)
  - [x] Multi Language (geschatte tijd: 1-2u)

  - Rooms page & Rooms detail page (geschatte tijd: 1-2u)
    - [x] Finishing touches (if necessary)
    - [x] Book room functionality (UPDATE DB)

- Back-End (geschatte tijd max 4u)

   - Firebase (geschatte tijd: 3-4u)
      - [x] Add users in backend (firebase and db)
      - [x] Auth control with specific routes
      - [x] Custom token creation => Cancelled, token creation is in Front-End now.

### week 22/11 - 28/11

- Front-End (geschatte tijd max 17u)

  - [x] PWA Setup (geschatte tijd: 1-2u)
  - [x] Testing (unit) (geschatte tijd: 2-3u)
  - [x] Receive firebase token for authentication (geschatte tijd: 3-4u)
    - Because of technical difficulties in the Back-End, we decided to create a token in the Front-End instead. Receive => Create

  - Rooms Detail page (geschatte tijd: 3-4u)
      - [x] Realtime communication

  - Login/Register page (geschatte tijd: 3-4u)
      - [x] Validate credentials with backend and redirect to correct page.

- Back-End (geschatte tijd max 3u)

  - [x] Security against cross site forging (geschatte tijd: 2-3u)

### week 29/11 - 05/12

- Front-End (geschatte tijd max 14u)

  - [x] Testing (geschatte tijd: 2-4u)
    - Unit testing (Karma)
    - Integration testing (Cypress)

  - Login/register page (geschatte tijd: 2-4u)
      - [x] Fill DB with values to make these pages work (geschatte tijd: 1-4u)

  - Socketio (geschatte tijd: 4-6u)
      - [x] Rework for multiple reservations (geschatte tijd: 2-3u)
        - Before this, the application was only able to handle one reservation at a time.

- Algemeen: zowel Front- als Back-End (geschatte tijd max 12u)

  - [x] Dockerizing backend (Start) (geschatte tijd: 2-4u)
  - [x] Dockerizing socketio (Start) (geschatte tijd: 2-4u)
  - [x] Dockerizing Frontend (Start) (geschatte tijd: 2-4u)

### week 06/12 - 12/12
  
- Algemeen: zowel Front- als Back-End (geschatte tijd max 18u)

  - [x] Dockerizing socketio (geschatte tijd: 2-3u)
  - [x] Dockerizing Frontend (geschatte tijd: 2-3u)
  - [x] Dockerizing backend (geschatte tijd: 2-3u)
  - [x] Forgot password functionality (geschatte tijd: 1-2u)
  - [x] Seeding DB (geschatte tijd: 1-2u)
  
  - [x] Kubernetes (geschatte tijd: 4-5u)

### week 13/12 - 19/12

- Finishing Touches (geschatte tijd max 34u)

  - [x] Kubernetes final touches (geschatte tijd: 3-4u)
  - [x] Horizontal scroll fix frontend (geschatte tijd: 1-2u)
  - [x] Github Actions (geschatte tijd: 5-6u)
  - [x] Build optimisations: webpack vite (geschatte tijd: 5-6u)

  - [x] Select a chamber without input requirement (geschatte tijd: 5-6u)
    - Before this update, you could select a chamber if you havent filled in certain input fields.

  - [x] Custom inline error messages op home pagina instead of auto notificaties that appear on top of the screen. (geschatte tijd: 1-2u)
    - Before this update, when certain errors occured when filling in some inputs, they appeared on top of the screen instead of inline.

  - [x] Labels bij input based on feedback Martijn (geschatte tijd: 1-2u)
  - [x] Full code test: see if it works (geschatte tijd: 1-2u)

- [x] Documentatie (geschatte tijd: 3-4u)

### week 20/12 - 26/12

- [x] Voorbereiden presentatie (geschatte tijd: 1-2u)
- [x] Cleanup (geschatte tijd: 3-4u)

# 4. TimeTracking

- Totaal geschatte uren
  - Front-end 
     -   Ongeveer 93u

  - Back-End
     -   Ongeveer 48u

  - Andere (Kubernetes, github actions etc.)
     -   Ongeveer 26u

- Gerealiseerde uren


# 5. Grootste behaalde successen

  - Double database usage
  - Third party testing software implementation
  - Carousel implementation
  - NPM packages voor kubernetes genereren
  - Custom authenitcation middleware die controleert wat voor user een request doet

# 6. Grootste moeilijkheden

  - Moeite met heights van parents
  - Tailwind & het automatisch toevoegen van components
  - Overlays are a challenge in Angular
  - Sentry & AddBlocker (Opera)
  - Carousel loop bug
  - Angular material components zorgen voor lange build tijden
  - Firebase documentatie niet meer volledig up to date... (compat)
  - Firebase en testing met de spec files (configuration moet meegegeven worden)
  - Integration tests met angular tools (authorization moeilijkheden en undefined network file) 
  - Auto swagger documentation moeilijk implementeerbaar (ofwel library die vrijheid project beperkt en manueel, maar dan verlies automatisch deel)
  - SocketIO & Kubernetes
