import { createElement } from '@syncfusion/ej2-base';
import { DocumentEditor, FormatType } from '@syncfusion/ej2-react-documenteditor';
import { Button } from '@syncfusion/ej2-react-buttons';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-react-splitbuttons';
import { MenuEventArgs } from '@syncfusion/ej2-react-navigations';

export class TitleBar {
  tileBarDiv: HTMLElement;
  documentEditor: DocumentEditor;
  constructor(
    tileBarDiv: HTMLElement,
    documentEditor: DocumentEditor,
    shareBtnNeeded: boolean
  ) {
    this.tileBarDiv = tileBarDiv;
    this.documentEditor = documentEditor;
    this.initialize(shareBtnNeeded);
    this.wireEvents();
  }

  private initialize(shareBtnNeeded: boolean) {
    // Title
    const label = createElement('label', {
      id: 'documenteditor_title_name',
      styles:
        'font-weight:400;text-overflow:ellipsis;white-space:pre;overflow:hidden;cursor:text;user-select:none'
    }) as HTMLElement;
    const wrapper = createElement('div', {
      id: 'documenteditor_title_contentEditor',
      className: 'single-line'
    }) as HTMLElement;
    wrapper.appendChild(label);
    this.tileBarDiv.appendChild(wrapper);
    wrapper.setAttribute('title', 'Click to rename');
    label.textContent = this.documentEditor.documentName || 'Untitled';

    // Print
    const printBtnEl = createElement('button') as HTMLButtonElement;
    new Button({ iconCss: 'e-de-icon-Print', content: 'Print' }, printBtnEl);
    this.tileBarDiv.appendChild(printBtnEl);

    // Download
    const items: ItemModel[] = [
      { text: 'Word (.docx)', id: 'word' },
      { text: 'Syncfusion (.sfdt)', id: 'sfdt' }
    ];
    const exportBtnEl = createElement('button') as HTMLButtonElement;
    new DropDownButton(
      {
        iconCss: 'e-de-icon-Download',
        content: 'Download',
        items,
        select: (args: MenuEventArgs) => {
          const fmt = args.item.id === 'word' ? 'Docx' : 'Sfdt';
          this.documentEditor.save(
            this.documentEditor.documentName || 'Document',
            fmt as FormatType
          );
        }
      },
      exportBtnEl
    );
    this.tileBarDiv.appendChild(exportBtnEl);
    if (!shareBtnNeeded) exportBtnEl.style.display = 'none';
  }

  private wireEvents() {
    // …wire print/open etc…
  }

  updateDocumentTitle() {
    const name = this.documentEditor.documentName || 'Untitled';
    const lbl = document.getElementById('documenteditor_title_name');
    if (lbl) lbl.textContent = name;
  }

  getHeight() {
    return this.tileBarDiv.offsetHeight + 4;
  }
}
