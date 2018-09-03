const { ccclass, property, menu } = cc._decorator;
@ccclass
export default class Prefab_Game extends cc.Component {
    @property({
        type: cc.Label,
        tooltip: "游戏名"
    })
    gameName: cc.Label = null;

    @property({
        type: cc.Button,
        tooltip: "按钮"
    })
    btn: cc.Button = null;

    onLoad() {
        this.btn.node.on("click", this.onBtnClicked, this);
    }

    initWithData(name: string ) {
        this.gameName.string = name;
    }

    getName(){
        return this.Name;
    }

    private onBtnClicked() {
            if (this.gameName.string) {
                switch (this.gameName.string) {
                    case gameType.planeMaster:
                        cc.director.loadScene(gameType.planeMaster);
                        break;
                }
            }
    }

    private Name: string;
}

export enum gameType {
    planeMaster = "plane",
}