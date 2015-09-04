/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

/*import MenuBar = phosphor.widgets.MenuBar;*/
//import topsort = require('topsort');
import {
  Widget
} from 'phosphor-widget';
import {
  IConstraint
} from './constraints';

import {
  IMenuManager, IMenuItem
} from './menu';

/**
 * A class to solve the relationships between menu items
 * and allow custom menu creation.
 *
 */
export
class MenuSolver {
  constructor( private _registry: IMenuManager ) {}

  /**
   * We use topsort (topological sorting) to find the order of menu items
   * based on their names and constraints.
   * The constraints form dependencies (Before(y) means directed edge x -> y)
   * and therefore we can use topsort to find a suitable order. We won't use
   * a full DAG topsort; we only solve one level of the menu at a time because
   * the menu is just a simple tree, which we need the results for one branch
   * at a time.
   *
   */
  solve( ): Widget { // TODO : should return menubar
    var allItems = this._registry.allMenuItems();

    /**
     * The logic inside solver is written in a very functional style.
     * By the nature of graph/tree traversal, we need a recursive function
     * therefore any 'global' state used will make it *very* difficult to debug.
     * I strongly suggest following the functional paradigm as much as
     * possible for this section of code.
     */
    var solver = (location: string[]) => {
      var itemsAtLevel = this._getLevel( allItems, location );
      var edges = this._formatConstraintsToEdges( itemsAtLevel );
      //var sorted = topsort.topsort<string>(edges);
      //return sorted;
    }

    /**
     * The actual logic for iterating over the items, building the relevant
     * trees and forming a menu system.
     *
     * The very top level of a menu is a MenuBar, which contains menu items.
     * Below this, everything is a menu item, either with 'text' and 'submenu',
     * if it's not a leaf node, or 'text' and 'shortcut' if it is a leaf node.
     * We therefore hard code the top level, and recursively search for the
     * rest.
     *
     */
     /*var menubar = new Widget(); // TODO : should be MenuBar*/
     var topLevel = solver([]);


     /*return menubar;*/
     return new Widget();
  }

  /**
   * Takes a list of objects with the location : constraints mapping (as
   * returned from _getLevel), and returns a list of size-2 arrays denoting
   * edges in the DAG for this tree level.
   *
   */
  _formatConstraintsToEdges( objs: Object[] ): string[][] {
    var edges: string[][] = [];
    var allItems: string[] = []
    var allConstrained: string[] = [];

    objs.map( function(val: any) {
      for (var i in val) { // will only loop once, we just don't know the key.
        if( val[i].length ) {
          val[i].map( (con: IConstraint) => {
            var res = (<IConstraint>con).constrain( i );
            allConstrained.push( res[0], res[1] );
            edges.push( res );
          });
        }
        allItems.push( i );
      }
    });

    // we want to find any items which are present (in allItems), but not
    // constrained (in allConstrained). These items will be added alphabetically
    // at the end by sorting, edging based on neighbours and defining the first
    // alphabetically as After all existing items.
    var unconstrained = this._difference( allItems, allConstrained );
    unconstrained.sort();
    // TODO - make sure first item comes after last existing one.
    edges = edges.concat( this._formatInternalEdges( unconstrained ) );
    return edges;
  }

  /**
   * Given an array of strings (assumed in pre-sorted order), this will return
   * an array of {key: value} pairs denoting the edges [a,b], [b,c], [c,d] etc
   */
  _formatInternalEdges( objs: string[] ): string[][] {
    var edges: string[][] = [];
    for( var i=0; i<objs.length-1; i++ ) {
      edges.push( [objs[i],objs[i+1]] );
    }
    return edges;
  }

  /**
   * Takes a list of items implementing IMenuItem, and a string array denoting
   * the position in the tree, ie, ['File', 'New'].
   * and returns an array of objects representing all items at that level
   * in the tree, mapped to their respective constraints.
   */
  _getLevel( items: IMenuItem[], level: string[] ): Object[] {
    var num = level.length;
    return items.map( function(val) {
      if( (val.location.length > num) && (val.location.slice(0,num+1) === level) ) {
        var key = val.location[num];
        var res = val.constraints;
        return { key: res };
      }
    });
  }

  /**
   * This takes an array of strings and returns a new array with only the
   * unique values.
   *
   * Clearly, this can iterate over the array multiple times, if this becomes
   * a performance problem, we could consider moving this to a hash-based
   * lookup. However, experience tells us that in general menus are fairly small
   * (usually < 10 items), and that hash-based lookups will be slower - worth
   * keeping in mind if you see long solver times.
   *
   * This could be templated and pulled out into a generic algo library.
   */
  _unique( items: string[] ): string[] {
    var unique = (value: string, index: number, self: any) => {
      return self.indexOf(value) === index;
    }
    return items.filter(unique);
  }

  /**
   * This takes two arrays of strings and returns a new array with the set
   * difference between first -> second.
   *
   * The comment above about _unique is also applicable here - this *should*
   * be faster than a hashing routine as the overall sizes will be small.
   *
   * This could be templated and pulled out into a generic algo library.
   */
  _difference( first: string[], second: string[] ): string[] {
    return first.filter( (i) => first.indexOf(i) < 0 );
  }


}
