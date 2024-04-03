
function formatDamage(damage, level) {
  if (!damage) return
  let damageString = ''
  if (damage.damage_type) {
    damageString += damage.damage_type.name
  }
  if (damage.damage_at_character_level) {
    damageString += `- ${damage.damage_at_character_level[1]}`
  }
  if (damage.damage_at_slot_level) {
    damageString += `- ${damage.damage_at_slot_level[level]}`
  }
  return damageString
}

function formatComponents(components) {
  let componentsArr = []
  if (components.includes('V')) {
    componentsArr.push('👄')
  }
  if (components.includes('S')) {
    componentsArr.push('👋')
  }
  if (components.includes('M')) {
    componentsArr.push('🥐')
  }
  return componentsArr
}


export class Spell {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    // --------------- condition ?   when true             :  when false
    this.description = data.desc ? data.desc.join('<br/>') : data.description // if the spell comes from the DND api, we need to format it, if not, then just use the plain ol description
    this.damage = formatDamage(data.damage, data.level)
    this.level = data.level
    this.range = data.range
    this.material = data.material
    this.ritual = data.ritual
    this.concentration = data.concentration
    this.castingTime = data.castingTime
    this.duration = data.duration
    this.components = formatComponents(data.components)
    this.prepared = data.prepared
    this.creatorId = data.creatorId
  }

  get ActiveSpellCard() {
    return `
<div class="card p-2 sticky-top ">
  <h2 class="text-center card-title text-danger">${this.name} ${this.level}
    <hr />
  </h2>
  <button onclick="app.SandboxSpellsController.saveSpellToBook()" class="btn btn-primary position-absolute top-1"><i class="mdi mdi-book-plus"></i></button>
  ${this.DamageText}
  <div class="card-body">
    <div class=" fw-bold">
      <div>${this.components}</div>
      <div>${this.range ? '🏹' + this.range + ' |' : ''} ${this.castingTime ? '⌚' + this.castingTime + ' |' : ''} ${this.duration} </div>
      <div> ${this.ritual ? '🕯️ |' : ''} ${this.concentration ? '🧠 |' : ''} ${this.material ? '🎒' + this.material : ''}</div>
    </div>
    <hr />
    <p>${this.description}</p>
  </div>
</div>
`
  }

  get DamageText() {
    if (this.damage) {
      return `
      <h5 class="bg-danger px-3 py-1 rounded-pill text-light card-subtitle text-center">${this.damage}</h5>
      `
    }
    return ''
  }


  get MySpellListTemplate() {
    return `
<div onclick="app.SandboxSpellsController.setActiveSpellFromBook('${this.id}')" class="row align-items-center border-bottom border-primary pb-1 mb-2 selectable">
  <div class="col-1">
    <input type="checkbox" ${this.prepared ? 'checked' : ''} onclick="app.SandboxSpellsController.togglePrepared('${this.id}')">
  </div>
  <div class="col">${this.name}</div>
</div>
</div>

`
  }

  static SpellListTemplate(spellName, spellIndex) {
    return `
     <button onclick="app.DndSpellsController.getDndSpellByIndex('${spellIndex}')" class="btn border border-bottom p-2 w-100 text-start mb-2 selectable">
      ${spellName}
     </button>
    `
  }
}
/** 
 * name: String, required
description: String, required
damage: String, 
level: Number, 
range: String, required
material: String, 
ritual: Boolean, 
concentration: Boolean, 
castingTime: String, 
duration: String, required
components: undefined, 
prepared: Boolean, 
creatorId: String (References Account Id), required
*creator: Object (Virtual Added by Database)
*createdAt: ISO Timestamp (Virtual Added by Database)
*updatedAt: ISO Timestamp (Virtual Added by Database)
*/