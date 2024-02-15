# Evolving Hands: TEI Converter
A custom web component built in svelte designed to take a path to a TEI file and display it as HTML.

## About

This repository contains the source code for a custom web component built with Svelte that takes in a path to a TEI file and transforms it into HTML using CETEIcean. The component is designed specifically for Evolving Hands, but is meant to be reusable in other applications by the Newcastle University Library.

### Project Team
- Ian Johnson, Head of Special Collections and Archives, Newcastle University  ([ian.johnson@ncl.ac.uk](mailto:ian.johnson@ncl.ac.uk))  
- Valentina Flex, Special Collections and Archives, Newcastle University ([valentina.flex@newcastle.ac.uk](mailto:valentina.flex@newcastle.ac.uk))
- Alexandra Healey, Philip Robinson Library, Newcastle University ([alexandra.healey@newcastle.ac.uk](mailto:alexandra.healey@newcastle.ac.uk))
- Scott Bradley, Library systems developer, Philip Robinson Library, Newcastle University ([scott.bradley@newcastle.ac.uk](mailto:scott.bradley@newcastle.ac.uk))
- Maciej Dudek, Digital Content Developer Academic Services, Newcastle University ([maciej.dudek@newcastle.ac.uk](mailto:maciej.dudek@newcastle.ac.uk))
- John Schoneboom, Research Software Engineer, Newcastle University ([john.schoneboom@newcastle.ac.uk](mailto:john.schoneboom@newcastle.ac.uk))
- Tiago Sousa Garcia, Research Software Engineer, Newcastle University ([tiago.sousa-garcia@newcastle.ac.uk](mailto:tiago.sousa-garcia@newcastle.ac.uk))

### RSE Contact
Tiago Sousa Garcia
RSE Team  
Newcastle University  
([tiago.sousa-garcia@newcastle.ac.uk](mailto:tiago.sousa-garcia@newcastle.ac.uk))  

## Built With

[Svelte](https://svelte.dev/)  
[CETEIcean](https://github.com/TEIC/CETEIcean)  
## Getting Started

### Prerequisites

TBD

### Installation

Copy the entire `dist/TeiConverter` folder to the root of your project (or a suitable folder in the project directory).

### Running Locally

1. Load `TeiConverter/tei-converter.umd.js` as a script in your HTML:

```html
<script src="./tei-converter.umd.js"></script>
```

2. Place the custom element `<tei-converter>` anywhere in the `<body>` of your HTML with a `@path` attribute pointing to the location of the TEI file you want to convert, and a `@configPath` attribute pointing to the location of the configuration file you want to use (the distribution folder includes an example to use as a base). More details on the config file are available [here](/documentation/TeiConverter.config.md).

```html
<tei-converter path="PATH/TO/TEI/FILE.xml" configPath="TeiConverter/TeiConverter.config.json"/>
```

3. Start any http server on the root of your project and visit the local address to see the results.

#### Example:

##### file structure:
```
├── project_root
│   ├── index.html
|   └──  TeiConverter
│       ├── tei-converter.umd.js
│       └── TeiConverter.config.json
```

##### index.html:
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <script src="./TeiConverter/tei-converter.umd.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TEI Converter test</title>
</head>

<body>
    <tei-converter path="https://raw.githubusercontent.com/NewcastleRSE/beeing-human-tei-data/dev/1623_consolidated.xml" configPath="TeiConverter/TeiConverter.config.json"/>
</body>

</html>
```

#### Documentation
- [Configuration object](/documentation/TeiConverter.config.md);
- [Adding custom behaviours](/documentation/customBehaviours.md);
- Custom events:
  - [Facsimile coordinates](/documentation/customEvents/drawBox.md);
  - [Place data](/documentation/customEvents/placeHover.md);

### Running Tests

TBD

## Deployment

### Local

TDB

### Production

TDB

## Usage

TBD

## Roadmap

- [x] Initial Research  
- [x] Minimum viable product <-- You are Here  
- [ ] Alpha Release  
- [ ] Feature-Complete Release  

## Contributing

### Main Branch
Protected and can only be pushed to via pull requests. It should be considered stable and a representation of production code.

### Dev Branch
Should be considered fragile; code should compile and run, but features may be prone to errors.

### Feature Branches
A branch per feature that is being worked on.

https://nvie.com/posts/a-successful-git-branching-model/

## License

## Citation

## Acknowledgements
