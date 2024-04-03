import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { api } from "./AxiosService.js";




class SandboxSpellsService {

  async getMySpellBook() {
    const response = await api.get('api/spells')
    console.log('📖🪄', response.data);
    const mySpells = response.data.map(spell => new Spell(spell)) // Map converts and array of object, into an array of class models
    AppState.mySpells = mySpells
  }

  // NOTE this function takes the spell object that we got from the DnD api and sends it to the sandbox api to save for later.
  async saveSpellToBook() {
    console.log('saving', AppState.activeSpell.name);
    const response = await api.post('api/spells', AppState.activeSpell)
    console.log('💾🪄', response.data);
    const spell = new Spell(response.data) // convert one object into a classed model
    AppState.mySpells.push(spell)
    // AppState.mySpells.push(response.data) IF YOU HAVE DONE THIS JUST LIKE THIS WITH RESPONSE.DATA YOU MADE A MISTAKE
  }

  // NOTE this method isn't async and doesn't have a .get request because, it's just finding an object in the mySpells to render to the center of the page. This is different than when we needed to get extra information from the DnD api with it's getActive
  setActiveSpellFromBook(spellId) {
    const selectedSpell = AppState.mySpells.find(spell => spell.id == spellId)
    console.log('setting', selectedSpell);
    AppState.activeSpell = selectedSpell
  }

  // NOTE toggle the prepared status on the clicked spell, and tell the api about the update, often you need to run some sort of update on the appstate but this time, we updated the data directly, so this is not necessary
  async togglePrepared(spellId) {
    const spellToToggle = AppState.mySpells.find(spell => spell.id == spellId)
    spellToToggle.prepared = !spellToToggle.prepared // this sets the prepared property to it's opposite value
    const response = await api.put(`api/spells/${spellId}`, spellToToggle) // put requests update data in the API
    // you provide an id, to target what you are changing, and send a body, that includes the new key: values parts (updated info)
    console.log('🐑🪄', response.data);
    AppState.emit('mySpells') // force listeners listening to this property to run
  }
}

export const sandboxSpellsService = new SandboxSpellsService()