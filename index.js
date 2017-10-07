/* eslint-env node */
'use strict';
var path = require('path');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const map = require('broccoli-stew').map;

module.exports = {
  name: 'ember-spin-spinner',

  included: function(app) {
    this._super.included.apply(this, arguments);
    app.import('vendor/spin.js');
    app.import('vendor/jquery.spin.js');
  },
  treeForVendor() {    
    var spinFiles = new Funnel(path.dirname(require.resolve('spin.js')), {
      files: ['jquery.spin.js', 'spin.js']
    });

    spinFiles = map(spinFiles, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);
    return new MergeTrees([spinFiles]);
  }
};
