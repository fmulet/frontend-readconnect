import { useContext, useState } from 'react';

import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, LoginOutlined, VpnKeyOutlined } from "@mui/icons-material"

import { useRouter } from 'next/router';
import { UiContext } from '@/context/ui';
import { AuthContext } from '@/context';


export const SideMenu = () => {

  const router = useRouter();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  }



  return (
    <Drawer
      open={isMenuOpen}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>

        <List>

          {
            isLoggedIn && (
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Perfil'} />
              </ListItemButton>
            )}

          {
            isLoggedIn
              ? (
                <ListItemButton onClick={logout}>
                  <ListItemIcon>
                    <LoginOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Salir'} />
                </ListItemButton>
              ) : (
                <ListItemButton onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
                  <ListItemIcon>
                    <VpnKeyOutlined />
                  </ListItemIcon>
                  <ListItemText primary={'Ingresar'} />
                </ListItemButton>
              )
          }
          {/* Admin */}

          {
            user?.roles.includes('ADMIN') && (
              <>
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItem button>
                  <ListItemIcon>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText primary={'Usuarios'} />
                </ListItem>
              </>
            )
          }
        </List>
      </Box>
    </Drawer>
  )
}


