import pokeTypes from 'data/PokeTypes';

interface TypeLoad {
  noEffect?: PokeType | Array<PokeType>;
  notEffective?: PokeType | Array<PokeType>;
  superEffective?: PokeType | Array<PokeType>;
}

interface Config {
  altColor: string;
  icon: string; name: PokeTypeName;
  color: string
}

class PokeType {
  altColor: string;

  color: string;

  icon: string;

  name: PokeTypeName;

  private noEffect: Array<PokeType> = [];

  private notEffective: Array<PokeType> = [];

  private superEffective: Array<PokeType> = [];

  constructor(config: Config) {
    this.altColor = config.altColor;
    this.icon = config.icon;
    this.name = config.name;
    this.color = config.color;
  }

  getNoEffect() {
    return this.noEffect;
  }

  getNotEffective() {
    return this.notEffective;
  }

  getSuperEffective() {
    return this.superEffective;
  }

  getWeakAgainst() {
    return [...this.noEffect, ...this.notEffective];
  }

  getVulnerableTo() {
    return pokeTypes.filter((foe) => foe.isStrongAgainst(this));
  }

  getResistantTo() {
    return pokeTypes.filter((foe) => foe.isWeakAgainst(this));
  }

  load(load: TypeLoad) {
    const { noEffect, notEffective, superEffective } = load;

    if (noEffect) {
      if (noEffect instanceof PokeType) {
        this.noEffect = [noEffect];
      } else {
        this.noEffect = noEffect;
      }
    }

    if (notEffective) {
      if (notEffective instanceof PokeType) {
        this.notEffective = [notEffective];
      } else {
        this.notEffective = notEffective;
      }
    }

    if (superEffective) {
      if (superEffective instanceof PokeType) {
        this.superEffective = [superEffective];
      } else {
        this.superEffective = superEffective;
      }
    }
  }

  isStrongAgainst(foe: PokeType): boolean {
    return this.superEffective.includes(foe);
  }

  isWeakAgainst(foe: PokeType): boolean {
    return this.notEffective.includes(foe) || this.noEffect.includes(foe);
  }

  isSuperWeakAgainst(foe: PokeType): boolean {
    return this.noEffect.includes(foe);
  }
}

export default PokeType;
