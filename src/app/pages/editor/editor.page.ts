import { Component, OnInit, Output, EventEmitter, ElementRef, Renderer, Renderer2 } from '@angular/core';
import * as wangEditor from '../../../../node_modules/wangeditor/release/wangEditor.js';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Article } from 'src/app/interfaces/article.js';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Users } from 'src/app/interfaces/users.js';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

  private editor: any;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPostData = new EventEmitter();

  constructor(private el: ElementRef, 
              private http: HttpClient,
              private renderer: Renderer2,
              private storage: Storage,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private route: ActivatedRoute,
              private router: Router) { }

  isSelected = false;
  sessionId = null;
  editorTitle:any;
  editorContent:any;

  article:Article = {
    articleclickcount:0,
    articleconsentient:1,
    articlecontentshtml:'',
    articleid:null,
    articlelastcommenttime:null,
    articlesessionid:0,
    articletime:null,
    articletitle:'',
    articleuserid:null
  }

  userInformation: Users = {
    userId:0,
    useravatar:0,
    usernickname:'',
    userdescription:'',
    userismanager:0,
    username:'',
    userpwd:'',
    userregdate:null
  }
  
  ngOnInit() {
    this.sessionId = this.route.snapshot.paramMap.get('id');
    this.editorTitle = this.el.nativeElement.querySelector('#editorTitle');
    this.editorContent = this.el.nativeElement.querySelector('#editorContent');
    this.editor = new wangEditor(this.editorTitle, this.editorContent);
    this.editor.customConfig.uploadImgTimeout = 30000;
    this.editor.customConfig.uploadFileName = 'files';
    this.editor.customConfig.uploadImgServer = 'https://syk2018.cn/web/uploader/uploadPic';
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
    'fontName',  // 字体
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

  ionViewWillEnter() {
    this.getinformation();
  }

  getinformation() {
    this.storage.get('user').then((result:Users) => {
      this.userInformation = result;
    });
  }

  async submit() {
    const api = 'https://syk2018.cn/web/article/add';
    const loading = await this.loadingController.create();
    await loading.present();

    this.article.articlecontentshtml = this.editor.txt.html();
    this.article.articlesessionid = this.sessionId;
    this.article.articleuserid = this.userInformation.userId;

    const httpOptions = {
      headers : new HttpHeaders({
      'Content-Type':  'application/json'
      })
    };

    this.http.post(api,this.article,httpOptions).subscribe((result:any) => {
      console.log(result);
      if(result.code == 200) {
        this.presentToast("Success!",3000);
        loading.dismiss();
        this.router.navigateByUrl('/tabs/home');
      }
    })
  }

  async presentToast(mymessage: string, myduration: number) {
    const toast = await this.toastController.create({
      message: mymessage,
      duration: myduration
    });
    toast.present();
  }
}
