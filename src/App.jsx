import React, { useEffect } from "react";
import { BrowserRouter, Link, Outlet, useRoutes } from "react-router-dom";
import { Action } from "./hooks/Action";
import { loadUser } from "./store/actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Homepage from "./pages/Homepage/HomePage";
import Marketplace from "./pages/Marketplace/Marketplace";
import Graveyard from "./pages/Graveyard/Graveyard";
import Leaderboards from "./pages/Leaderboards/Leaderboards";
import Coffin from "./pages/Coffin/Coffin";
import SoulExtraction from "./pages/SoulExtraction/SoulExtraction";
import MyGhosts from "./pages/MyGhosts/MyGhosts";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

export default function App() {

  const routes = useRoutes([
		{ path: "/", element: <Homepage /> },
		{ path: "graveyard", element: <Graveyard /> },
		{ path: "coffin", element: <Coffin /> },
		{ path: "soul-extraction", element: <SoulExtraction /> },
		{ path: "marketplace", element: <Marketplace /> },
		{ path: "leaderboards", element: <Leaderboards /> },
		{ path: "my-ghosts", element: <MyGhosts /> },
	]);

	return routes;
}
