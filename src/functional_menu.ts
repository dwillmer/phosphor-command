/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

/**
 *
 * DISCLAIMER: this is work-in-progress, a mixture of many ideas,
 * and should definitely *not* be used.
 *
 */

/*require('../support/lambdajs/utils').expose(global);
require('../support/lambdajs/lambda').expose();
require('lenses').expose('global');
var curry = require('lodash.curry');
var Maybe = require('pointfree-fantasy/instances/maybe');
var Promise = require('../support/promise');*/

/*require('./pointfree-fantasy').expose(global); // or if browser pointfree.expose(window)
var Maybe = require('./pointfree-fantasy/instances/maybe');*/

// import topsort = require('topsort');
import {Before, After} from './constraints';
import {
  IMenuItem
} from './menu_item_interface';
import {
  Menu, MenuBar, MenuItem
} from 'phosphor-menus';


/**
 * Components
 */

/**
 * Takes an item and returns the location with the item attached as 'menuItem'
 */
var itemTranspose = (item: any) => {
  var ret = item.location;
  ret.menuItem = item;
  return ret;
}

var buildItem = function(item: any) {
  return new MenuItem({
    text: item[item.length-1],
    shortcut: item.menuItem.shortcut
  });
}

var sortItems = (obj: any[]) => { obj.sort(); return obj; };

var getItemsAtLevel = function( items: IMenuItem[], level: string[] ): string[][] {
  var num = level.length;
  return items
    .map( function(val) {
      // TODO : fix the toString()'s below - only required for array equality.
      if( (val.location.length > num) && (val.location.slice(0,num).toString() === level.toString()) ) {
        var ret = val.location;
        (<any>ret).menuItem = val;
        return <string[]>ret;
      }
    })
    .filter( (val) => val !== undefined );
}

var matchesPrefix = function(prefix: string[], item: string[]): boolean {
  if( item.length >= prefix.length && item.slice(0,prefix.length) == prefix ) {
    return true;
  }
  return false;
}

var itemForConstraint = function(prefix: string[], item: string[]): string {
  return item.slice(prefix.length-1,prefix.length)[0];
}

/**
 * given a level such as
 *
 */
var getConstraints = function(items: string[][], prefix: string[]): string[][] {
  var constraints: string[][] = [];

  for(var i=0; i<items.length; ++i) {
    if(matchesPrefix(prefix, items[i])) {
      // work out which item in this part of the tree is required
      var consItem = itemForConstraint(prefix, items[i]);

      // pull out the constraints for that item
      var cons = ((<any>(items[i])).menuItem).constraints[consItem];

      // now we have an array of constraints, actually constrain them and
      // push them onto the constraints var above.
      cons.map( (c: any) => {
          constraints.push( c.constrain( items[i] ) );
      });
    }
  }
  return constraints;
}

/*var sortBasedOn*/

/**
 * Takes a list of IMenuItems and a prefix, and returns
 *
 *
 */
export function partialSolve( items, prefix ): MenuItem[] {
  console.log("Partial Solve - " + prefix.toString());
  var menu_items = [];
  var levelItems: string[][] = getItemsAtLevel( items, prefix );
  console.log('got items at level: ' + levelItems.toString());

  // TODO : don't need to sort at every level, can just sort once at the top call
  sortItems( levelItems );

  var startIdx = 0;
  var endIdx = 0;
  var preLen = prefix.length;

  while( endIdx < levelItems.length ) {
    console.log('top while' + endIdx.toString());
    var currentVal = levelItems[startIdx];
    // This is the real centre of the menu solver - 
    // if the prefix passed in is one less than the location length, then this is a
    // leaf node, so we build a menu item and push it onto the array (order solving is
    // done later). If the location length is longer than (prefix length+1), then this 
    // is an intermediate node which has its own submenu. In the latter case we 
    // recursively call partialSolve with a new prefix containing the intermediate level.
    // That partialSolve clearly returns a built menu with the items at that level, so
    // we just append that to our current array.
    //
    if( levelItems[endIdx].length === preLen+1 ) {
      console.log('first case: ' + levelItems[endIdx].toString());
      menu_items.push(buildItem(levelItems[endIdx]));
      endIdx++;
      startIdx = endIdx;
    } else {
      console.log('second case: ' + levelItems[endIdx].toString());
      // iterate over all the items at this level in the tree
      // take prefix length, use that as index into levelItems[endIdx]
      //
      var match = levelItems[endIdx][preLen];
      while(levelItems[endIdx] && levelItems[endIdx][preLen] === match) {
        console.log('second while: ' + levelItems[endIdx].toString());
        endIdx++;
      }
      var subItems = levelItems.slice(startIdx, endIdx).map((val) => {
        return (<any>val).menuItem;
      });
      var submenu = partialSolve(subItems, currentVal.slice(0,preLen+1));
      var menu_obj = new Menu();
      menu_obj.items = submenu;
      var item = new MenuItem({text: currentVal[preLen], submenu: menu_obj});
      menu_items.push( item );
      startIdx = endIdx;
      endIdx++;
    }
  }

  // var order = topsort.topsort<string>( getConstraints( levelItems ) );
  return menu_items; // TODO .sortBasedOn( order );

}

// var my_array = partialSolve( test_array, [] );
// console.log(my_array);

