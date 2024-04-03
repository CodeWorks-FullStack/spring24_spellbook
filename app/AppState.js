import { Spell } from './models/Spell.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null


  /** @type {{name: String, index: String, url: String}[]} */
  dndApiSpells = []

  /** @type {Spell} */
  activeSpell = null


  /** @type {Spell[]} */
  mySpells = []
}

export const AppState = createObservableProxy(new ObservableAppState())