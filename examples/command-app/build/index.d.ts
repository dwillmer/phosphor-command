import connect = phosphor.core.connect;
import IMessage = phosphor.core.IMessage;
import ResizeMessage = phosphor.widgets.ResizeMessage;
import DockArea = phosphor.widgets.DockArea;
import DockMode = phosphor.widgets.DockMode;
import Tab = phosphor.widgets.Tab;
import Widget = phosphor.widgets.Widget;
import Menu = phosphor.widgets.Menu;
import MenuBar = phosphor.widgets.MenuBar;
import MenuItem = phosphor.widgets.MenuItem;
declare var dockarea: DockArea;
declare var handler: {
    newCodePanel: () => void;
};
/**
 * CodeMirror widget - use from separate widgets directory, when avaiable
 */
declare class CodeMirrorTab extends Widget {
    constructor(title: string, config?: CodeMirror.EditorConfiguration);
    dispose(): void;
    editor: CodeMirror.Editor;
    protected onAfterAttach(msg: IMessage): void;
    protected onResize(msg: ResizeMessage): void;
    tab: Tab;
    private _tab;
    private _cm;
}
/**
 * Hard-coded menu item, for now.
 */
declare var addCodeMirrorItem: MenuItem;
declare var newItem: MenuItem;
declare function main(): void;
