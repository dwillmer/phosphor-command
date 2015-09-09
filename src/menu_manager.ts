/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  IKeyPerm
} from './key_perm_interface';
import {
  IMenuManager
} from './menu_manager_interface';
import {
  IMenuItem
} from './menu_item_interface';
import {
  IShortcutAdder
} from './shortcut_adder_interface';
import {
  Signal, ISignal
} from 'phosphor-signaling';

/**
 * A simple, concrete implementation of the menu manager interface.
 * 
 * This takes in menu items, or a menu structure, and knows how to 
 * trigger commands when they're clicked.
 * It also sends relevant information to the keyboard manager.
 *
 */
export class MenuManager implements IMenuManager, IShortcutAdder {

  /**
   * A signal used to indicate to other parts of the application that
   * a menu item has been added which has a keyboard shortcut.
   * Some applications may have a single global keyboard event handler,
   * some may have many different context-dependent key handlers,
   * and they all have the opportunity to be notified of important
   * key permutations when they connect to this signal using the
   * shortcutAdded property below.
   */
  static shortcutAddedSignal = new Signal<MenuManager, IKeyPerm>();

  private _items: IMenuItem[] = [];

  constructor(menu_items: IMenuItem[]) {
    this._items = menu_items;
  }

  /**
   * Registers a new item with the existing menu
   *
   */
  registerMenuItem(item: IMenuItem): boolean {
    return true; // TODO
  }

  /**
   * Returns all registered menu items
   *
   */
  allMenuItems(): IMenuItem[] {
    return this._items;
  }

  /** 
   * TEMPORARY API - 
   * this is just here whilst we sort out dynamically rebuilding when
   * adding and removing menu items at runtime.
   */
  registerShortcuts(): void {
    for(var idx in this._items) {
      if('shortcut' in this._items[idx]) {
        var item = this._items[idx];
        this.shortcutAdded.emit({
          input: item.shortcut.join('-').toLowerCase(),
          command: item.command
        });
      }
    }
  }

  get shortcutAdded(): ISignal<MenuManager, IKeyPerm> {
    return MenuManager.shortcutAddedSignal.bind(this);
  }

}