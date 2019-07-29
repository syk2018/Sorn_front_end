import { Component, OnInit, Output, EventEmitter, ElementRef, Renderer, Renderer2 } from '@angular/core';
import * as wangEditor from '../../../../node_modules/wangeditor/release/wangEditor.js';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  private editor: any;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPostData = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  isSelected = false;

  ngOnInit() {
    const editorTitle = this.el.nativeElement.querySelector('#editorTitle');
    const editorContent = this.el.nativeElement.querySelector('#editorContent');
    this.editor = new wangEditor(editorTitle, editorContent);
    this.editor.customConfig.uploadImgServer = '/upload';
    this.editor.customConfig.lang = {
      '设置标题': 'title',
      '正文': 'p',
      '上传图片': 'upload image',
      '网络图片': 'from url',
      '图片链接': 'url',
      '插入': 'insert',
      '靠左': 'left',
      '居中': 'center',
      '靠右': 'right',
      '对齐方式': 'justify',
      '上传': 'upload',
      '创建': 'init'
      // 还可自定添加更多
  };
    this.editor.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'justify',  // 对齐方式
    'image',  // 插入图片
    'undo',  // 撤销
    'redo'  // 重复
    ];
    this.editor.create();
  }

  clickHandle(): any {
    const data = this.editor.txt.text();
    return data;
  }

}
