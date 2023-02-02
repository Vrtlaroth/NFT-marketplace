export const NAV_MENU_ITEMS = [
  {
    id: 1,
    title: "Graveyard",
    icon: "icon--graveyard",
    link: "/graveyard",
    active: false,
  },
  {
    id: 2,
    title: "Coffin",
    icon: "icon--coffin",
    link: "/coffin",
    active: false,
  },
  {
    id: 3,
    title: "Soul Extraction",
    icon: "icon--soul-extraction",
    link: "/soul-extraction",
    active: false,
  },
  {
    id: 4,
    title: "Marketplace",
    icon: "icon--marketplace",
    link: "/marketplace",
    active: true,
  },
  {
    id: 5,
    title: "Leaderboards",
    icon: "icon--leaderboards",
    link: "/leaderboards",
    active: false,
  },
];

export const NAV_MENU_DROPDOWN = {
  title: "Player",
  menuType: "dropdown",
  menuItems: [

    {
      id: 1,
      title: "address",
      link: "#",
      icon: "",
      active: true
    },

    {
      id: 2,
      title: "My Ghosts",
      link: "/my-ghosts",
      icon: "icon--ghost-icon",
      active: true,
    },
    {
      id: 3,
      title: "Settings",
      link: "/settings",
      icon: "icon--settings",
      active: false,
    },


    {
      id: 4,
      title: "Sign out",
      link: "/support",
      icon: "icon--signout",
      active: false,
    },
  ],
};
