import { AppState } from "../AppState.js";
import { Spell } from "../models/Spell.js";
import { dndSpellsService } from "../services/DndSpellsService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";



export class DndSpellsController {
  constructor() {
    console.log('🧙🧙‍♂️🔥');
    this.getDndSpells()
    AppState.on('dndApiSpells', this.drawSpellList)
    AppState.on('activeSpell', this.drawActiveSpell)
  }


  async getDndSpells() {
    try {
      await dndSpellsService.getDndSpells()
    } catch (error) {
      console.error(error)
      Pop.toast("Could Not Get Spells, Try taking a long rest", 'error')
    }
  }

  async getDndSpellByIndex(spellIndex) {
    try {
      console.log('📄🪄', spellIndex);
      await dndSpellsService.getDndSpellByIndex(spellIndex)
    } catch (error) {
      console.error(error)
      Pop.toast(`Could Not Get ${spellIndex}, maybe check your spelling`, 'error')
    }
  }

  drawSpellList() {
    const spells = AppState.dndApiSpells
    let spellsList = ''
    spells.forEach(spell => spellsList += Spell.SpellListTemplate(spell.name, spell.index))
    setHTML('spells-list', spellsList)
  }

  drawActiveSpell() {
    const activeSpell = AppState.activeSpell
    setHTML('active-spell', activeSpell.ActiveSpellCard)
  }

}