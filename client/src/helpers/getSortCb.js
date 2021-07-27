const sorts = {
  AA (a, b) {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if(aName > bName) {
      return 1
    }
    if(bName > aName) {
      return -1;
    }
    return 0
  },
  AD (a, b) {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if(aName > bName) {
      return -1
    }
    if(bName > aName) {
      return 1;
    }
    return 0
  },
  WA (a, b) {
    if(parseInt(a.weight) > parseInt(b.weight)) {
      return 1
    }
    if(parseInt(b.weight) > parseInt(a.weight)) {
      return -1;
    }
    return 0
  },
  WD (a, b) {
    if(parseInt(a.weight) > parseInt(b.weight)) {
      return -1
    }
    if(parseInt(b.weight) > parseInt(a.weight)) {
      return 1;
    }
    return 0
  },
  LSA (a, b) {
    if(parseInt(a.life_span) > parseInt(b.life_span)) {
      return 1
    }
    if(parseInt(b.life_span) > parseInt(a.life_span)) {
      return -1;
    }
    return 0
  },
  LSD (a, b) {
    if(parseInt(a.life_span) > parseInt(b.life_span)) {
      return -1
    }
    if(parseInt(b.life_span) > parseInt(a.life_span)) {
      return 1;
    }
    return 0
  }

}

export const getSortCb = (sorting) => {
  if(sorting === 'default') {
    return sorts.AA;
  }
  return sorts[sorting];
}