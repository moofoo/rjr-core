import React from 'react';
import { mount } from 'enzyme';

import RJR from '../../';
import componentMap from './components/componentMap';
import Button from './components/Button';
import ShowControlNames from './modifiers/ShowControlNames';
import passDownClassName from './modifiers/passDownClassName';
import basicConfig from './configs/basic.json';
import inputConfig from './configs/input.json';
import componentConfig from './configs/component.json';
import multipleComponentconfig from './configs/multipleComponent.json';
import buttonConfig from './configs/button.json';
import nestedConfig from './configs/nested.json';
import passDownConfig from './configs/passDown.json';

describe('react json renderer', () => {
  test('renders a single div with the contents "text"', () => {
    const rendered = mount(<RJR config={basicConfig} />);

    expect(rendered.contains(<div>text</div>)).toEqual(true);
  });

  test('renders a component from a component map', () => {
    const rendered = mount(
      <RJR config={componentConfig} componentMap={componentMap} />
    );

    expect(rendered.contains(<div>text</div>)).toEqual(true);
  });

  test('renders a component with props modified by componentProps prop, using elementId', () => {
    let rendered;

    rendered = mount(
      <RJR
        config={componentConfig}
        componentMap={componentMap}
        componentProps={{
          textDisplay: {
            contents: 'Whatever',
          },
        }}
      />
    );

    expect(rendered.contains(<div>Whatever</div>)).toEqual(true);
  });

  test('renders multiple components with props modified by componentProps prop, using component name', () => {
    let rendered;

    rendered = mount(
      <RJR
        config={multipleComponentconfig}
        componentMap={componentMap}
        componentProps={{
          Display: {
            contents: 'Whatever',
          },
        }}
      />
    );

    expect(rendered.html()).toEqual(
      '<div><div>Whatever</div><div>Whatever</div><div>Whatever</div></div>'
    );
  });

  test('renders multiple components with props modified by componentProps prop, using "all ', () => {
    let rendered;

    rendered = mount(
      <RJR
        config={multipleComponentconfig}
        componentMap={componentMap}
        componentProps={{
          all: {
            className: 'someclass',
          },
        }}
      />
    );

    expect(rendered.html()).toEqual(
      '<div class="someclass"><div class="someclass">one</div><div class="someclass">two</div><div class="someclass">three</div></div>'
    );
  });

  test('renders a button and a display component. clicking the button changes the contents of the display', () => {
    const rendered = mount(
      <RJR
        config={buttonConfig}
        componentMap={componentMap}
        componentProps={{
          mybutton: (props, { updateComponentProps }) => {
            return {
              onClick: () => {
                updateComponentProps('textDisplay', { contents: 'updated' });
              },
            };
          },
        }}
      />
    );

    rendered.find(Button).simulate('click');

    expect(rendered.html()).toEqual(
      '<div><div>updated</div><button type="button"></button></div>'
    );
  });

  test('renders nested inputs', () => {
    let rendered;

    rendered = mount(<RJR config={nestedConfig} componentMap={componentMap} />);

    expect(rendered.html()).toEqual(
      '<fieldset name="nested"><legend name="nested">nested</legend><input name="nested.aninput" type="text"></fieldset>'
    );
  });

  test('accepts a wrapper modifier that displays the name property under input elements', () => {
    const rendered = mount(
      <RJR
        config={inputConfig}
        modifiers={{ wrappers: [ShowControlNames] }}
        showControlNames
      />
    );

    expect(rendered.html()).toEqual(
      '<div><input name="myinput" type="text"><div>myinput</div></div>'
    );
  });

  test('accepts a rendererProps modifier that passes down the className property from parent to child elements recursively', () => {
    const rendered = mount(
      <RJR
        config={passDownConfig}
        modifiers={{ rendererProps: [passDownClassName] }}
      />
    );

    expect(rendered.html()).toEqual(
      '<div name="parentDiv" class="parentDivClass"><div name="childDiv" class="parentDivClass"><div name="childDiv" class="parentDivClass"></div></div><div name="siblingChildDiv" class="parentDivClass"></div></div>'
    );
  });
});
