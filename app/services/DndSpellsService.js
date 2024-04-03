import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";

// NOTE we can create our own instance of axios to use
// this instance is created and can be used anytime we need to call to the DnD api
// @ts-ignore
// eslint-disable-next-line no-undef
const dndApi = axios.create({ // this will always give you an error, because axios only exists once the page loads
  baseURL: 'https://www.dnd5eapi.co/api/',
  timeout: 4000
})


class DndSpellsService {

  // gets the list of spell names
  async getDndSpells() {
    const response = await dndApi.get('spells')
    console.log('🐉🪄', response.data);
    AppState.dndApiSpells = response.data.results // we didn't use .map or the Spell class cause the response from this api doesn't really return "Spells", just a list of spell names and references.
  }

  // NOTE takes the index of a spell, and gets the single spell that has that index. This is similar to our own api
  // (dnd)/api/spells/acid-arrow [vs] (sandbox)/api/spells/16df678evhjxcb0asdf
  async getDndSpellByIndex(spellIndex) {
    const response = await dndApi.get(`spells/${spellIndex}`)
    console.log('🐉📄🪄', response.data);
    const spell = new Spell(response.data) // changing the response from pojo to Spell class
    AppState.activeSpell = spell
  }

}

export const dndSpellsService = new DndSpellsService()