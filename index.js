/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import Root from "./Root";
import App from "./App";

AppRegistry.registerComponent(appName, () => Root);
