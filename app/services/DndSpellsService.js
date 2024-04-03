


// @ts-ignore

import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";

// eslint-disable-next-line no-undef
const dndApi = axios.create({ // this will always give you an error, because axios only exists once the page loads
  baseURL: 'https://www.dnd5eapi.co/api/',
  timeout: 4000
})


class DndSpellsService {

  async getDndSpells() {
    const response = await dndApi.get('spells')
    console.log('🐉🪄', response.data);
    AppState.dndApiSpells = response.data.results
  }

  async getDndSpellByIndex(spellIndex) {
    const response = await dndApi.get(`spells/${spellIndex}`)
    console.log('🐉📄🪄', response.data);
    const spell = new Spell(response.data)
    AppState.activeSpell = spell
  }

}

export const dndSpellsService = new DndSpellsService()