import { Box, Icon, Stack, Typography } from "@mui/material";
import {Facebook, Instagram, Twitter, LinkedIn} from "@mui/icons-material";

export function Footer() {
    const socialLinks = [
        {icon: Facebook, url: 'http://google.com'},
        {icon: Instagram, url: 'http://google.com'},
        {icon: Twitter, url: 'http://google.com'},
        {icon: LinkedIn, url: 'http://google.com'}
    ]
    return (
        <>
           <Box mt={8} mb={5} component="footer" py={2} textAlign="center">
            <Stack direction="row" justifyContent="center">
                {socialLinks.map((item, idx) => (
                    <Box color="black" p={2} key={idx} component="a" href={item.url}  target="_blank" rel="noopener noreferrer">
                        <Icon component={item.icon} sx={{fontSize: "48px"}}/>
                    </Box>
                ))}
            </Stack>
            <Typography>Copyright ©{new Date().getFullYear()} All rights reserved </Typography>
           </Box>
        </>
    )
}