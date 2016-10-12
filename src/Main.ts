//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;
    private IndexStartingLoge : egret.Bitmap;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
    ///P1-P3容器声明，位置赋值
        var page1 = new egret.DisplayObjectContainer(); 
        var page2 = new egret.DisplayObjectContainer();

        this.addChild(page1);
        page1.width = stageW;
        page1.height = stageH;

        this.addChild(page2);
        page2.width = stageW;
        page2.height = stageH;
        page2.y = stageH;


        //page1 - start 
        var sky:egret.Bitmap = this.createBitmapByName("001_jpg");
        page1.addChild(sky);   

        var topMask0 = new egret.Shape();
        topMask0.graphics.beginFill(0x000000, 0.5);
        topMask0.graphics.drawRect(0, 0, stageW, 172);
        topMask0.graphics.endFill();
        topMask0.y = 33;
        page1.addChild(topMask0); 

        var textfield = new egret.TextField();
        page1.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.fontFamily = "Microsoft YaHei";
        textfield.size = 30;
        textfield.textColor = 0xffffff;
        textfield.x = stageW/2 - textfield.width/2;
        textfield.y = stageH/1.1;
        this.textfield = textfield;

        var colorLabel2 = new egret.TextField();
        colorLabel2.textColor = 0xffffff;
        colorLabel2.textAlign = "left";
        colorLabel2.text = "个人介绍请看第二页";
        colorLabel2.stroke = 1;
        colorLabel2.alpha =0.9;
        colorLabel2.strokeColor = 0x4876FF;
        colorLabel2.fontFamily = "Microsoft YaHei";
        colorLabel2.size = 30;
        colorLabel2.x = stageW/2-colorLabel2.width/2;
        colorLabel2.y = 150;
        page1.addChild(colorLabel2);

        /*var line = new egret.Shape();
        line.graphics.lineStyle(2,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(80,0);
        line.graphics.endFill();
        line.alpha = 0.8;
        line.x = 20;
        line.y = 195;
        page1.addChild(line);*/

        var qipao:egret.Bitmap = this.createBitmapByName("qipao_png");
        page1.addChild(qipao);
        qipao.width = 200;
        qipao.height = 200;
        qipao.x = stageW/2;
        qipao.y = stageH/2;
        /*
        function launchTween() { 
             egret.Tween.get( qipao, {loop:true} )
            .to( {"alpha":0}, 600 );
        }
        page1.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{
            launchTween();
        }, this );*/
        

        

//page2 - start 
        var sky2:egret.Bitmap = this.createBitmapByName("002_jpg");
        page2.addChild(sky2);

        var icon:egret.Bitmap = this.createBitmapByName("touxiang_png");
        icon.touchEnabled = true;
        page2.addChild(icon);
        icon.width = 200;
        icon.height = 200;
        icon.x = stageW/2-100;
        icon.y = stageH/2-100;

        var logo0:egret.Bitmap = this.createBitmapByName("logo_png");
        var logo0rotat = 1;
        page2.addChild(logo0);
        logo0.alpha = 0.5;
        logo0.scaleX = 1.15;
        logo0.scaleY = 1.15; 
        logo0.anchorOffsetX = 115.5;
        logo0.anchorOffsetY = 115.5;
        logo0.x = stageW/2;
        logo0.y = stageH/2;
         /// 根据当前模式调整旋转度数或缩放正弦基数形成相应动画
        logo0.addEventListener( egret.Event.ENTER_FRAME, ( evt:egret.Event )=>{

               /// 仅旋转
                    logo0.rotation -= 20*logo0rotat;
                
        }, this );

        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, 380, 80);
        topMask.graphics.endFill();
        topMask.x = 0;
        topMask.y = 50;
        topMask.alpha = 0;
        page2.addChild(topMask);

        var topMask2 = new egret.Shape();
        topMask2.graphics.beginFill(0x000000, 0.5);
        topMask2.graphics.drawRect(0, 0, 550, 100);
        topMask2.graphics.endFill();
        topMask2.x = stageW-550;
        topMask2.y = 300;
        topMask2.alpha = 0;
        page2.addChild(topMask2);
        
        var topMask3 = new egret.Shape();
        topMask3.graphics.beginFill(0x000000, 0.5);
        topMask3.graphics.drawRect(0, 0, 350, 50);
        topMask3.graphics.endFill();
        topMask3.x = 0;
        topMask3.y = 550;
        topMask3.alpha = 0;
        page2.addChild(topMask3);

        var topMask4 = new egret.Shape();
        topMask4.graphics.beginFill(0x000000, 0.5);
        topMask4.graphics.drawRect(0, 0, 400, 120);
        topMask4.graphics.endFill();
        topMask4.x = stageW-400;
        topMask4.y = 800;
        topMask4.alpha = 0;
        page2.addChild(topMask4);

        var line = new egret.Shape();
        line.graphics.lineStyle(2,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(0,117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        line.alpha = 0;
        page2.addChild(line);

        var title = new egret.TextField();
        page2.addChild(title);
        title.alpha = 1;
        title.textColor = 0xffffff;
        title.width =  stageW - 172;
        title.textAlign = "center";
        title.fontFamily = "Microsoft YaHei";
        title.text = "点击此处↓";
        title.size = 48;
        title.strokeColor = 0x436EEE;
        title.stroke = 1;
        title.x = stageW/2 - title.width/2;
        title.y = stageH/2 - 250;

        var text1 = new egret.TextField();
        page2.addChild(text1);
        text1.alpha = 0;
        text1.textColor = 0xffffff;
        text1.textAlign = "center";
        text1.fontFamily = "Microsoft YaHei";
        text1.text = "姓名:彭程 \n  北京工业大学树莓大三学生 ";
        text1.size = 24;
        text1.x = 220;
        text1.y = 60;
  
        var text2 = new egret.TextField();
        page2.addChild(text2);
        text2.alpha = 0;
        text2.textColor = 0xffffff;
        text2.textAlign = "center";
        text2.fontFamily = "Microsoft YaHei";
        text2.text = "自己觉得缺乏自信，外加做事拖沓（感觉没救了） \n 想做的事情很多，但常常行动力不足";
        text2.size = 24;
        text2.x = 100;
        text2.y = 310;

        var text3 = new egret.TextField();
        page2.addChild(text3);
        text3.alpha = 0;
        text3.textColor = 0xffffff;
        text3.textAlign = "center";
        text3.fontFamily = "Microsoft YaHei";
        text3.text = "爱好:打游戏(星际2) 画画 \n";
        text3.size = 24;
        text3.x = 220;
        text3.y = 560;

        var text4 = new egret.TextField();
        page2.addChild(text4);
        text4.alpha = 0;
        text4.textColor = 0xffffff;
        text4.textAlign = "left";
        text4.fontFamily = "Microsoft YaHei";
        text4.text = "就这样吧 \n qq852289115\n 电话:15650752616";
        text4.size = 24;
        text4.x = 100;
        text4.y = 810;
        
        page2.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
            launchTween1();
        }, this );
        
        function launchTween1() {
            //黑块
            egret.Tween.get( title, {} )
            .to( {"alpha":0}, 300 );
             egret.Tween.get( topMask, {} )
            .to( {"alpha":1}, 100 ).to( {"x":200}, 50 )
            .to( {"y":50}, 50 )
             egret.Tween.get( topMask2, {} )
            .to( {"alpha":1}, 200 ).to( {"x":80}, 100 )
            .to( {"y":300}, 100 );
            egret.Tween.get( topMask3, {} )
            .to( {"alpha":1}, 300 ).to( {"x":200}, 150 )
            .to( {"y":550}, 150 );
            egret.Tween.get( topMask4, {} )
            .to( {"alpha":1}, 400 ).to( {"x":80}, 200 )
            .to( {"y":800}, 200 );
            //按钮
            egret.Tween.get( icon, {} )
            .to( {"alpha":0}, 600 );
            egret.Tween.get( logo0, {} )
            .to( {"alpha":0}, 600 );
            //text
            egret.Tween.get( text1, {} )
            .to( {"alpha":1}, 600 );
            egret.Tween.get( text2, {} )
            .to( {"alpha":1}, 600 );
            egret.Tween.get( text3, {} )
            .to( {"alpha":1}, 600 );
            egret.Tween.get( text4, {} )
            .to( {"alpha":1}, 600 );

        }

//页面滑动功能

        this.scrollRect= new egret.Rectangle(0,0,this.stage.stageWidth,3*stageH);
        this.cacheAsBitmap = true;
        this.touchEnabled = true;
        var init_TouchPointY:number = 0;//起始触摸点
        var init_StagePointY:number = 0;//起始Stage点
        var MoveDistance:number = 0;//移动距离
        var mark:number = 0;
        

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startScroll, this);   //监听事件1
        
        function startScroll(e: egret.TouchEvent): void {
            if((this.scrollRect.y%stageH)!= 0) {

                this.scrollRect.y = init_StagePointY;  //每次滑动都卡主一个stage的高度
            }

            mark = e.stageY;
            init_TouchPointY = e.stageY;
            init_StagePointY = this.scrollRect.y;
           
        }


        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, onScroll, this);//实时计算滑动的距离值 监听事件2
        function onScroll(e: egret.TouchEvent): void {

            var rect: egret.Rectangle = this.scrollRect;
            MoveDistance = init_TouchPointY - e.stageY;
            if(MoveDistance != 0){
            rect.y = (init_StagePointY + MoveDistance);
            this.scrollRect = rect;
            }
            
        }


        this.addEventListener(egret.TouchEvent.TOUCH_END, stopScroll, this);   //监听事件3

        function stopScroll(e: egret.TouchEvent): void {

            var rect: egret.Rectangle = this.scrollRect;
            var origin = mark - e.stageY;


            if((MoveDistance >= (stageH/4)) && init_StagePointY!=stageH && origin != 0) { //如果移动距离超了1/4个高度，并且没到第二张，往下滑一页
                 
                rect.y = init_StagePointY + stageH;
                this.scrollRect = rect;
              
               
            }else if((MoveDistance <= (-stageH/5)) && init_StagePointY!=0 && origin != 0) {//如果移动距离超了-1/5个高度，并且没到第一页，往上滑一页

                rect.y = init_StagePointY - stageH;
                this.scrollRect = rect;
                
            } else{

                rect.y = init_StagePointY;
                this.scrollRect = rect;

            }

            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onScroll,this);

        }


        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
        /*var sound:egret.Sound = RES.getRes("torinouta_mp3");
        var channel:egret.SoundChannel = sound.play(0,-2);*/
    }
    

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */


    
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        }

        change();
    }

    

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


