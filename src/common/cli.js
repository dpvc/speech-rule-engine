// Copyright 2014 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview Command line interface for the speech rule engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Cli');

goog.require('sre.System');
goog.require('sre.SystemExternal');



/**
 * @constructor
 */
sre.Cli = function() {};


/**
 * Method for the command line interface of the Speech Rule Engine
 */
sre.Cli.prototype.commandLine = function() {
  var commander = sre.SystemExternal.commander;
  // These are necessary to avoid closure errors.
  /** @type {!string} */
  commander.input = '';
  /** @type {!string} */
  commander.output = '';
  /** @type {!boolean} */
  commander.verbose = false;
  /** @type {!boolean} */
  commander.semantics = false;
  /** @type {!string} */
  // commander.domain is already in use by the commander module!
  commander.area = '';
  /** @type {!string} */
  commander.style = '';

  commander.version(sre.System.getInstance().version).
      option('-i, --input [name]', 'Input file [name]').
      option('-o, --output [name]', 'Output file [name]').
      option('-s, --semantics', 'Switch on semantics interpretation').
      option('-a, --area [name]', 'Subject area [name]').
      option('-t, --style [name]', 'Speech style [name]').
      option('-v, --verbose', 'Verbose mode').
      parse(process.argv);
  sre.System.getInstance().setupEngine(
      {
        'semantics': commander.semantics,
        'domain': commander.area,
        'style': commander.style
      });
  if (commander.input) {
    sre.System.getInstance().processFile(commander.input, commander.output);
  }
  if (commander.verbose) {
    console.log('Currently unused.');
  }
};


(new sre.Cli()).commandLine();
