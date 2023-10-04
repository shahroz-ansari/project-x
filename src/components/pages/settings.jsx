import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from "@mui/material";

import HeaderComponent from "../ui-components/header.component";

const Settings = function() {
  return <>
    <HeaderComponent title="Settings" />
    <Card>
      <CardContent sx={{ display: 'flex', alignItems:"center", justifyContent: 'center', flexDirection: "column"}}>
        <Typography gutterBottom variant="h6" component="div">
          Comming Soon
        </Typography>
        <Button variant="contained" component={Link} to="/projects" sx={{mt: 3}}>
          Explore Projects
        </Button>
      </CardContent>
    </Card>
  </>
}

export default Settings