const {ccclass,property,menu} = cc._decorator;
@ccclass
export default class Prefab_Alert extends cc.Component {
    @property({
        type: cc.Label,
        tooltip: "内容"
    })
    label: cc.Label = null;

    @property({
        type: cc.Button,
        tooltip: "确定按钮"
    })
    btn: cc.Button = null;

    @property({
        type: cc.Button,
        tooltip: "取消按钮"
    })
    closeBtn: cc.Button = null;

    onLoad(){
        this.closeBtn.node.on("click", this.onCloseBtnClicked, this);
    }

    onCloseBtnClicked(){
        this.node.removeFromParent();
    }

    
}