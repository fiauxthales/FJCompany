import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Icon from "../../assets/images/logo";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, IconButton } from "@mui/material";
import { SessionContext } from "../../context/sessionContext";
import randomMessageApi from "../../services/random-message";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const { sessao, setSessao } = React.useContext(SessionContext);
  const [message, setMessage] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = (event) => {
    setSessao({
      ...sessao,
      cpf: "",
      funcao: "",
      activeSession: false,
      token: "",
      numeroMensagens: 0
    });
  };

  const handleRequestMessage = async (event) => {
    if (sessao.numeroMensagens <= 4) {
      try {
        const { data } = await randomMessageApi.get("/advice");
        setMessage(data.slip.advice);
        setSessao({ ...sessao, numeroMensagens: sessao.numeroMensagens + 1 });
      } catch {
        console.log("erro");
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          height: "70px",
          bgcolor: "#C1E0F5",
          marginBottom: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            height: "70px",
            width: "70px",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <Icon />
        </Box>
        <IconButton
          sx={{
            height: "40px",
            width: "40px",
            display: "flex",
            alignItems: "center",
            marginRight: "20px",
          }}
          onClick={handleLogout}
        >
          <LogoutIcon color="primary" fontSize="large" />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "90vh",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Mensagem Aleatória" {...a11yProps(0)} />
        </Tabs>
        <TabPanel value={value} index={0}>
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
            <Typography variant="subtitle1">
              Você leu {sessao.numeroMensagens} de 4 mensagens
            </Typography>
            <Button onClick={handleRequestMessage}>Nova Mensagem</Button>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
}
