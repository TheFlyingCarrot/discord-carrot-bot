# npm-dependencies-merge

`npm-dependencies-merge` is a nifty little script that scans subdirectories searching for
nested `package.json` files, and merges all the dependencies together in a
single `package.json` file that is outputted to stdout.

A base template passed through standard input is used to produce the root
`package.json` file. This allows `package.json` to be ignored by version
control systems, which conflict with auto-generated files. Base package
attributes, like name and version, can be stored in a separate file such as
`package-base.json`, and kept in version control.

## Example

    $ cd project_directory
    $ npm-dependencies-merge < package-base.json > package.json

## Installation

    $ npm install -g npm-dependencies-merge

## Command line options

    -h, --help           output usage information
    -V, --version        output the version number
    -s, --silent         do not print out warnings
    -c, --combine        combine dependencies and devDependencies
    -f, --files          files to search for (Default: package.json)
    -o, --output [file]  output to a file

## Conflicts

`npm-dependencies-merge` will warn you about any potential conflicts of the versions
declared in the multiple package.json files
