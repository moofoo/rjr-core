export default {
  name: 'ShowControlNames',
  whereParam: 'rjrProps',
  order: 2,
  primary: true,
  data: {
    whatever: 5,
  },
  where: {
    '===': [
      {
        var: 'showControlNames',
      },
      true,
    ],
  },
};
