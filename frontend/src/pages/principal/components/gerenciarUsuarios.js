import * as React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import api from "../../../services/api";

export default function GerenciarUsuarios() {
  const [contributors, setContributors] = React.useState([]);
  const [edit] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/users");
        console.log(data);
        setContributors(data);
      } catch (error) {
        throw new Error("Erro, em mostrar os dados!");
      }
    };
    fetchData();
  }, []);

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
      <List sx={{ width: "80vw", maxWidth: 800 }}>
        {contributors.map((contributor) => (
          <>
            <ListItem key={contributor.id}>
              <ListItemText
                primary={contributor.nome}
                secondary={contributor.cpf}
              />

              <Select
                sx={{ marginRight: "10px" }}
                disabled={edit}
                color="primary"
                value={contributor.funcao}
                inputProps={{
                  name: contributor.id,
                }}
              >
                <MenuItem value="admnistrador">Administrador</MenuItem>
                <MenuItem value="colaborador">Usuário Comum</MenuItem>
                <MenuItem value="lider">Líder</MenuItem>
              </Select>
              <Select
                sx={{ marginRight: "10px" }}
                disabled={edit}
                color="primary"
                value={contributor.funcao}
                inputProps={{
                  name: contributor.id,
                }}
              >
                <MenuItem value="admnistrador">Administrador</MenuItem>
                <MenuItem value="colaborador">Usuário Comum</MenuItem>
                <MenuItem value="lider">Líder</MenuItem>
              </Select>
              <Button>
                {contributor.status === true ? (
                  <PersonOffIcon />
                ) : (
                  <PersonIcon />
                )}
              </Button>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
}
