import app from "./app";
import 'dotenv/config';

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log(`Servidor tá rodando mais que a bola quadrada do Quico, na porta ${PORT}.`);
});