import { AppState } from "../AppState.js";
import { sandboxSpellsService } from "../services/SandboxSpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";




export class SandboxSpellsController {
  constructor() {
    console.log('⏳🪄');
    // We never tell the controller to directly get our spells, cause we on want the get request to happen AFTER we are logged in.
    // if we tried to get our spells before the login happens, the server will return a 401
    AppState.on('mySpells', this.drawMySpells)
    AppState.on('mySpells', this.drawSpellCount)
    // this.getMySpellBook() only want to draw spells when someone is logged in
    AppState.on('account', this.getMySpellBook) // this listens to the account so when the user is logged in, it fetches their spells. 
  }


  async getMySpellBook() {
    try {
      await sandboxSpellsService.getMySpellBook()
    } catch (error) {
      Pop.toast("Can't Get Spell Book, If you lost it then good luck buddy.")
      console.error(error)
    }
  }


  async saveSpellToBook() {
    try {
      await sandboxSpellsService.saveSpellToBook()
    } catch (error) {
      Pop.toast("Can't save spell, looks like you're out of ink")
      console.error(error)
    }
  }

  drawMySpells() {
    const mySpells = AppState.mySpells
    let mySpellsList = ''
    mySpells.forEach(spell => mySpellsList += spell.MySpellListTemplate)
    setHTML('my-spell-book', mySpellsList)
  }

  setActiveSpellFromBook(spellId) {
    sandboxSpellsService.setActiveSpellFromBook(spellId)
  }

  async togglePrepared(spellId) {
    try {
      event.stopPropagation() // this stops click the checkbox from also setting the active spell
      await sandboxSpellsService.togglePrepared(spellId)
    } catch (error) {
      Pop.toast("Can't toggle")
      console.error(error)
    }
  }

  drawSpellCount() {
    const spellCount = AppState.mySpells.length
    const preparedCount = AppState.mySpells.filter(spell => spell.prepared == true).length
    setText('spell-count', `${preparedCount}/${spellCount}`)
  }
}