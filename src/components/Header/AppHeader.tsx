import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Button} from "@material-ui/core";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },    
  })
);

const AppHeader: FC<{}> = () => {
  const history = useHistory();
  const classes = useStyles();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
 

  const options = [
    'SE CONNECTER',
    'SE DECONNECTER'  
  ];
  
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {    
    setSelectedIndex(index);
    setAnchorEl(null);
    if(index === 0){
      history.push("/signin");
    }
    if(index === 1){
      history.push("/");
    }
  };
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);    
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
     {options.map((option, index) => (
          <MenuItem
            key={option}           
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Facturation
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button color="inherit" onClick={() => history.push("/companies")}>
              {intl.formatMessage({ id: "menu.companies" })}
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/prestations")}
            >
              {intl.formatMessage({ id: "menu.prestations" })}
            </Button>
            <Button color="inherit" onClick={() => history.push("/factures")}>
              {intl.formatMessage({ id: "menu.factures" })}
            </Button>
            <Button color="inherit" onClick={() => history.push("/clients")}>
              {intl.formatMessage({ id: "menu.clients" })}
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/consultants")}
            >
              {intl.formatMessage({ id: "menu.consultants" })}
            </Button>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
};

export default AppHeader;
