const sortModifiers = function sortModifiers(modifiers: any) {
  let withOrder = [];
  let withoutOrder = [];
  let first = [];
  let last = [];
  let sorted = [];

  for (const modName in modifiers) {
    withOrder = modifiers[modName].filter(
      (mod: any) => mod.config.order !== undefined
    );
    withoutOrder = modifiers[modName].filter(
      (mod: any) => mod.config.order === undefined
    );

    first = withOrder.filter((mod: any) => mod.config.order < 0);
    last = withOrder.filter((mod: any) => mod.config.order > 9000);
    sorted = withOrder.filter(
      (mod: any) => mod.config.order > 0 && mod.config.order < 9000
    );

    sorted.sort((a: any, b: any) => {
      return Number(a.config.order) - Number(b.config.order);
    });

    modifiers[modName] = [...first, ...sorted, ...withoutOrder, ...last];
  }

  return modifiers;
};

export default sortModifiers;
