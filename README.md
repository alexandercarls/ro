Execute in different shells
Node.JS v22 LTS

```sh
npm i
cp .env.example .env
npm run dev:db-up
npm run db:migrate
npm run db:seed
npm run dev:zero
npm run dev:ui
```

Your application will be available at `http://localhost:5173`.
