import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function HeaderBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" enableColorOnDark={true} sx={{ bgcolor: "#0088d1" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Ajaib User Listing 
                    </Typography>
                    <Button  color="inherit">Hi, user </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}