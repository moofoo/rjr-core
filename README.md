# RJR - React JSON Renderer

React Component for rendering DOM and custom components from JSON. Includes features that allow for granular control over component display and behavior.

## Install

```bash
yarn add rjr-core
```

## Basic Usage

Component (DisplayContents.js)

```javascript
import React from 'react';

const DisplayContents = (props) => <div {...props}>{props.contents}</div>;
export default DisplayContents;
```

Component Map (componentMap.js)

```javascript
import DisplayContents from './DisplayContents';

export default { DisplayContents };
```

JSON (config.json)

```json
{
	"elements":[
	{
		"component":"div",
		"properties":{
			"className":"container"
		},
		"children":[
			{
				"component":"DisplayContents",
				"properties":{
					"contents":"Hello World",
					"style":{
						"padding":15,
						"border":"1px solid red"
					}
				}
			}
		]
	}
}
```

Renderer (App.js)

```javascript
import React from 'react';
import RJR from 'rjr-core';
import componentMap from './componentMap';
import config from './config.json';

const App = () => {
  return <RJR config={config} componentMap={componentMap} />;
};
```

Result

![Hello World](./helloworld.png)

### Much more to come...
