const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Win_planeMain extends  cc.Component {
    @property({
        type: cc.Button,
        tooltip: "开始游戏按钮"
    })
    startBtn: cc.Button = null;

    @property({
        type: cc.Button,
        tooltip: "结束游戏按钮"
    })
    closeBtn: cc.Button = null;

    @property({
        type: cc.Button,
        tooltip: "游戏帮助按钮"
    })
    helpBtn: cc.Button = null;

    onLoad(){
        this.startBtn.node.on("click", this.onStartBtnClicked, this);
        this.closeBtn.node.on("click",this.onCloseBtnClicked, this);
    }

    getWidth(){
        return this.node.scale;
    }

    private onStartBtnClicked(){
        cc.director.loadScene('planeGame');
    }

    private onCloseBtnClicked(){
        cc.director.loadScene('main');

    }

    private onHelpBtnClicked(){

    }
}