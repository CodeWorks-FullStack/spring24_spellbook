import { AccountController } from "./controllers/AccountController.js";
import { DndSpellsController } from "./controllers/DndSpellsController.js";
import { HomeController } from "./controllers/HomeController.js";
import { SandboxSpellsController } from "./controllers/SandboxSpellsController.js";
import { AuthGuard } from "./services/AuthService.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [DndSpellsController, SandboxSpellsController],
    view: `app/views/SpellsView.html`
  },
  {
    path: '#/about',
    view: 'app/views/AboutView.html'
  },
  {
    path: '#/account',
    middleware: [AuthGuard],
    controllers: [AccountController],
    view: 'app/views/AccountView.html',
  }
])




