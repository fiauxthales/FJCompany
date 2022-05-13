import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { SessionContext } from "../../../context/sessionContext";
import randomMessageApi from "../../../services/random-message";
import translateMessageApi from "../../../services/message-translate";

export default function MensagemAleatoria() {
  const [message, setMessage] = React.useState("");
  const [traducao, setTraducao] = React.useState("");
  const { sessao, setSessao } = React.useContext(SessionContext);

  const handleRequestMessage = async (event) => {
    if (sessao.numeroMensagens <= 4) {
      try {
        const { data } = await randomMessageApi.get("/advice");
        setMessage(data.slip.advice);
        const request = {
          q: data.slip.advice,
          target: "pt",
          source: "en",
        };
        const res = await translateMessageApi.post("/translate", request);
        setTraducao(res.data.translatedText);
        setSessao({ ...sessao, numeroMensagens: sessao.numeroMensagens + 1 });
      } catch {
        console.log("erro");
      }
    }
  };

  return (
    <Box
      sx={{
        width: "80vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "Column",
      }}
    >
      <Typography variant="1" sx={{ marginBottom: "30px" }}>
        {message}
      </Typography>
      <Typography variant="1" sx={{ marginBottom: "30px" }}>
        {traducao}
      </Typography>
      <Typography variant="subtitle1">
        Você leu {sessao.numeroMensagens} de 4 mensagens
      </Typography>
      <Button onClick={handleRequestMessage}>Nova Mensagem</Button>
    </Box>
  );
}
