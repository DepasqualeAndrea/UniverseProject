
# Titolo del Progetto: Universe

<img width="1279" alt="Screenshot 2023-10-03 200820" src="https://github.com/DepasqualeAndrea/UniverseProject/assets/128024931/222e1754-c204-45b8-be14-809bf3d42048">

### Tecnologie Utilizzate

- Angular: Un framework per la creazione di applicazioni web dinamiche e interattive.
- Java Spring Boot: Un framework per lo sviluppo di applicazioni Java basate su microservizi.
- Bootstrap: Un framework di frontend per creare un'interfaccia utente moderna e responsive.
- JWT (JSON Web Token): Utilizzato per l'autenticazione e l'autorizzazione degli utenti.
- Cloudinary: Un servizio di gestione delle risorse multimediali in cloud.
- GitHub: Una piattaforma di sviluppo collaborativo per il versioning e il controllo del codice sorgente.

### Descrizione del progetto:

Il nostro progetto Capstone ha l'obiettivo di creare un social network moderno e futuristico con un'interfaccia utente intuitiva e rilassante. Abbiamo scelto una combinazione di colori tra verde, blu e grigio per promuovere un'esperienza visiva rilassante e al contempo evocare una sensazione di futurismo.

### Funzionalità Chiave

Il nostro social network offre una serie di funzionalità essenziali:

1. **Registrazione e Login**: Gli utenti possono registrare un account e accedere in modo sicuro utilizzando JWT per l'autenticazione.

2. **Gestione del Profilo**: Gli utenti possono personalizzare il proprio profilo con foto e informazioni personali.

3. **Pubblicazione di Contenuti Multimediali**: Gli utenti possono condividere testi, immagini e video in modo semplice.

4. **Interazione Sociale**: Gli utenti possono seguire altri utenti, mettere "Mi Piace" e commentare i contenuti.

5. **Ricerca Avanzata**: Una potente funzione di ricerca consente agli utenti di trovare facilmente amici, contenuti e hashtag di interesse.

6. **Notifiche in Tempo Reale**: Gli utenti ricevono notifiche in tempo reale sugli aggiornamenti e le attività relative al loro account.

7. **Gestione dei Contenuti Multimediali**: Utilizziamo Cloudinary per la gestione e la distribuzione efficiente di immagini e video.

### Endpoints API

Per darvi un'idea più chiara delle funzionalità, ecco alcuni degli endpoint API principali:


# Jwt Auth => ⛔
metodi per l'autenticazione (Post):
- `/auth/register`: Registrazione di un nuovo utente.
- `/auth/login`: Login e generazione di token JWT.

 <img width="1281" alt="Screenshot 2023-10-03 200758" src="https://github.com/DepasqualeAndrea/UniverseProject/assets/128024931/9a126dcd-273d-4f1b-b674-d6881984b352">
   
   ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
 <img width="1278" alt="Screenshot 2023-10-03 200807" src="https://github.com/DepasqualeAndrea/UniverseProject/assets/128024931/29e1b63e-1b89-4162-88cc-6c8df971dafa">
  
#  Utente => 🤩
  
  Metodi Get per gli utenti:
- `/user/utente`: Recupero e aggiornamento del profilo utente, con la prerogativa di ottenere i dati dell'utente Loggato in quel momento.

<img width="1277" alt="Screenshot 2023-10-03 200842" src="https://github.com/DepasqualeAndrea/UniverseProject/assets/128024931/767eaa88-06cf-4eb8-b7b1-11a13841ecfa">

- `/user/utente/all`: Recupero e aggiornamento dei profili di tutti gli utenti filtrati, considerando la non presenza dell utente loggato, e aggiornando la lista in caso in cui qualcuno di questi utenti venisse "seguito" (uscendo dalla lista degli utenti).
- `/user/utente/{userId}`: Recupero di tutti i profili seguiti dall'utente.
- `/user/utente/followers`: Recupero dei profili "followers" del profilo stesso.
- `/user/utente/following`: Recupero di tutti i profili seguiti dall'utente.
  Metodi Post per gli utenti 
- `/user/utente/{followerId}/follow/{followingId}`: Metodo toggle per seguire e smettere di seguire un utente.
  Metodo put per modificare l'Utente:
- `/user/utente/{userId}`
  Metodo Delete per eliminare un Utente:
- `/user/utente/{userId}`: Metodo per eliminare un Utente tramite Id, con eliminazione di ogni referencies.

# Posts => ✉️

Metodo Get Per i post
- `/user/post/home`: Creazione e recupero dei post dell'utente.
- `/user/comment`: Gestione dei follower e dei seguiti.
- `/user/reply`: Ricerca di utenti, contenuti e hashtag.
- `/user/cloudinary/upload`: Gestione delle notifiche in tempo reale.

Scheda Tecnica del Progetto

- **Frontend**: Abbiamo utilizzato Angular per creare un'interfaccia utente moderna e reattiva. Il design è stato realizzato utilizzando Bootstrap per garantire una user experience intuitiva.

- **Backend**: Java Spring Boot è stato adottato per sviluppare il backend dell'applicazione, garantendo una gestione scalabile e sicura delle richieste API.

- **Database**: ho utilizzato un database relazionale (PostgreSQL) per la memorizzazione dei dati utente e dei contenuti.

- **Sicurezza**: JWT è stato implementato per l'autenticazione sicura degli utenti, garantendo che solo gli utenti autorizzati possano accedere alle funzionalità. 

- **Gestione Multimediale**: Cloudinary è stato integrato per la gestione efficiente di immagini caricate dagli utenti.

- **Gestione tecnica**: GitHub è stato utilizzato per salvaguardare i dati, mano mano
 che sviluppavo il progetto strutturando il tutto su branch diversi per dividere lavoro e progressione delle singole modifiche.

### Presentazione Grafica

[Aggiungi qui le immagini e gli screenshot dell'interfaccia utente, inclusi esempi di login e navigazione.]

Conclusioni:
Questo progetto Capstone è stato un'esperienza di apprendimento straordinaria. Ho avuto l'opportunità di lavorare con tecnologie all'avanguardia e creare qualcosa di nuovo e stimolante. Oltretutto mi ha permesso di implementare ed apprendere molto più approfonditamente le tecnologie con la quale ho avuto modo di approcciarmi in questi mesi lavorativi. Sono altrettanto soddisfatto del risultato ottenuto, considerando la mole di idee che sono riuscito a far fruttare nel frattempo che il progetto progrediva.  


