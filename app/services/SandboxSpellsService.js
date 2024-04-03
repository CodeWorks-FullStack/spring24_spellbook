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

  async saveSpellToBook() {
    console.log('saving', AppState.activeSpell.name);
    const response = await api.post('api/spells', AppState.activeSpell)
    console.log('💾🪄', response.data);
    const spell = new Spell(response.data) // convert one object into a classed model
    AppState.mySpells.push(spell)
    // AppState.mySpells.push(response.data) IF YOU HAVE DONE THIS JUST LIKE THIS WITH RESPONSE.DATA YOU MADE A MISTAKE
  }

  setActiveSpellFromBook(spellId) {
    const selectedSpell = AppState.mySpells.find(spell => spell.id == spellId)
    console.log('setting', selectedSpell);
    AppState.activeSpell = selectedSpell
  }

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