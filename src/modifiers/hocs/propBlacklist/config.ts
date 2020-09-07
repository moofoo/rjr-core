export default {
  name: 'PropBlacklist',
  order: 9999,
  data: {
    blacklist: [
      'elementId',
      'idPath',
      'componentName',
      'groupName',
      'groupIndex',
      'group',
      'isInGroup',
      'repeatable',
      'isRepeating',
      'recursive',
      'isRecursing',
      'recursiveIndex',
      'recursingElementId',
      'excludeFromRecursion',
      'randomElementId',
      'componentPropsArg',
    ],
  },
  addBlacklistProp: function (propName: string | Array<string>) {
    const propNames = Array.isArray(propName) ? propName : [propName];
    this.data.blacklist = [...this.data.blacklist, ...propNames];
  },
};
