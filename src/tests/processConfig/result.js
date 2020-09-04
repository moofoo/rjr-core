export default {
  partials: {
    inputPartial: [
      {
        component: 'input',
        properties: {
          elementId: 'myinput',
          name: 'myinput',
          type: 'text',
        },
      },
    ],
  },
  elements: [
    {
      component: 'div',
      properties: {
        elementId: 'div',
        randomElementId: false,
      },
      children: [
        {
          component: 'input',
          properties: {
            elementId: 'myinput',
            randomElementId: false,
            name: 'myinput',
            type: 'text',
          },
        },
      ],
    },
  ],
};
