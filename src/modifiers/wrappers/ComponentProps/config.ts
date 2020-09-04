export default {
  name: 'ComponentProps',
  whereParam: 'props',
  where: (props: any) => {
    return !props.randomElementId || props.name;
  },
};
